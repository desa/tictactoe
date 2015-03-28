$(function() {

  // Define a player Constructor

  function Player() {
    this.weight = Player.pm;
    this.symbol = this.weight === 1 ? "X" : "O";

    Player.pm *= -1;
  };

  Player.pm = 1;

  // Define a board Constructor
  function Board() {
    this.scoreBoard = [[0,0,0],[0,0,0],[0,0,0]];
  };

//  Board.prototype.init = function() {
//  };
//
  // Add prototype method to set who the next player is
  // Use an ivff that intial

  Board.prototype.nextPlayer = (function(player) {
    var p1 = new player();
    var p2 = new player();
    this.currentPlayer = p1;
    var turn = false;
    return function() {
      turn = !turn;
      this.currentPlayer = turn ? p1 : p2;
      return this;
    };
  })(Player);

  // Convert a array index to matrix id

  Board.prototype.trackMove = function(id) {
    var quot = Math.floor(id/3);
    var rem = id % 3;
    this.scoreBoard[quot][rem] = this.currentPlayer.weight;
    return this;
  };

  // Add a prototype method to fill in the score board

  Board.prototype.fill = function(id) {
    this.nextPlayer().trackMove(id);

    console.log(this.scoreBoard[0]);
    console.log(this.scoreBoard[1]);
    console.log(this.scoreBoard[2]);

  };


  // Define a TicTacToe constructor
  function TicTacToe(jsBoard, domBoard) {
    var board = new jsBoard("X","O");
    var $dom = domBoard;
    this.init(board,$dom);
  };

  TicTacToe.prototype.init = function(jsBoard, domBoard) {
    var $boxes = domBoard.children('.box');
    $boxes.click(function(e) {
      var el = e.target;
      var $el = $(el);

      var id = Array.prototype.indexOf.call($boxes, el);
      jsBoard.fill(id);

      $el.html(jsBoard.currentPlayer.symbol).addClass(jsBoard.currentPlayer.symbol);
      $el.off('click');
    });
  };

  TicTacToe.prototype.reset = function() {
  };


  //b = new Board();
  //b.init();
  new TicTacToe(Board, $('#board'));

});

    // Wrap all code logic inside of a jQuery function call so
    // that all of the HTML has loaded. If we didn't do this
    // then we wouldn't be able to grab all of the HTML elements
    // off of the page (as they would not have loaded yet).
    //$(function() {
    //  // Use a immediately invoked function to create a closure
    //  // for the turn variable. The idea is to avoid polution the
    //  // current scope with extra variables. The return value of
    //  // the immediately invoked function, is another function
    //  // that returns 'X' if the `turn` variable is `true` and
    //  // 'O' otherwise.
    //  var currentPlayer = (function() {
    //    // Define a scoped variable that determines which players
    //    // turn it currently is.
    //    var turn = false;
    //    // Return a function that changes which players turn it is
    //    // by negating the `turn` variable.
    //    return function() {
    //      // Negate the turn variable. That is if `turn` is true
    //      // change it to `false` and if `turn` is `false` change
    //      // it to true.
    //      turn = !turn;
    //      // Use a ternary operator that gives 'X' if `turn` is
    //      // `true` and 'O' is `turn` is `false`
    //      return turn ? 'X' : 'O';
    //    };
    //  })();
    //
    //  // Grab the div with `id='board'` and set it to a variable
    //  // using jQuery
    //  var $board = $('#board');
    //  // Attach an `click` event listener to the board div
    //  // using jQuerys `.click` method
    //  $board.click(function(event) {
    //    // Use the event parameter to grab the target of the 
    //    // click event.
    //    // Use the jQuery `$` to turn the target element into a jQuery
    //    // HTML element
    //    var $el = $(event.target);
    //    // Grab the targets inner HTML using the jQuery `.html` method
    //    var elContent = $el.html();
    //    // Check to see if the inner HTML is '&nbsp;'
    //    if (elContent === '&nbsp;') {
    //      // If it is set the target elements inner HTML to be the
    //      // current player
    //      var player = currentPlayer();
    //      // Set the HTML elements inner html using the same jQuery
    //      // method that we used about to grab the elements content
    //      $el.html(player);
    //
    //      // Toggle the current elements player class using jQuery's
    //      // `.toggleClass` method.
    //      $el.addClass(player);
    //    } else {
    //      // Otherwise, log that the element has already been played
    //      console.log("That Square has been played");
    //    }
    //  });
    //
    //  // Grab the reset button by its id using jQuery
    //  var $reset = $('#reset');
    //
    //  // Add `click` event listener to the reset button
    //  // using jQuery's `click` method
    //  $reset.click(function(event) {
    //    // Grab all elements with `class='box'` by using
    //    // jQuery
    //    var $boxes = $('.box');
    ////       // Reset the class list to be only 'box'
    ////       // Reset the inner HTML to be 'nbsp' with jQuery's
    //    $boxes.html('&nbsp;').removeClass('X O');
    //    // Reset the current player to be 'X'
    //    // NOTE: THIS IS TRICKY
    //    if (currentPlayer() === 'X') {
    //      currentPlayer();
    //    }
    //  });
    //
    //});
