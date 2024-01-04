
let submit = document.querySelector("#submit")
let todo = document.querySelector(".todo")
let label = document.querySelector("#label")
let provider = document.querySelector("#name")
let colorPicker = document.getElementById("color-picker")
let text = document.getElementById("text")
let buttons = document.querySelectorAll(".last button")


emptyArray = [];

// doneArray = []


if (window.localStorage.getItem("tasks")){
    emptyArray = JSON.parse(window.localStorage.getItem("tasks"))
    
}



getFromLocal()

function empty(){
    text.value =""
    provider.value=""
    label.value =""
    text.focus()

}

submit.onclick = function (){
    if(text.value !== "" && provider.value !== ""&& label.value !== ""){
        addElements(text.value,provider.value,label.value,colorPicker.value)

        empty()

    }else if ( text.value !== "" && provider.value !== "" ){
            addElements(text.value,provider.value,"" ,colorPicker.value)
            empty()
    }else if (text.value !== ""){
        provider.focus()
    }

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
        ele.target.disabled = true

        let text = ele.target.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild


        toggleLocal(id.getAttribute("data-id"),id)


        text.style.textDecoration = "line-through"
        for(let i = 0; i < emptyArray.length; i++){
            emptyArray[i].checked = "noactive"
            emptyArray[i].check = "checked"
            emptyArray[i].style = "line-through !important"
        }
        addToLocal(emptyArray)

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

                 }

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

function addElements (textValue,provider,label,color){
    let tasks = {
        id: emptyArray.length+1,
        content: textValue,
        providerName:provider,
        label:label,
        colorHash:color,
        todo: false
    }
    emptyArray.push(tasks)


    addToPage(emptyArray)

    addToLocal(emptyArray)
    
}

console.log(emptyArray)

function addToPage(emptyArray){
    todo.innerHTML = ""; 


        let result = emptyArray.map((task) => {
            return  `<div data-id="${task.id}" todo="${task.todo}" class="row fir row-cols-3 pt-2 pb-2 text d-flex flex-row justify-content-center align-items-center ">
            <div class="col-lg-2 col-md-2 col-sm-2 col-2 left d-flex flex-row justify-content-center align-items-center">
              <span class="color me-3 rounded-1 " style="background-color: ${task.colorHash} !important;"></span>
              <div class="form-check">
               <input class="form-check-input ${task.checked}" type="checkbox" id="defaultCheck1" ${task.check}>
               <label class="form-check-label" for="defaultCheck1">
               </label>
             </div>
            </div>
             <div class="col-lg-7 col-md-7 col-sm-6 col-7 content d-flex  flex-column align-items-start">
              <div class="first-child d-flex flex-row mt-1 justify-content-center align-items-center">
                  <p class="value me-2 fw-bold text-capitalize" style="text-decoration:${task.style};">${task.content}</p>
                ${badgeRemane(task.label,task.colorHash)}
              </div>
              <div class="second-child">
                 <figure class="m-0">
                     <figcaption class="blockquote-footer mb-0"> ${task.providerName} </figcaption>
                  </figure>
              </div>
             </div>
            <div class="col-lg-3 col-md-3 col-sm-4 col-3 last widget-content-right d-flex flex-row justify-content-end ">
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


function toggleLocal(taskid , htmltask){
    for(let i = 0; i < emptyArray.length; i++){
        if(emptyArray[i].id == taskid){
            emptyArray[i].todo == false ? (emptyArray[i].todo = true) : (emptyArray[i].todo = true)
            htmltask.setAttribute("todo",true)
        }
    }
    addToLocal(emptyArray)
}
// function toggledone(taskid){
//     for(let i = 0; i < doneArray.length; i++){
//         if(doneArray[i].id == taskid){
//             doneArray[i].todo == true ? (doneArray[i].todo = false) : (doneArray[i].todo = true)

//         }
//     }
//     DoneLocal(doneArray)
// }

// function addToDone(doneArra){
    
//     done.innerHTML = ""

//     doneArra.forEach((task) => {
//         let div = document.createElement("div")

//         div.className = "text active";
    
//         div.setAttribute("data-id", task.id)

//         div.setAttribute("state", task.todo)
//         let edit = document.createElement("button")

//         edit.className = "button edit"

//         edit.innerHTML = "edit"


//         let p  = document.createElement("p")

//         let secp = document.createElement("p")

//         secp.appendChild(document.createTextNode(task.content))
    
//         p.appendChild(secp)

//         p.className = "one"
    
//         let span = document.createElement("span")
    
//         span.className = "button del"
    
//         span.innerText = "Delete"

//         div.appendChild(p)
//         div.appendChild(edit)

    
//         div.appendChild(span)
    
//         done.appendChild(div)

//         document.querySelectorAll(".text").forEach((ele) => {
//             if(task.id == ele.getAttribute("data-id")){
//                 ele.classList.add("active")
                
//             }else {
//                 ele.classList.remove("active")
//             }
            
//          })
//     })
// }

// getFromDone()

// function getFromDone(){
//     let data = window.localStorage.getItem("done")

//     if(data){
//         let task = JSON.parse(data)

//         addToDone(task)
//     }
// }

// function delDone(taskid){
//      doneArray = doneArray.filter((task) => task.id != taskid)

//     DoneLocal(doneArray)
// }

// function updateDone(taskid,form){
//     for(i = 0; i < doneArray.length; i++){
//         if(doneArray[i].id == taskid){
//             doneArray[i].content = form.value
//         }
//     }
// }

// done.addEventListener("click" ,(ele) => {
//     if(ele.target.classList.contains("del")){

//         delDone(ele.target.parentElement.getAttribute("data-id"))


//         ele.target.parentElement.remove()
//     }
//     if(ele.target.classList.contains("edit")){
//         for (let i = 0; i < doneArray.length; i++){
//             if(doneArray[i].id == ele.target.parentElement.getAttribute("data-id")){

// function edit(){
    
//     let form = document.createElement("input")

//     form.type = "text"

//     form.id = "inputDone"
    
//     let one  = ele.target.previousElementSibling

//     console.log(one)

//     form.value = one.innerText

//     one.firstElementChild.remove()

//     one.appendChild(form)

//     ele.target.nextSibling.remove()


//     let OkButton = document.createElement("span")

//     OkButton.className = "button"

//     OkButton.id = "ok"

//     OkButton.innerText = "ok"
//     ele.target.parentElement.appendChild(OkButton)

//     ele.target.setAttribute("aria-disabled","true")

//     ele.target.disabled = true

//     toggledone(ele.target.parentElement.getAttribute("data-id"))

// }
// edit()

//                 // ele.target.remove()

//             }
//         }

//     }
//     if(ele.target.id == "ok"){
//         updateDone(ele)
//         // for(let i = 0 ; i < doneArray.length; i++){
//         //     if(doneArray[i].id == ele.target)
//         // }

//         addToDone(doneArray)
//     }
    

// })



function updateDone(ele){
    for(let i = 0 ; i < emptyArray.length; i++){
        if(emptyArray[i].id == ele.target.parentElement.parentElementparentElement.getAttribute("data-id")){
            let textV = ele.target.parentElement.firstElementChild.firstElementChild.value

            emptyArray[i].content = textV

            console.log(            doneArray[i].content = textV
                )
        }
    }
    DoneLocal(doneArray)
}

// document.querySelectorAll(".text").forEach((ele) => { 
//     ele.classList.remove("active")
// })


