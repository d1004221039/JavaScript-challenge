var model = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  playerOne: "",
  playerTwo: "",
  currentPlayer: "",

  checkWinning: function(player){
    if ( this.board[0][0] === player && this.board[0][1] === player && this.board[0][2] === player
      || this.board[1][0] === player && this.board[1][1] === player && this.board[1][2] === player
      || this.board[2][0] === player && this.board[2][1] === player && this.board[2][2] === player
      || this.board[0][0] === player && this.board[1][0] === player && this.board[2][0] === player
      || this.board[0][1] === player && this.board[1][1] === player && this.board[2][1] === player
      || this.board[0][2] === player && this.board[1][2] === player && this.board[2][2] === player
      || this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player
      || this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player
    ) {
        view.displayStatus(player)
        $('#alert').removeClass('hide')
    } else {
      this.swapPlayer()
    }
  },
  insertMove: function(x, y, player){
    if(this.board[x][y] ===""){
      this.board[x][y] = player
      view.displayBoard()
      this.checkWinning(player)
    }
  },
  computerMove: function(){
    var x = Math.round(Math.random()*2)
    var y = Math.round(Math.random()*2)
    console.log("1")
      if(this.board[x][y] == ""){
      this.insertMove(x, y, this.playerTwo);
      return;
    }
    this.computerMove()
  },
  swapPlayer: function(){
    this.currentPlayer === this.playerOne ?
      this.currentPlayer = this.playerTwo : this.currentPlayer = this.playerOne;
    if(this.currentPlayer === this.playerTwo){
      this.computerMove();
    }

  },
  reset: function(){
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = this.playerOne
    view.displayBoard();
    $("#alert").addClass('hide')
  }
}

handlers = {
  insertPlayerMove: function(x,y, player){
    model.insertMove(x,y, player)
  },
  startGame: function(e){
    var symbol = e.innerText;
    if(symbol === "X"){
      model.playerOne = "X"
      model.playerTwo = "O"
    } else {
      model.playerOne = "O"
      model.playerTwo = "X"
    }
    model.reset()
    $("table").removeClass('hide')
    $("#status").removeClass('hide')
    $("#selection").addClass('hide');
  },
  animate: function(e){
    var animationName = 'animated shake';
    var animationEnd = 'webkitanimationend mozanimationend msanimationend oanimationend animationend'
    $(e).addClass(animationName)
      .one(animationEnd, function(){
      $(this).removeClass('animated shake');
    });
    // webkitanimationend mozanimationend msanimationend oanimationend animationend
  }
}

view = {
  displayBoard: function(){
    var cellOne = $('#cellOne')
    var cellTwo = $('#cellTwo')
    var cellThree = $('#cellThree')
    var cellFour = $('#cellFour')
    var cellFive = $('#cellFive')
    var cellSix = $('#cellSix')
    var cellSeven = $('#cellSeven')
    var cellEight = $('#cellEight')
    var cellNine = $('#cellNine')

    cellOne.html(model.board[0][0])
    cellTwo.html(model.board[0][1])
    cellThree.html(model.board[0][2])
    cellFour.html(model.board[1][0])
    cellFive.html(model.board[1][1])
    cellSix.html(model.board[1][2])
    cellSeven.html(model.board[2][0])
    cellEight.html(model.board[2][1])
    cellNine.html(model.board[2][2])

  },
  displayStatus: function(player){
    $('#alert').html(player + ' has Won')
  }
}
