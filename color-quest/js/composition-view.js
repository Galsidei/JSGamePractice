(function() {
    var game  = window.colorQuestGame = window.colorQuestGame || {};

    //composition module
    game.compositionView = {
      node: document.getElementById('your-composition'),
      pushPattern: function(patternId) {
        var newChild = document.createElement('div');
        newChild.classList.add('pattern');
        newChild.setAttribute('data-pattern', patternId);
        this.node.appendChild(newChild);
      },
      pullPattern: function() {
        var lastChild = this.node.querySelector('.pattern:last-child');
        if (lastChild) {
          //find the pattern on the deck and make it visible
          var deckNode = document.getElementById('deck');
          var resumePattern = deckNode.querySelector('[data-pattern="' + lastChild.getAttribute('data-pattern') + '"]');
          resumePattern.style.display = 'block';

          //remove current pattern
          this.node.removeChild(lastChild);
        }
      },
      selectPattern: function(pattern) {
        this.pushPattern(pattern);
        game.compositionSeq.push(pattern);
      },
      undo: function() {
        this.pullPattern();
        game.compositionSeq.pop();
      },
    };
}) ();
