<script lang="ts">
    export let data
  </script>
  
  {#if data.url}
    <img src={data.url} alt="Your map render" />
  {:else}
    <p>Loading image...</p>
  {/if}