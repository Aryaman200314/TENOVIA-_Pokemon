window.onload = fetchData;
document.getElementById("searchBtn").addEventListener("click", fetchDataSrch);

function fetchData() {
  const apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50";
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const dataList = document.getElementById("dataList");
      dataList.innerHTML = "";
      data.results.forEach((item) => {
        const li = document.createElement("li");

        const anchor = document.createElement("a");
        anchor.textContent = item.name;
        anchor.href = "#";
        li.addEventListener("click", () => fetchPokemonDetails(item.name));

        li.appendChild(anchor);
        dataList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function fetchPokemonDetails(pokemonName) {
  const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Pokémon not found! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const clickedPokemonDetails = document.getElementById("clicked-pokemon-details");
      clickedPokemonDetails.innerHTML = ` 
        <h2>${data.name}</h2>
        <strong>ID:</strong> ${data.id} <br>
        <strong>Height:</strong> ${data.height} <br>
        <strong>Weight:</strong> ${data.weight} <br>
        <strong>Types:</strong> ${data.types.map((type) => type.type.name).join(", ")} <br>
        <strong></strong> <img src="${data.sprites.front_default}" alt="${data.name}" />
      `;
    })
    .catch((error) => {
      console.error("Error fetching Pokémon details:", error);
      alert("Error fetching Pokémon details.");
    });
}

function fetchDataSrch() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  if (searchInput === "") {
    alert("Please enter a Pokémon name to search.");
    return;
  }

  fetchPokemonDetails(searchInput);
}
    

