import axios from "axios";
import type { PokeTypeList, smallPokemon } from "../components/interface";

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<smallPokemon[]> => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = (await response.data) as PokeTypeList;
  // console.log(data.results);
  return data.results.map(({ url, name }) => {
    const segments = url.split("/");
    const id = segments.at(-2)!;
    // console.log(url);
    return {
      id,
      name,
    };
  });
};
