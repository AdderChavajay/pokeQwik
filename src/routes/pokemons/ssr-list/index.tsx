import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { component$, useComputed$ } from "@builder.io/qwik";
import type { smallPokemon } from "~/components/interface";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";

import Pokemon from "~/components/imgPokemon/pokemon";

export const usePokeListUrl = routeLoader$<smallPokemon[]>(
  async ({ query, pathname, redirect }) => {
    const offset = Number(query.get("offset") || 0);
    if (isNaN(offset) || offset < 0) {
      redirect(301, pathname);
    }
    return getSmallPokemons(offset);
    // const pokemons = await getSmallPokemons(offset);
    // console.log(pokemons);
    // return pokemons;
    // const response = await axios.get(
    //   `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    // );
    // const data = (await response.data) as PokeTypeList;
    // return data.results;
  }
);

export default component$(() => {
  const location = useLocation();
  const paginaSiguinte = useComputed$<number>(() => {
    const offsetVal = location.url.searchParams.get("offset");
    return Number(offsetVal || 0);
  });

  const listPoke = usePokeListUrl();

  return (
    <>
      <div class="w-full flex justify-center items-center">
        <div class="flex flex-col space-y-3">
          <article class="flex flex-col">
            <h2>Lista de Pokemons</h2>
            <span>Offset: {paginaSiguinte}</span>
            <div>
              Cargando:
              {location.isNavigating ? " si" : " No"}
            </div>
          </article>
          <div class="flex space-x-2 items-center justify-center">
            <Link
              href={`/pokemons/ssr-list/?offset=${paginaSiguinte.value - 10}`}
              class="btn btn-primary"
            >
              Anterior
            </Link>
            <Link
              href={`/pokemons/ssr-list/?offset=${paginaSiguinte.value + 10}`}
              class="btn btn-secondary"
            >
              Siguiente
            </Link>
          </div>
          <div class="grid grid-cols-6 gap-3">
            {listPoke.value.map((namePokemon) => (
              <div key={namePokemon.id} class="flex flex-col py-3">
                <Pokemon id={namePokemon.id} />
                <span class="py-2 px-3 bg-slate-700 rounded-xl text-center">
                  {namePokemon.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});
