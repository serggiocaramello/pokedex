$(document).ready(function () {
  var inputPokemon = $("#inputPokemon");
  var pokemon = "bulbasaur";
  var pokemonName = $("#pokemonName");
  var pokemonImage = $("#pokemonImage");
  var pokemonNumber = $("#pokemonNumber");
  var pokemonHeight = $("#pokemonHeight");
  var pokemonWeight = $("#pokemonWeight");
  var pokemonAbility = $("#pokemonAbility");
  var pokemonHiddenAbility = $("#pokemonHiddenAbility");
  var pokemonType = $("#pokemonType");
  var inputMoves = $("#inputMoves");
  var selectPokemon = $("#selectPokemon");
  // var dataPoints = [45, 49, 49, 65, 65, 45];

  var labels = [
    "Hp",
    "Attack",
    "Defense",
    "Special Attack",
    "Special Defense",
    "Speed",
  ];

  function renderStats(name, stats) {
    dataPoints = [];
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
        if (data.types.length > 0) {
          pokemonType.text("");
          data.types.forEach((ty) => {
            pokemonType.text(pokemonType.text() + " " + ty.type.name);
          });
        } else {
          pokemonType.text(data.types[0]);
        }
        pokemonHeight.text((parseInt(data.height) / 10).toString() + " m");
        pokemonWeight.text((parseInt(data.weight) / 10).toString() + " m");
        pokemonAbility.text(data.abilities[0].ability.name);
        pokemonAbility.text("");
        data.abilities.forEach((abi) => {
          if (!abi.is_hidden) {
            if (data.abilities.length > 2) {
              pokemonAbility.text(
                pokemonAbility.text() + abi.ability.name + " / "
              );
            } else {
              pokemonAbility.text(abi.ability.name);
            }
          } else {
            pokemonHiddenAbility.text(abi.ability.name);
          }
        });

        renderStats(pokemonName.text(), data.stats);
      },
    });
  };

  obtenerPokemon();

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
