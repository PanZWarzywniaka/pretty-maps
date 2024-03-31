<script>
    export let data
  </script>
  
  {#if data.url}
    <img src={data.url} alt="dupa" />
  {:else}
    <p>Loading image...</p>
  {/if}