<script lang="ts">
  import { Table, Container } from '@sveltestrap/sveltestrap';
  import { Scale } from '../lib/scale';
  import logo from '../assets/cantus-icon.jpg';

  import { writable } from "svelte/store";

  import KeyPicker from './KeyPicker.svelte';

  const firstKey = writable(new Scale());
  const secondKey = writable(new Scale("G", "major"));

  function false_array() : boolean[] {
    let retval : boolean[] = [];
    retval.length = 7;
    retval = retval.fill(false);

    return retval;

  }

  let common_1 : boolean[] = false_array();
  let common_2 : boolean[] = false_array();

  $: {

    const new_1 = false_array();
    const new_2 = false_array();
    const scale_1 = $firstKey;
    const scale_2 = $secondKey;

    for(let i = 0; i<common_1.length; i++) {
      for(let j = 0; j<common_2.length; j++) {
        const chord1 = scale_1.chordForDegree(i+1);
        const chord2 = scale_2.chordForDegree(j+1);
        //console.log(`i=${i}, j=${j}, ${chord1.name()} ?=? ${chord2.name()}`)
        if (! new_2[j]) {
          if (chord1.isSameName(chord2)) {
            //console.log("--- same")
            new_1[i] = true;
            new_2[j] = true;
            break;
          } else {
            //console.log(`--- different (c1=${chord1.getRootName()}, c2=${chord2.getRootName()})`)
          }
        }
      
      }
      
    }

    //console.log("new_1 = ", JSON.stringify(new_1));
    //console.log("new_2 = ", JSON.stringify(new_2));

    common_1 = [...new_1];
    common_2 = [...new_2];

    //console.log("common_1 = ", JSON.stringify(common_1));
    //.log("common_2 = ", JSON.stringify(common_2));

  }
</script>

<header class="container-fluid gx-1 bg-primary-subtle">
  <div class="row align-items-center m-3">
    <img src={logo} height="100px" width="100px"
      class="header-logo col-2" alt="Random Logo"/>
    <div class="col-10 text-center">
      <span class="text-black fs-1 p-3 p-md-4">Common Chords</span>
    </div>
  </div>
</header>

<main>
  <div class="m-4">
    <h3>Find Common Chords Between Keys</h3>
    <p>Just because.</p>
  </div>
  <Container class="text-center my-2">
    <Table color="primary" bordered class="w-75">
      <thead>
        <tr>
          <th>Key</th>
          {#each {length: 7} as _, i}
          <th>{i+1}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{$firstKey.nameUnicode()} <KeyPicker key={firstKey}/></td> <!-- The Key -->
          {#each {length: 7} as _, i}
          <td style={common_1[i] ? "background: #33FF33;" : ""}>{$firstKey.chordForDegree(i+1).name()}</td>
          {/each}
        </tr>
        <tr>
          <td>{$secondKey.nameUnicode()} <KeyPicker key={secondKey}/></td> <!-- The Key -->
          {#each {length: 7} as _, i}
          <td style={common_2[i] ? "background: #33FF33;" : ""}>{$secondKey.chordForDegree(i+1).name()}</td>
          {/each}
        </tr>
      </tbody>
    </Table>
  </Container>
</main>


