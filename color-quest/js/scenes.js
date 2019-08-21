(function() {
  var game = this.colorQuestGame = this.colorQuestGame || {};

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
) ();

var gameScene = game.gameScene = Object.create(scene);
gameScene.node = document.getElementById('game-scene');
gameScene.handleInput = function() {
  document.getElementById('finish-btn').onclick = function() {
    game.flow.finishLevel();
  };
};

var startScene = game.startScene = Object.create(scene);
startScene.node = document.getElementById('start-scene');
startScene.handleInput = function() {
  document.getElementById('start-btn).onclick = function() {
    game.flow.nextLevel();
  };
};

})
