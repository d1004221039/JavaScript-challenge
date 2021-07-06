
var model ={
    todoList:[],//[0]表內容 ; [1] "0"表完成,"1"表完成
    changeItem:0,
    toggleAllButton:0
}

var controller={
    addTodoBtn :document.querySelector("#addTodoBtn"),
    newTodoModal: document.querySelector("#newTodoModal"),
    addNewModalCross: document.querySelector("#addNewModalCross"),
    addNewBtn:document.querySelector("#addNewBtn"),
    addTodoTextInput:document.querySelector("#addTodoTextInput"),
    todoList:document.querySelector("#todoList"),
    updateTodoModal:document.querySelector("#updateTodoModal"),
    updateModalCross:document.querySelector("#updateModalCross"),
    updateTodoTextInput:document.querySelector("#updateTodoTextInput"),
    toggleAllButton:document.querySelector("#toggleAllButton"),

    event(){
        //所有事件
        //點開 新增視窗按鈕
        controller.addTodoBtn.addEventListener('click', ()=>{
            view.openNew()
        })

        //XX關閉新增視窗
        controller.addNewModalCross.addEventListener('click', ()=>{
            view.closeNew()
        })

        //新增todo 按鈕
        controller.addNewBtn.addEventListener('click', ()=>{
            model.todoList.push([controller.addTodoTextInput.value,0] )
            view.closeNew()
            view.displayTodoList()
        })

        //刪除按鈕
        //https://developer.mozilla.org/zh-TW/docs/orphaned/Web/API/HTMLOrForeignElement/dataset  dataset的用法，存取資料用，新知識
        todoList.addEventListener('click', (e)=>{
        if(e.target.id =="deleteTodoBtn") {
                var index = e.target.dataset.item
                model.todoList.splice(index,1)
                view.displayTodoList()
        }
        })

        //點開 更改內容按鈕
        todoList.addEventListener('click', (e)=>{
            if(e.target.id =="updateTodoBtn") {
                view.openchange()
                model.changeItem = e.target.dataset.item
            }
        })

        //XX關閉更新視窗
        updateModalCross.addEventListener('click', ()=>{
            view.closechange()
        })

        //更改todo 按鈕
        updateModalBtn.addEventListener('click',(e)=>{
            model.todoList[model.changeItem ][0] = controller.updateTodoTextInput.value 
            view.closechange()
            view.displayTodoList()
        })

        //點是否完成事項
        todoList.addEventListener('click', (e)=>{
            if(e.target.id =="toggleComplete") {
                var index = e.target.dataset.item
                model.todoList[index][1] =1-model.todoList[index][1]
                view.displayTodoList()
            }
        })

        //點toggle all 
        toggleAllButton.addEventListener('click',()=>{
            model.toggleAllButton = 1-  model.toggleAllButton 
            model.todoList.forEach(e =>{
                e[1] =  model.toggleAllButton 
            })
            view.displayTodoList()
        })
    }

    
}

var view ={
    openNew(){
        controller.newTodoModal.classList.remove("hidden")
    },
    closeNew(){
        controller.newTodoModal.classList.add("hidden")
    },
    openchange(){
        controller.updateTodoModal.classList.remove("hidden")
    },
    closechange(){
        controller.updateTodoModal.classList.add("hidden")
    },
    displayTodoList(){
        controller.todoList.innerHTML =""
        model.todoList.forEach((currentValue,index)=> {
            if (currentValue[1] == 1){
                controller.todoList.innerHTML=controller.todoList.innerHTML+
                `<li class="border-b border-purple-400 text-xl py-4 flex justify-between items-center">
                    <div class="flex items-center">
                        <img id="toggleComplete" data-item="${index}" class="w-8 mr-2"
                        src="https://cdn.glitch.com/0946ee55-e0f2-43ff-b69c-572b4d821198%2Fcheckbox.png?v=1577886293867" />
                        ${currentValue[0]}
                    </div>
                    <div class="flex">
                        <img id="updateTodoBtn" data-item="${index}"  src="./edit.svg"
                        style="width: 18px; margin-right: 5px;" />
                        <img id="deleteTodoBtn" data-item="${index}"  src="./trash.svg" style="width: 18px; " />
                    </div>
                </li> `
            } else if (currentValue[1] ==0){
                controller.todoList.innerHTML=controller.todoList.innerHTML+    
                `<li class="border-b border-purple-400 text-xl py-4 flex justify-between items-center">
                <div class="flex items-center">
                    <span id="toggleComplete" data-item="${index}" class="inline-block mr-2 w-8 h-8 bg-purple-200"></span>${currentValue[0]}
                </div>
                <div class="flex">
                    <img id="updateTodoBtn" data-item="${index}"  src="./edit.svg"
                    style="width: 18px; margin-right: 5px;" />
                    <img id="deleteTodoBtn" data-item="${index}"  src="./trash.svg" style="width: 18px; " />
                </div>
            </li> `
            }
        });
       
    }
}
controller.event()

