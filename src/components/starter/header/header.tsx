import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/pokemons/client-list">CLIENT-List</Link>
          </li>
          <li>
            <Link href={"/pokemons/ssr-list"}> SSR-List</Link>
          </li>
          <li>
            <Link href={`/pokemons/scroll-infinity/`}>Scoll-Infinity</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
