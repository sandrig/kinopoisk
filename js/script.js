const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");

function apiSearch(event) {
  event.preventDefault();

  const searchText = document.querySelector(".form-control").value,
    server =
      "https://api.themoviedb.org/3/search/multi?api_key=c07aed353d8af52093e936f5a0d2d5bc&language=ru&query=" +
      searchText;
  console.log(searchText);
  console.log(requestApi(server));

  requestApi("GET", server);
}

searchForm.addEventListener("submit", apiSearch);

function requestApi(url) {
  const request = new XMLHttpRequest();
  console.log(request);
  request.open("GET", url);
  request.send();

  request.addEventListener("readystatechange", () => {
    console.log(request.readyState);
    if (request.readyState !== 4) return;
    if (request.status !== 200) {
      console.log("Error: " + request.status);
      return;
    }

    const output = JSON.parse(request.responseText);

    let inner = "";

    output.results.forEach(function(item, i, array) {
      console.log(item);
      console.log(i);
      console.log(array);

      let nameItem = item.name || item.title;
      console.log(nameItem);
      inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`;
    });

    movie.innerHTML = inner;

    console.log(request.readyState);
    console.log(request);
    console.log(output);
  });
}
