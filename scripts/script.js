$(document).ready(function () {
  var inputPokemon = $("#inputPokemon");
  var pokemon = "";
  var pokemonName = $("#pokemonName");
  var pokemonNumber = $("#pokemonNumber");
  var pokemonHeight = $("#pokemonHeight");
  var pokemonWeight = $("#pokemonWeight");
  var pokemonAbility = $("#pokemonAbility");
  var pokemonHiddenAbility = $("#pokemonHiddenAbility");
  var inputMoves = $("#inputMoves");
  var selectPokemon = $("#selectPokemon");

  var obtenerPokemon = function () {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      success: function (data) {
        pokemonName.text(data.name).css("textTransform", "capitalize");
        pokemonNumber.text(data.id);
        pokemonHeight.text((parseInt(data.height) / 10).toString() + "m");
        pokemonWeight.text((parseInt(data.weight) / 10).toString() + "m");
        pokemonAbility.text(data.abilities[0]);
        pokemonHiddenAbility.text(data.abilities[1]);
      },
    });
  };

  var obtenerListadoPokemon = function () {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/pokemon/${i}`,
      success: function (data) {
        selectPokemon.append(
          $(`<option value="${data.name}">${data.name}</option>`)
        );
      },
    });
  };

  inputPokemon.on("keypress", function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      pokemon = this.value;
      pokemon = pokemon.toLowerCase();
      console.log(pokemon);
    }
    obtenerPokemon();
  });

  for (var i = 1; i <= 802; i++) {
    obtenerListadoPokemon();
  }

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
