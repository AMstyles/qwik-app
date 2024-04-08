import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";

export default component$(() => {
  const poemStore = useStore({ poems: [] });
  const searchTerm = useSignal('');


  useTask$(async () => {
    try {
      const response = await fetch('https://poetrydb.org/random/21');
      const data = await response.json();
      poemStore.poems = data;
    } catch (error) {
      console.error('Error fetching poems:', error);
    }
  })


  return (
    <>
      <div class="poems-page">
        <div class={'search'}>
          <input
            type="text"
            value={searchTerm.value}
            placeholder="Search by title or author"
          // onInput$={(event) => setSearchTerm(event.target.value)}
          />
          <button>Search</button>
        </div>
        <div class={'poems'}>
          {poemStore.poems.map((poem: { title: string, author: string, lines: string[] }) => (
            <Link href={`/poem/${poem.title}`} key={poem.title} class="poem">

              <div class={'poem-title'}>{poem.title}</div>
              <p>By {poem.author}</p>

            </Link>
          ))}
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
