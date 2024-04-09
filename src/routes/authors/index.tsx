import { component$, useSignal, useStore, useTask$, $ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import { table } from "console";

export default component$(() => {
  const poemStore = useStore({ authors: [] });
  const searchTerm = useSignal('');
  const isLoading = useSignal(false);


  useTask$(async () => {
    try {
      const response = await fetch('https://poetrydb.org/author');
      const data = await response.json();
      poemStore.authors = data;
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  })


  const search = $(async (searchTerm: string) => {
    isLoading.value = true;
    try {
      const response = await fetch(` https://poetrydb.org/author/${searchTerm}`);
      console.log(response.json());
      console.log(response.json());
      const data = await response.json();
      poemStore.authors = data;

    }
    catch (error) {
      console.error('Error fetching poems:', error);
      alert('Error fetching poems:');
      isLoading.value = false
    }

    isLoading.value = false;
  })


  return (
    <>
      <div class="poems-page">
        <div class={'search'}>
          <input
            type="text"
            value={searchTerm.value}
            placeholder="Search by title or author"
            onInput$={(event) => {
              searchTerm.value = (event.target as HTMLInputElement)?.value
              search(searchTerm.value);
            }}
          />
          <button>Search</button>
        </div>
        {
          !isLoading.value ?
            <div class={'poems'}>
              {/* {poemStore.poems.map((poem: { title: string, author: string, lines: string[] }) => (
                <Link href={`/poem/${poem.title}`} key={poem.title} class="poem">

                  <div class={'poem-title'}>{poem.title}</div>
                  <p>By {poem.author}</p>

                </Link>
              ))} */}
            </div> : <h1>Loading...</h1>
        }

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
