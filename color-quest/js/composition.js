(function() {
    var game  = window.colorQuestGame = window.colorQuestGame || {};

    //composition (pattern) model definition
    var Composition = game.Composition = (function() {
      function Composition() {
        this.data = [];
      }

      return Composition;
    })();
  })();
