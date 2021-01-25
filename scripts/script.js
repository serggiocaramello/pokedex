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
  var inputPokemon = $("#inputPokemon");
  var selectPokemon = $("#selectPokemon");
  var moves = "";
  var movesName = $("#movesName");
  var movesType = $("#movesType");
  var movesAccuracy = $("#movesAccuracy");
  var movesPowerPoints = $("#movesPowerPoints");
  var movesPriority = $("#movesPriority");
  var movesPower = $("#movesPower");
  var movesDamageClass = $("#movesDamageClass");
  var movesEffect = $("#movesEffect");
  var movesGeneration = $("#movesGeneration");
  var selectMove = $("#selectMove");
  var movetitle = $("#movetitle");

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

  var inputItems = $("#inputItems");
  var itemName = $("#itemName");
  var itemId = $("#itemId");
  var itemCost = $("#itemCost");
  var itemAttributes = $("#itemAttributes");
  var itemCategory = $("#itemCategory");
  var itemEffect = $("#itemEffect");
  var itemTitle = $("#itemTitle");
  var itemImg = $("#itemImg");

  var selectItems = $("#selectItem");

  var item = "";

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

  //tomas

  var llamarItem = function () {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/item/${item}/`,
      success: function (data) {
        itemImg.attr("src", data.sprites.default);
        itemName.text(data.name);
        itemTitle.text(data.name);
        itemId.text(data.id);
        itemCost.text(data.cost);
        itemAttributes.text(data.attributes.name);
        itemCategory.text(data.category.name);
        itemEffect.text(data.effect_entries[0].effect);
      },
    });
  };

  inputItems.on("keypress", function (e) {
    var codeItem = e.keyCode ? e.keyCode : e.which;
    if (codeItem == 13) {
      item = this.value;
      llamarItem();
    }
  });

  $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/item/?limit=954`,
    success: function (data) {
      // console.log(data);
      for (var i = 0; i < data.count; i++) {
        selectItems.append(
          $(
            `<option value="${data.results[i].name}">${data.results[i].name}</option>`
          )
        );
      }
    },
  });

  selectItems.on("change", function (e) {
    item = $(this).children("option:selected").val();
    llamarItem();
  });

  $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/item/${item}/`,
    success: function (data) {
      itemImg.attr("src", data.sprites.default);
      itemName.text(data.name);
      itemTitle.text(data.name);
      itemId.text(data.id);
      itemCost.text(data.cost);
      itemAttributes.text(data.attributes.name);
      itemCategory.text(data.category.name);
      itemEffect.text(data.effect_entries[0].effect);
    },
  });

  //marcelo

  for (var i = 1; i <= 784; i++) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/move/${i}`,
      success: function (data) {
        // console.log(data);
        selectMove.append(
          $(`<option value="${data.name}">${data.name}</option>`)
        );
      },
    });
  }
  //captura la seleccion del option en select
  $("select#selectMove").on("change", function () {
    var valor = $(this).val();
    // alert(valor);

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/move/${valor}`,
      success: function (data) {
        // console.log(data);
        movetitle.text(data.name);
        movesName.text(data.name);
        movesType.text(data.type.name);
        movesAccuracy.text(data.accuracy);
        if (data.accuracy == null) {
          movesAccuracy.text("-");
        }
        movesPowerPoints.text(data.pp);
        movesPriority.text(data.priority);
        movesPower.text(data.power);
        if (data.power == null) {
          movesPower.text("-");
        }
        movesDamageClass.text(data.damage_class.name);
        movesEffect.text(data.effect_entries[0].effect);
        movesGeneration.text(data.generation.name);
      },
    });
  });

  inputMoves.on("keypress", function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      moves = this.value;

      $.ajax({
        type: "GET",
        dataType: "json",
        url: `https://pokeapi.co/api/v2/move/${moves}`,
        success: function (data) {
          // console.log(data);
          movetitle.text(data.name);
          movesName.text(data.name);
          movesType.text(data.type.name);
          movesAccuracy.text(data.accuracy);
          if (data.accuracy == null) {
            movesAccuracy.text("-");
          }
          movesPowerPoints.text(data.pp);
          movesPriority.text(data.priority);
          movesPower.text(data.power);
          if (data.power == null) {
            movesPower.text("-");
          }
          movesDamageClass.text(data.damage_class.name);
          movesEffect.text(data.effect_entries[0].effect);
          movesGeneration.text(data.generation.name);
        },
      });
    }
  });

  //ivan

  $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/berry/?limit=64`,
    success: function (data) {
      data.results.forEach((element) => {
        $("#selectBerries").append(
          $(
            `<option value="${element.name}">${
              element.name.charAt(0).toUpperCase() +
              element.name.substr(1).toLowerCase()
            }</option>`
          )
        );
      });
    },
  });

  // Berry Select
  var berry = "";

  $("#selectBerries").on("change", function () {
    var berry = $(this).val();

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/berry/${berry}`,
      success: function (data) {
        $("#berries__title").text(
          data.name.charAt(0).toUpperCase() +
            data.name.substr(1).toLowerCase() +
            " berry"
        );
        $("#berry-name").text(
          data.name.charAt(0).toUpperCase() + data.name.substr(1).toLowerCase()
        );
        $("#naturalGiftPower").text(data.natural_gift_power);
        $("#naturalGiftType").text(
          data.natural_gift_type.name.charAt(0).toUpperCase() +
            data.natural_gift_type.name.substr(1).toLowerCase()
        );
        $("#berry-size").text((parseInt(data.size) / 10).toString() + " mm");
        $("#berry-firmness").text(
          data.firmness.name.charAt(0).toUpperCase() +
            data.firmness.name.substr(1).toLowerCase()
        );
      },
    });
  });

  $("#inputBerries").on("keypress", function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      berry = this.value;

      $.ajax({
        type: "GET",
        dataType: "json",
        url: `https://pokeapi.co/api/v2/berry/${berry}`,
        success: function (data) {
          $("#berries__title").text(
            data.name.charAt(0).toUpperCase() +
              data.name.substr(1).toLowerCase() +
              " berry"
          );
          $("#berry-name").text(data.name);
          $("#naturalGiftPower").text(data.natural_gift_power);
          $("#naturalGiftType").text(data.natural_gift_type.name);
          $("#berry-size").text((parseInt(data.size) / 10).toString() + " mm");
          $("#berry-firmness").text(data.firmness.name);
        },
      });
    }
  });
});

//final
