import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface valProps {
  id: number | string;
  size?: number;
  frontOrBack?: boolean;
  isVisible?: boolean;
}

export default component$<valProps>((props) => {
  const loadedImage = useSignal(false);

  useTask$(({ track }) => {
    track(() => {
      props.id;
    });
    loadedImage.value = false;
  });

  const urlImagenPokemon = useComputed$(() => {
    return props.frontOrBack
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${props.id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  });

  // console.log(urlImagenPokemon.value);
  // let urlImagenPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  // if (props.frontOrBack) {
  //   urlImagenPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${props.id}.png`;
  // }
  return (
    <>
      <div>
        {!loadedImage.value && <span class="">Cargando...</span>}
        {/* <span>{loadedImage.value ? "Cargada" : "Cargando ..."}</span> */}
        <img
          src={urlImagenPokemon.value}
          alt=""
          // style={{ width: `${props.size}px`, heigth: `${props.size}px` }}
          width={props.size}
          height={props.size}
          class={{
            hidden: !loadedImage.value,
            "brightness-0": props.isVisible,
          }}
          onLoad$={() => {
            setTimeout(() => {
              loadedImage.value = true;
            }, 1000);
          }}
        />
      </div>
    </>
  );
});
