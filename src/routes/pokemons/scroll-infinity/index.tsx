import { component$, useStore, useTask$ } from "@builder.io/qwik";
import Pokemon from "~/components/imgPokemon/pokemon";
import type { smallPokemon } from "~/components/interface";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";

interface PokemonStatusPage {
  currentPage: number;
  pokemons: smallPokemon[];
}

export default component$(() => {
  const PokemonsState = useStore<PokemonStatusPage>({
    currentPage: 0,
    pokemons: [],
  });

  // useVisibleTask$(async ({ track }) => {
  //   track(() => {
  //     PokemonsState.currentPage;
  //   });
  //   const pokemon = await getSmallPokemons(PokemonsState.currentPage * 10, 30);
  //   PokemonsState.pokemons = pokemon;
  // });

  useTask$(async ({ track }) => {
    track(() => {
      PokemonsState.currentPage;
    });
    const pokemon = await getSmallPokemons(PokemonsState.currentPage * 10);
    PokemonsState.pokemons = [...PokemonsState.pokemons, ...pokemon];
  });
  return (
    <>
      <div class="w-full flex justify-center items-center">
        <div class="flex flex-col space-y-3">
          <article class="flex flex-col">
            <h2>Lista de Pokemons</h2>
            <span>Pagina Actual: {PokemonsState.currentPage}</span>
          </article>
          <div class="flex space-x-2 items-center justify-center">
            <button
              class="btn btn-primary"
              onClick$={() => {
                PokemonsState.currentPage--;
              }}
            >
              Anterior
            </button>
            <button
              class="btn btn-secondary"
              onClick$={() => {
                PokemonsState.currentPage++;
              }}
            >
              Siguiente
            </button>
          </div>
          <div class="grid grid-cols-6 gap-3">
            {PokemonsState.pokemons.map(({ id, name }) => (
              <div key={id} class="flex flex-col py-3">
                <Pokemon id={id} />
                <span class="py-2 px-3 bg-slate-700 rounded-xl text-center">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});
