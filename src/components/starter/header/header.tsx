import { component$, useStyles$ } from "@builder.io/qwik";
import HeaderStyles from './styles.css?inline'


export default component$(() => {

  useStyles$(HeaderStyles);

  return (<header class='navbar'>

    <div class='links'>
      <a href='/'>Poems</a>
      <a href='/about'>About</a>
      <a href='/authors'>
        Authors
      </a>
    </div>

  </header>)
}

);
