$(document).ready(function () {
  var navBtnPokemon = $("#navBtnPokemon");
  var navBtnMoves = $("#navBtnMoves");
  var navBtnItems = $("#navBtnItems");
  var navBtnBerries = $("#navBtnBerries");
  var sectionPokemon = $("#sectionPokemon");
  var sectionMoves = $("#sectionMoves");
  var sectionItems = $("#sectionItems");
  var sectionBerries = $("#sectionBerries");

  var buttons = [navBtnPokemon, navBtnMoves, navBtnItems, navBtnBerries];
  var sections = [sectionPokemon, sectionMoves, sectionItems, sectionBerries];

  var activateSection = (button, section) => {
    button.on("click", () => {
      buttons.map((btn) => {
        button == btn ? btn.addClass("active") : btn.removeClass("active");
      });
      sections.map((sec) => {
        section == sec ? sec.removeClass("d-none") : sec.addClass("d-none");
      });
    });
  };

  activateSection(navBtnPokemon, sectionPokemon);
  activateSection(navBtnMoves, sectionMoves);
  activateSection(navBtnItems, sectionItems);
  activateSection(navBtnBerries, sectionBerries);
});
