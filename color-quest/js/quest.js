(function() {
    var game  = window.colorQuestGame = window.colorQuestGame || {};

    //level data
    var questLevels = [
      [ [5,6], [3]],
      [ [6], [1,2]],
      [ [5.6] ],
      [ [3], [1,2], [4]],
      [ [1,2], [3], [4], [5,6]],
    ];

    //quest model definition
    //comparioson logic for player answer against Composition
    var Quest = game.Quest = (function() {
      function Quest(level) {
        var questData = questLevels[level];
        this.data = questData;
      }
      Quest.prototype = new game.Composition();
      //extends the quest prototype from composition
      return Quest;
    }) ();
}) ();
