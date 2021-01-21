$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/pikachu",
    success: function (data) {
      console.log(data);
    },
  });
});
