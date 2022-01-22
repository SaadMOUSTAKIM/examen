<script>
  import axios from "axios";
  import fetch from "node-fetch";
  import { onMount } from "svelte";
  var pagination = { count: null, skip: null, take: null };
  var movies = [];
  $: disabled = P === 1;
  var P = 1;
  onMount(async function () {
    Search();
  });
  async function getMovies() {
    var getAccessToken =
      "http://localhost:3000/movies?take=10&skip=" +
      (pagination.skip + pagination.count);
    Search(getAccessToken);
    P++;
  }
  async function getMoviesBack() {
    var getAccessToken =
      "http://localhost:3000/movies?take=10&skip=" +
      (pagination.skip - pagination.count);
    Search(getAccessToken);
    P--;
  }
  async function Search(
    getAccessToken = "http://localhost:3000/movies?take=10&skip=0"
  ) {
    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };
    var res = await window.fetch(getAccessToken, requestOptions);
    var res1 = res.json().then((res2) => {
      movies = res2.data;
      pagination.count = res2.pagination.count;
      pagination.take = res2.pagination.take;
      pagination.skip = res2.pagination.skip;
    });
  }
</script>

<div class="di container ">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">title</th>
        <th scope="col">genres </th>
        <th scope="col">year</th>
      </tr>
    </thead>
    <tbody>
      {#each movies as movie}
        <tr>
          <td>{movie.title}</td>
          <td>
            {#each movie.genres as genre}
              {genre},
            {/each}
          </td>
          <td>{movie.year}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <span>
    <p class="text-center">
      <button
        type="button"
        class="btn btn-primary float-start"
        on:click={getMoviesBack}
        {disabled}>previous</button
      >
      <strong>{P}</strong>
      <button
        type="button"
        class="btn btn-primary float-end"
        on:click={getMovies}>next</button
      >
    </p>
  </span>
</div>
<main />

<style>
  .di {
    margin-top: 20;
  }
</style>
