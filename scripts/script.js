$(document).ready(function () {
  var pokemonName = $("#pokemonName");
  var inputPokemon = $("#inputPokemon");
  var inputMoves = $("#inputMoves");
  var pokemonNumber = $("#pokemonNumber");
  var pokemon = "";

  inputPokemon.on("keypress", function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      pokemon = this.value;
    }

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      success: function (data) {
        console.log(data);
        pokemonName.text(data.name);
        pokemonNumber.text(data.id);
      },
    });
  });

  inputMoves.on("keypress", function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      pokemon = this.value;
    }

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      success: function (data) {
        console.log(data);
      },
    });
  });
});
