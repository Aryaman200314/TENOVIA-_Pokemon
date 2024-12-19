window.onload = fetchData;
document.getElementById("searchBtn").addEventListener("click", searchpoke);
function fetchData() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50";
  fetch(url)
    .then((res) => {
    return res.json();
    })
    .then((value) => {
      const List = document.getElementById("dataList");
      value.results.forEach((item) => {
        const li = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = item.name;
        anchor.href = "#";
        li.addEventListener("click", 
        () => fetchPokemonDetails(item.name));
        li.appendChild(anchor);
        List.appendChild(li);
      });
    })
    .catch(() => {
      alert("Error in fetching 50 pokemon");
    });
}

function fetchPokemonDetails(pokename) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;
  fetch(url)
    .then((res) => {
    return res.json();
    })
    .then((data) => {
      const pokeClick = document.getElementById("clicked-pokemon-details");
      pokeClick.innerHTML = ` 
        <h2>${data.name}</h2>  
        <b>height:</b> ${data.height} <br>
        <b>weight:</b> ${data.weight} <br>
        <img src="${data.sprites.front_default}" alt="${data.name}" />
      `;
    })
    .catch(() => {
      alert("Error fetching pokemon.");
    });
}

function searchpoke() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  if (input === "") {
    alert("Enter pokemon name.");
    return;
  }
  else {
  fetchPokemonDetails(input);
  }
}