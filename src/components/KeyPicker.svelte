<script lang="ts">
    import {Input} from "@sveltestrap/sveltestrap";
    import type { Writable } from "svelte/store";
    import {type Scale, type ScaleType, ALL_SCALE_TYPES} from "../lib/scale";

    export let key : Writable<Scale>;
    
    let scale_type : string = $key.type;
    let center : string = $key.center;

    function setType() {
        console.log(`scale_type = ${scale_type}`);
        let value = $key;
        value = value.setType(scale_type as ScaleType);
        console.log(`value = ${JSON.stringify(value)}`)
        key.set(value);

        console.log(`key = ${JSON.stringify($key)}`)
    }

    function setCenter() {
        console.log(`center = ${center}`);
        let value = $key;
        value = value.setCenter(center);
        console.log(`value = ${JSON.stringify(value)}`)
        key.set(value);

        console.log(`key = ${JSON.stringify($key)}`)

    }


</script>

<div>
<Input type="text" class="d-inline" bind:value={center} on:change={setCenter} style="max-width: 60px;" />
<Input type="select" class="d-inline" bind:value={scale_type} on:change={setType} style="max-width: 150px;">
    {#each ALL_SCALE_TYPES as t}
    <option value={t}>{t}</option>
    {/each}
</Input>
</div>

