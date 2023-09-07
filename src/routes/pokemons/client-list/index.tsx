import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import Pokemon from "~/components/imgPokemon/pokemon";
import type { smallPokemon } from "~/components/interface";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";

interface PokemonPageState {
  currentPage: number;
  pokemons: smallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
  });
  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemon = await getSmallPokemons(pokemonState.currentPage * 10);
    pokemonState.pokemons = pokemon;
  });

  return (
    <>
      <div class="w-full flex justify-center items-center">
        <div class="flex flex-col space-y-3">
          <article class="flex flex-col">
            <h2 class="text-xl font-semibold">Lista de Pokemons Client List</h2>
            <span>Offset: </span>
            <span>Esta Cargando: {pokemonState.currentPage}</span>
          </article>
          <div class="flex space-x-2 items-center justify-center">
            <button
              onClick$={() => {
                pokemonState.currentPage--;
              }}
              class="btn btn-primary"
            >
              Anterior
            </button>
            <button
              onClick$={() => {
                pokemonState.currentPage++;
              }}
              class="btn btn-secondary"
            >
              Siguiente
            </button>
          </div>
          <div class="grid grid-cols-6 gap-3">
            {pokemonState.pokemons.map((namePokemon) => (
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
