
const TODOLIST = 'TODOLIST'
// create data 
let data = [
    {
        nameTask: 'Readbook',
        isCompleted: 'false'
    },
    {
        nameTask: 'Learn PHP',
        isCompleted: 'false'
    },
    // {
    //     nameTask: 'Run 2km',
    //     isCompleted: 'false'
    // }
]

const saveData = (data) => {
    localStorage.setItem(TODOLIST, JSON.stringify(data))

}
// saveData(data)

const loadData = () => {
    let data
    data = JSON.parse(localStorage.getItem(TODOLIST))
    data = data ? data : []
    return data
}

const addTask = (newTask) => {
    let data
    data = loadData()
    if(newTask.nameTask){
        data.push(newTask)
        // data=[...data,newTask]
        saveData(data)    
    }
    
    
    
}

const formTask = document.forms.formTask
formTask.addEventListener('submit', (e) => {
    const task = document.querySelector('.task')
    const btnSubmit =document.querySelector('.btn-submit')
    if(btnSubmit.value=='ADD TASK'){
        let newTask = {
            nameTask: task.value,
            isCompleted: false
        }
        addTask(newTask)
    }
    else{
        editTask()
        btnSubmit.value='ADD TASK'
        task.removeAttribute('index')

    }
    renderTask()
    task.value = ''
    e.preventDefault()

})


const renderTask = () => {
    let data, ulTaskPlace, liRenderTask,countCompleted,count
    data = loadData()
    ulTaskPlace = document.querySelector('.task-list')
    liRenderTask = document.querySelector('.task-item') 
    count=0
        liRenderTask=data.map((element, index) => {
            
            if(element.isCompleted==true){
                count++
            }
            return `
        <li class="task-item d-flex" index="${index}" isCompleted="${element.isCompleted}" >
        <p onclick="isCompleted(${index})" class="name-task" >${element.nameTask}</p>
        <button onclick="pushTask(${index})" class="btn-add-task"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteTask(this,${index})" class="btn-delete-task"><i class="fa-solid fa-trash-can"></i></button>
        </li>
        `
        })
        countCompleted = document.querySelector('.count-task-completed')
        if(count==0){
        countCompleted.innerHTML=`Try again !!! You can do it`
        }
        else{
            countCompleted.innerHTML=`Yeah, ${count} task completed`
        }
        // console.log(countCompleted)

    ulTaskPlace.innerHTML = liRenderTask.join('')
}
renderTask()

const isCompleted = (index)=>{
    let data
    data=loadData()
    data[index].isCompleted=data[index].isCompleted==false?true:false
    saveData(data)
    renderTask()
    // console.log(data[index].isCompleted)
}

const deleteTask = (element,index)=> {
    let data 
    data=loadData()
    // if(confirm('acept delete')==false){  // confirm delete
    //     return false
    // }
    
    data.splice(index,1)
    saveData(data)
    element.closest('.task-item').remove()
    const task = document.querySelector('.task')
    task.value=''
    renderTask()
    // console.log(element)
}

const pushTask = (index)=>{
    let data
    data=loadData()
    const task = document.querySelector('.task')
    const btnSubmit =document.querySelector('.btn-submit')
    task.value=data[index].nameTask
    btnSubmit.value = 'EDIT TASK'
    task.setAttribute('index',index)
    // console.log(task)
}

const editTask = ()=>{
    let data
    data=loadData()
    const task = document.querySelector('.task')
    const index = task.getAttribute('index')
    data[index].nameTask = task.value
    saveData(data)
    

    // console.log(data[index])
}

addEventListener('keyup',(e)=>{
    const task = document.querySelector('.task')
    const btnSubmit =document.querySelector('.btn-submit')
    if(e.which==27){
        task.value=''
        btnSubmit.value = 'ADD TASK'
        if(task.hasAttribute('index')){
            task.removeAttribute('index')
        }

    }

    // console.log(task.hasAttribute('index'))/
})

