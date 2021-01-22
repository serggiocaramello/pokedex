$(document).ready(function () {
  var pokemonName = $("#pokemonName");
  var inputPokemon = $("#inputPokemon");
  var inputMoves = $("#inputMoves");
  var pokemonNumber = $("#pokemonNumber");
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


