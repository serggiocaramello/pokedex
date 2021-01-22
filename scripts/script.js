$(document).ready(function () {
  var pokemonName = $("#pokemonName");
  var pokemonImage = $("#pokemonImage");
  var pokemonNumber = $("#pokemonNumber");
  var pokemonHeight = $("#pokemonHeight");
  var pokemonWeight = $("#pokemonWeight");
  var pokemonAbility = $("#pokemonAbility");
  var pokemonHiddenAbility = $("#pokemonHiddenAbility");
  var inputMoves = $("#inputMoves");
  var inputPokemon = $("#inputPokemon");
  var selectPokemon = $("#selectPokemon");
  var pokemon = "";

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

  var inputItems = $("#inputItems");
  var itemName = $("#itemName");
  var itemId = $("#itemId");
  var itemCost = $("#itemCost");
  var itemAttributes = $("#itemAttributes");
  var itemCategory = $("#itemCategory");
  var itemEffect = $("#itemEffect");
  var itemTitle = $("#itemTitle");
  var itemImg = $("#itemImg");
  
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


   inputItems.on("keypress", function (e) {    
    var codeItem = e.keyCode ? e.keyCode : e.which; 
    if (codeItem == 13) {
          item = this.value;
    }
      
     // e.preventDefault; 


    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/item/${item}/`,
      success: function (data) {
        itemImg.attr("src",data.sprites.default);
        itemName.text(data.name);
        itemTitle.text(data.name);
        itemId.text(data.id);
        itemCost.text(data.cost);
        itemAttributes.text(data.attributes.name);
        itemCategory.text(data.category.name);
        itemEffect.text(data.effect_entries[0].effect);
                
      },
    });
  });
});


