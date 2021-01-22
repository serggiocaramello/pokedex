$(document).ready(function () {
  var pokemonName = $("#pokemonName");
  var pokemonNumber = $("#pokemonNumber");
  var pokemonHeight = $("#pokemonHeight");
  var pokemonWeight = $("#pokemonWeight");
  var pokemonAbility = $("#pokemonAbility");
  var pokemonHiddenAbility = $("#pokemonHiddenAbility");
  var inputMoves = $("#inputMoves");
  var inputPokemon = $("#inputPokemon");
  var selectPokemon = $("#selectPokemon");

  var pokemon = "";
  
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


