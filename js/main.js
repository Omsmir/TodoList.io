
let submit = document.querySelector("#submit")
let todo = document.querySelector(".todo")
let label = document.querySelector("#label")
let provider = document.querySelector("#name")
let colorPicker = document.getElementById("color-picker")
let text = document.getElementById("text")
let buttons = document.querySelectorAll(".last button")
let colorLine = document.querySelector("#color-line")

emptyArray = [];

// doneArray = []

text.focus()
if (window.localStorage.getItem("tasks")){
    emptyArray = JSON.parse(window.localStorage.getItem("tasks"))
    
}



getFromLocal()

function empty(){
    text.value =""
    provider.value=""
    label.value =""
}

submit.onclick = function (){
    if(text.value !== "" && provider.value !== ""&& label.value !== ""){
        let valid = /[a-z]/g;

        let success = provider.value.match(valid).join("")
        addElements(text.value,success,label.value,colorPicker.value,colorLine.value)

        empty()

    }else if ( text.value !== "" && provider.value !== "" ){
        let valid = /[a-z]/g;

        let success = provider.value.match(valid).join("")
            addElements(text.value,success,"" ,colorPicker.value,colorLine.value)
            empty()
    }else if (text.value !== ""){
        provider.focus()
    }

}



function toggleLocal(taskid ,check,value,style){
    for(let i = 0; i < emptyArray.length; i++){
        if(emptyArray[i].id == taskid){
            emptyArray[i].todo == false ? (emptyArray[i].todo = true) : (emptyArray[i].todo = false)
            // htmltask.setAttribute("todo",false ? true : false)            
            emptyArray[i].checked = `${check}`
            emptyArray[i].check = `${value}`
            emptyArray[i].style = `${style}`  
        }
    }
    addToLocal(emptyArray)
    addToPage(emptyArray)

}


todo.addEventListener("click" , (ele) =>{
    if(ele.target.classList.contains("delete") ){   

function delLocal(taskid){
    emptyArray = emptyArray.filter((tasks) => tasks.id != taskid)
    addToLocal(emptyArray)
}
        
delLocal(ele.target.parentElement.parentElement.parentElement.getAttribute("data-id"))

    ele.target.parentElement.parentElement.parentElement.remove()


    }

let id = ele.target.parentElement.parentElement.parentElement

    if(ele.target.id == "defaultCheck1"){

            if(ele.target.parentElement.parentElement.parentElement.getAttribute("todo") == "false"){
                toggleLocal(id.getAttribute("data-id"),"","checked","line-through !important")
            }else if (ele.target.parentElement.parentElement.parentElement.getAttribute("todo") == "true"){
                toggleLocal(id.getAttribute("data-id"),"","","none !important")

            }
        
    }


if(ele.target.classList.contains("edit")){
    for (let i = 0; i < emptyArray.length; i++){
        if(emptyArray[i].id == ele.target.parentElement.parentElement.parentElement.getAttribute("data-id")){

            function edit(){
    
                let form = document.createElement("input")
            
                form.type = "text"
            
                form.id = "inputDone"
                
                let one  = ele.target.parentElement.parentElement.previousElementSibling.firstElementChild
            
                console.log(one)
            
                form.value = one.firstElementChild.innerText

                one.firstElementChild.remove()
                        
                one.prepend(form)            
            
                ele.target.disabled = true


                let hand = ele.target.previousElementSibling.firstElementChild
                form.onfocus = () => {     
                        hand.classList.add("active")                 
                 }
                 form.onblur = () =>{
                
                    hand.classList.remove("active")                 
                    emptyArray[i].content = form.value

                    addToLocal(emptyArray)

                    addToPage(emptyArray)
                 }
                 form.focus()


                 let okayButton = ele.target.previousElementSibling

                 okayButton.addEventListener("click" ,() => {
                    emptyArray[i].content = form.value

                    addToLocal(emptyArray)

                    addToPage(emptyArray)
                 })
            
            }
            edit()
        }}}

})

function addElements (textValue,provider,label,color,line){
    let tasks = {
        id: emptyArray.length+1,
        content: textValue,
        providerName:provider,
        label:label,
        colorHash:color,
        colorl:line,
        todo: false
    }
    emptyArray.push(tasks)


    addToPage(emptyArray)

    addShow(emptyArray)

    addToLocal(emptyArray)
    
}

console.log(emptyArray)

function addToPage(emptyArray){
    todo.innerHTML = ""; 


        let result = emptyArray.map((task) => {
            return  `<div data-id="${task.id}" todo="${task.todo}" class="row fir row-cols-3 text d-flex flex-row justify-content-center align-items-center ">
            <div class="col-lg-2 col-md-2 col-sm-2 col-4 left d-flex flex-row justify-content-center align-items-center">
              <span class="color me-3 rounded-1 " style="background-color: ${task.colorl} !important;"></span>
              <div class="form-check">
               <input class="form-check-input ${task.checked}" type="checkbox" id="defaultCheck1" ${task.check}>
               <label class="form-check-label" for="defaultCheck1">
               </label>
             </div>
            </div>
             <div class="col-lg-7 first col-md-7 col-sm-7 col-8 content d-flex  flex-column align-items-start">
              <div class="first-child d-flex flex-row mt-1 justify-content-center align-items-center">
                  <p class="value me-2 fw-bold text-capitalize" style="text-decoration:${task.style};">${task.content} </p>
                ${badgeRemane(task.label,task.colorHash)}
              </div>
              <div class="second-child">
                 <figure class="m-0">
                     <figcaption class="blockquote-footer mb-0"> ${task.providerName} </figcaption>
                  </figure>
              </div>
             </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-12 last widget-content-right d-flex flex-row justify-content-center ">
             <div class="row row-cols-3">
                <button class="col finished border-0 btn-transition rounded-0 btn btun position-relative">
                    <i class="fa fa-hand-pointer"></i>
                    <i class="fa fa-check"></i>
                    </button>
                    <button class="col edit border-0 btn-transition rounded-0 btn btun">
                      <i class="fa fa-edit "></i>  
                    </button>
                  <button class="col delete border-0 btn-transition rounded-0 btn btun ">
                    <i class="fa fa-trash"></i>               
                  </button>
             </div>
            </div>
           </div>  `

        })
   
        todo.innerHTML = result.join("")


}

function badgeRemane(content,colorhash) {
    let badge = `<span class="badge" style="background-color: ${colorhash} !important;">${content}</span>`

    return badge
}

   

function addToLocal(emptyArray){
    window.localStorage.setItem("tasks", JSON.stringify(emptyArray))

}

// function DoneLocal(doneArray){
//     window.localStorage.setItem("done",JSON.stringify(doneArray))
// }

function getFromLocal(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let task = JSON.parse(data)
        addToPage(task)
    }
}



document.querySelectorAll(".row.fir").forEach((ele) => { 
    ele.classList.remove("show")
})


function addShow(emptyArray){
    emptyArray.forEach((tasks) => {
        document.querySelectorAll(".row.fir").forEach((ele) => {
            if(tasks.id == ele.getAttribute("data-id")){
                console.log("ok")
                ele.classList.add("show")
                
            }else {
                ele.classList.remove("show")
            }
            
         })
       })
}