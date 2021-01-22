$(document).ready(function () {
  var pokemonName = $("#pokemonName");
  var inputPokemon = $("#inputPokemon");
  var pokemonNumber = $("#pokemonNumber");
  var pokemon = "";
  var moves = "";
  var inputMoves = $("#inputMove");
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

  for (var i = 1; i <= 784; i++) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/move/${i}`,
      success: function (data) {
        console.log(data);
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
        console.log(data);
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
    }

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://pokeapi.co/api/v2/move/${moves}`,
      success: function (data) {
        console.log(data);
        movesName.text(data.name);
        movesType.text(data.type.name);
        movesAccuracy.text(data.accuracy);
        movesPowerPoints.text(data.pp);
        movesPriority.text(data.priority);
        movesPower.text(data.power);
        movesDamageClass.text(data.damage_class.name);
        movesEffect.text(data.effect_entries[0].effect);
        movesGeneration.text(data.generation.name);
      },
    });
  });
});
