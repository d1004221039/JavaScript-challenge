var model={
    allString :"0", //存全部result的內容
    lastValue :"0", //存最後一個按進來值
    pointValue:'.', //存點點
    arithmetic:['+','-','*','/'],//存四則運算符號

    clear:function(){
        this.allString = "0"
        view.displayResult()
        view.displayHistory()
    },
    clearInputs:function(){
        this.allString = "0"
        view.displayResult()
    },

    sumString:function(value){
        this.lastValue = value.innerHTML
        console.log(this.lastValue)
        if(this.allString=="0")this.allString =""
        this.allString += value.innerHTML ;
       // view.display( this.allString );
        view.displayResult()
    },

    transformString:function(){
        //判斷如果最後為四則運算就不動
        var judgment = 0
        this.arithmetic.forEach(function(i){
            if(i == model.lastValue) judgment = 1
        })
      
        if (judgment == 0){
            if(this.allString == handlers.history.innerHTML) view.displayResult()
            this.allString = eval(this.allString)
            view.displayHistory()
        }
        
    }

}

var handlers={
    result:document.getElementById('result'),
    history:document.getElementById('history'),
    //全部清空
    clear:function(){ 
        model.clear()
    },
    //清空運算
    clearInputs:function(){
        model.clearInputs()
    },

    getValue:function(value){ //原來只要.innerHTML就能取得裡面的值
        if(model.allString.length===1 && model.arithmetic.includes(value.innerHTML) &&  model.allString ==="0" ) { //includes 只要有這個就能直接判斷陣列裡面的值，不用跑迴圈抓每一個
            alert(`User can't start with operators`);
        } else if(model.arithmetic.includes(model.lastValue )  && model.arithmetic.includes(value.innerHTML ) ) {
            alert(`User can't duplicate operators`);
        } else if (model.pointValue ===value.innerHTML && model.lastValue == model.pointValue){ 
            alert(`User can't double period ".."`);
        }else if( model.allString.length >10 ){
            alert(`MAX Length Reach`);
        }else {
            model.sumString(value)
        }
        
    },

    getTotal:function(){
        model.transformString()
    }
}

var view ={
    display:function(allString){
        console.log( allString)
    },

    displayResult:function(){
        handlers.result.innerHTML = model.allString
    },
    displayHistory:function(){
        handlers.history.innerHTML= model.allString
    }
}
//Array.prototype.includes()
//https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// eval()
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval