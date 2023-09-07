import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import type { DocumentHead } from "@builder.io/qwik-city";
import Pokemon from "~/components/imgPokemon/pokemon";

export default component$(() => {
  const idImage = useSignal(1);
  const sizeImage = useSignal(200);
  const frontOfBackImage = useSignal(false);
  const visibleImage = useSignal(false);
  const nav = useNavigate();

  const changeImage = $((valButton: number) => {
    if (idImage.value + valButton <= 0) return;
    idImage.value += valButton;
  });

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${idImage.value}/`);
  });
  return (
    <>
      <div class="w-full flex justify-center items-center flex-col space-y-4">
        <span class="text-2xl font-semibold">{idImage.value}</span>
        <div onClick$={() => goToPokemon()}>
          <Pokemon
            id={idImage.value}
            size={sizeImage.value}
            frontOrBack={frontOfBackImage.value}
            isVisible={visibleImage.value}
          />
        </div>
        <div class="space-x-2">
          <button
            onClick$={() => {
              idImage.value++;
            }}
            class="btn btn-primary"
          >
            Siguiente
          </button>
          <button
            class="btn btn-secondary"
            onClick$={() => {
              changeImage(-1);
            }}
          >
            Anterior
          </button>
          <button
            class="btn btn-flip"
            onClick$={() => {
              frontOfBackImage.value = !frontOfBackImage.value;
            }}
          >
            Voltear Imagen
          </button>
          <button
            class="btn btn-visibleImage"
            onClick$={() => {
              visibleImage.value = !visibleImage.value;
            }}
          >
            Ocultar imagen
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
