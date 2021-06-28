

var model = {
    playerOne :"",
    playerTwo :"",
    gameGrid :[
        ['','',''],
        ['','',''],
        ['','','']
    ],
    computerlock:0,
    checkWinIndex:0,
    
    insertGrid(x,y,value){
        this.gameGrid[x][y]=value
        view.displayGrid()
        this.checkWin(value)
      
    },
    computerMove(){
        this.computerlock += 1
        x = Math.round(Math.random()*2)
        y = Math.round(Math.random()*2)
  
        if(this.gameGrid[x][y] == "") { 
            this.computerlock = 0
            this.insertGrid(x,y,this.playerTwo)
           
        } else if( this.computerlock < 50){ //新增一個lock，不會在最後出現無限涵式的問題，但唯一一個bug是，如果50次都沒辦法找到一個空白電腦就不會動
            this.computerMove()
        } 
    },
    reset(){
        this.gameGrid =[
            ['','',''],
            ['','',''],
            ['','','']
        ],
        view.displayGrid()
        view.resetyAlert()
        if( this.playerTwo == "O")this.computerMove()
    },
    checkWin(value){
        
        if(this.gameGrid[0][0] == value && this.gameGrid[0][1] ==value && this.gameGrid[0][2] ==value 
           ||  this.gameGrid[1][0] == value && this.gameGrid[1][1] ==value && this.gameGrid[1][2] ==value 
           ||  this.gameGrid[2][0] == value && this.gameGrid[2][1] ==value && this.gameGrid[2][2] ==value
           ||  this.gameGrid[0][0] == value && this.gameGrid[1][0] ==value && this.gameGrid[2][0] ==value
           ||  this.gameGrid[0][1] == value && this.gameGrid[1][1] ==value && this.gameGrid[2][1] ==value 
           ||  this.gameGrid[0][2] == value && this.gameGrid[1][2] ==value && this.gameGrid[2][2] ==value
           ||  this.gameGrid[0][0] == value && this.gameGrid[1][1] ==value && this.gameGrid[2][2] ==value
           ||  this.gameGrid[0][2] == value && this.gameGrid[1][1] ==value && this.gameGrid[2][0] ==value
            ){
           view.displayAlert(value)
        }
    }
}

var handlers = {
    startGame(value){ //開始遊戲
    if(value.innerHTML =="X"){
        model.playerOne = "X"
        model.playerTwo = "O"
        model.computerMove()
    }else{
        model.playerOne = "O"
        model.playerTwo = "X"
    }
    view.startGame() 
    },

    insertPlayerMove(x,y,value){
        if(model.gameGrid[x][y] == "" && model.checkWinIndex == 0){
            model.insertGrid(x,y,value)
            if( model.checkWinIndex == 0)model.computerMove()
        }
        
        
    },
    animate: function(e){  //說實在，這段我完全看不懂......只知道是搖動效果，這段是複製老師代碼，其他部分都是嘗試自己寫
        var animationName = 'animated shake';
        var animationEnd = 'webkitanimationend mozanimationend msanimationend oanimationend animationend'
        $(e).addClass(animationName)
          .one(animationEnd, function(){
          $(this).removeClass('animated shake');
        });
        // webkitanimationend mozanimationend msanimationend oanimationend animationend
      }
}

var view ={
    startGame(){ //顯示遊戲畫面
        $('#selection').addClass('hide') //這個取到的是陣列值 ，但可以直接addClass跟removeClass
        $('#status').removeClass('hide')
        $('table')[0].classList.remove('hide') //舊的方法
    },

    cellOne : $('#cellOne'),
    cellTwo : $('#cellTwo'),
    cellThree: $('#cellThree'),
    cellFour: $('#cellFour'),
    cellFive: $('#cellFive'),
    cellSix: $('#cellSix'),
    cellSeven: $('#ellSeven'),
    cellEight: $('#cellEight'),
    cellNine: $('#cellNine'),
    alert : $('#alert')[0],
    displayGrid(){
        cellOne.innerHTML = model.gameGrid[0][0]
        cellTwo.innerHTML = model.gameGrid[0][1]
        cellThree.innerHTML = model.gameGrid[0][2]
        cellFour.innerHTML = model.gameGrid[1][0]
        cellFive.innerHTML = model.gameGrid[1][1]
        cellSix.innerHTML = model.gameGrid[1][2]
        cellSeven.innerHTML = model.gameGrid[2][0]
        cellEight.innerHTML = model.gameGrid[2][1]
        cellNine.innerHTML = model.gameGrid[2][2]
    },
    displayAlert(value){
        
        this.alert.innerHTML = value+'win'
        this.alert.classList.remove('hide')
        model.checkWinIndex = 1
    },
    resetyAlert(){
        this.alert.classList.add('hide')
        model.checkWinIndex = 0
    }
}

//Math.random()
//https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random