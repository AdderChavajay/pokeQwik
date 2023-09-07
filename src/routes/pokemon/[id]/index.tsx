import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import PokemonImage from "~/components/imgPokemon/pokemon";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  console.log({ id });
  if (isNaN(id)) {
    // console.log("sacar al usuario");
    redirect(301, "/");
  }
  if (id <= 0 && id > 1000) {
    redirect(301, "/");
  }
  return id;
});

export default component$(() => {
  const pokemonId = usePokemonId();
  // const logation = useLocation();
  // console.log(logation.params.id);
  return (
    <>
      <h1 class="text-3xl">
        {/* Pokemon id ={" "} */}
        <span class="text-emerald-500"> {pokemonId} </span>
        <div class="flex items-center justify-center w-full">
          <PokemonImage id={pokemonId.value} size={200} />
        </div>
      </h1>
    </>
  );
});
