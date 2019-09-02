(function() {
  var game = this.colorQuestGame = this.colorQuestGame || {};

  // Scenes
  var scene = {
    node: document.querySelector('.scene'),
    show: function() {
      this.node.classList.remove('out');
      this.node.classList.add('in');
    },
    hide: function() {
      this.node.classList.remove('in');
      this.node.classList.add('out');
    }
  };

var gameScene = game.gameScene = Object.create(scene);
gameScene.node = document.getElementById('game-scene');
gameScene.handleInput = function() {
  document.querySelectorAll("#deck .pattern").forEach(function(elm) {
    elm.onclick=function() {
      var pattern = elm.getAttribute('data-pattern');
      elm.style.display = 'none';
      game.compositionView.selectPattern(pattern);
    };
  });

  document.getElementById('undo-button').onclick = function(e){
    game.compositionView.undo();
    e.preventDefault();
  };

};

gameScene.hide = function() {
  // invoke the show function inside the prototype chain. (aka. super.hide())
  Object.getPrototypeOf(this).hide.call(this);

  /* extra */
  // add the class for the out effect
   var questView = document.getElementById('quest');
   questView.classList.add('out');
  /* end extra */
}

gameScene.visualize = function(quest) {
  var questData = quest.data;
  var patternsToShow = [];
  for (var i in questData) {
    for (var j in questData[i]) {
      patternsToShow.push(questData[i][j]);
    }
  }

  ///// Quest
  // visualize the quest composition view:
  var questCompositionNode = document.getElementById('quest-composition');

  // empty the DOM view
  questCompositionNode.removeAllChildren();

  // visualize the pattern view:
  for (var i in patternsToShow) {
    var patternNode = document.querySelector('#element-template .pattern').cloneNode(/*clone children=*/true);
    patternNode.setAttribute('data-pattern', patternsToShow[i]);
    questCompositionNode.appendChild(patternNode);
  }

  //randomize the pattern's array
  patternsToShow.sort(function(a,b){
    return Math.random() - 0.5;
  });

  //empty the current deck questView
  var deckNode = document.getElementById('deck');
  deckNode.removeAllChildren();

  //add the pattern to the deck questView
  for (var i in patternsToShow) {
    var patternSlotNode = document.querySelector('#element-template .pattern-slot').cloneNode(/*clone children=*/true);
    patternSlotNode.querySelector('.pattern').setAttribute('data-pattern', patternsToShow[i]);
    deckNode.appendChild(patternSlotNode);
  }
};

var startScene = game.startScene = Object.create(scene);
startScene.node = document.getElementById('start-scene');
startScene.handleInput = function() {
  document.getElementById('start-btn').onclick = function() {
    game.flow.nextLevel();
  };
};

var summaryScene = game.summaryScene = Object.create(scene);

summaryScene.node = document.getElementById('summary-scene');
summaryScene.handleInput = function() {
summaryScene.node = document.getElementById('next-level-button').onclick = function() {
  game.flow.nextLevel();
};
};

var gameoverScene = game.gameoverScene = Object.create(scene);
gameoverScene.node = document.getElementById('gameover-scene');
gameoverScene.handleInput = function() {
  var scene = this;
  document.getElementById('back-to-menu-button').onclick = function() {
    game.flow.startOver();
  };
};

})();
