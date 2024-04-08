// poemPage.tsx
import { component$, useStore, useStyles$, useTask$ } from "@builder.io/qwik";
import styles from "./styles.css?inline";
import { useLocation } from "@builder.io/qwik-city";
import { Poem } from "./poem.interface";

export default component$(() => {
  useStyles$(styles);

  const loc = useLocation();
  const poemStore = useStore<{ poem: Poem }>({ poem: { title: '', author: '', lines: [] } });

  useTask$(async () => {
    try {
      const response = await fetch(`https://poetrydb.org/title/${loc.params.title}`);
      const data: Poem[] = await response.json();
      poemStore.poem = data[0];
      console.log(data);
    } catch (error) {
      console.error('Error fetching poems:', error);
    }
  });

  return (
    <div class="poem-page">
      <div class="poem-details">
        <h3>{poemStore.poem.title}</h3>
        <p class="author">By {poemStore.poem.author}</p>
      </div>
      <div class="poem-lines">
        {poemStore.poem.lines.map((line, index) => (
          <p key={index} class="poem-line">{line}</p>
        ))}
      </div>
    </div>
  );
});
