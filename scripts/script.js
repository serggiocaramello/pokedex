$(document).ready(function () {
  var inputPokemon = $("#inputPokemon");
  var pokemon = "";
  var pokemonName = $("#pokemonName");
  var pokemonImage = $("#pokemonImage");
  var pokemonNumber = $("#pokemonNumber");
  var pokemonHeight = $("#pokemonHeight");
  var pokemonWeight = $("#pokemonWeight");
  var pokemonAbility = $("#pokemonAbility");
  var pokemonHiddenAbility = $("#pokemonHiddenAbility");
  var inputMoves = $("#inputMoves");
  var selectPokemon = $("#selectPokemon");

  var labels = [
    "Hp",
    "Attack",
    "Defense",
    "Special Attack",
    "Special Defense",
    "Speed",
  ];

  function renderStats(name, stats) {
    var dataPoints = [];
    for (var i = 0; i < stats.length; i++) {
      dataPoints.push({
        y: stats[i].base_stat,
        label: labels[i],
      });
    }
    new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: `${name} base stats`,
      },
      axisY: {
        includeZero: true,
      },
      data: [
        {
          type: "column",
          dataPoints: dataPoints,
        },
      ],
    }).render();
  }

  var obtenerPokemon = function () {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      success: function (data) {
        pokemonName.text(
          data.name.charAt(0).toUpperCase() + data.name.substr(1).toLowerCase()
        );

        pokemonImage.attr(
          "src",
          data.sprites.other["official-artwork"].front_default
        );
        pokemonNumber.text(data.id);
        pokemonHeight.text((parseInt(data.height) / 10).toString() + "m");
        pokemonWeight.text((parseInt(data.weight) / 10).toString() + "m");
        pokemonAbility.text(data.abilities[0].ability.name);
        // pokemonHiddenAbility.text(data.abilities[1].ability.name);

        renderStats(pokemonName.text(), data.stats);
      },
    });
  };

  $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/pokemon/?limit=1118`,
    success: function (data) {
      console.log(data);
    },
  });

  var listadoPokemon = function () {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/pokemon/?limit=1118`,
      success: function (data) {
        for (var i = 0; i < data.count; i++) {
          selectPokemon.append(
            $(
              `<option value="${data.results[i].name}">${data.results[i].name}</option>`
            )
          );
        }
      },
    });
  };

  listadoPokemon();

  inputPokemon.on("keypress", function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      e.preventDefault();
      pokemon = this.value;
      pokemon = pokemon.toLowerCase();
      obtenerPokemon();
    }
  });

  selectPokemon.on("change", function (e) {
    pokemon = $(this).children("option:selected").val();
    obtenerPokemon();
  });
});
