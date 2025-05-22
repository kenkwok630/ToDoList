import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { FaRegMinusSquare, FaRegCheckSquare } from "react-icons/fa";
import UpdateTask from "./UpdateTask"

const ToDoList = () => {
    const uid = Date.now()
    const [errorMessage, setErrorMessage] = useState("")
    const [inputValue, setInputValue] = useState(() => {
        const saveLocalData = localStorage.getItem("task")
        return saveLocalData ? JSON.parse(saveLocalData) : []
    })
    const [task, setTask] = useState("")
    const [isOpenUpdate, setOpenUpdate] = useState(false)
    const [updateTask, setUpdateTask] = useState(null)

     const showErrorMessage = () =>{
        setErrorMessage("Please enter a task title")
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(task.trim()){
            setInputValue([...inputValue, {id: uid ,title: task, isFinish: false}])
            setErrorMessage("")
        }else{
           showErrorMessage() 
        }
        setTask("")
    }

    useEffect(()=>{
        localStorage.setItem("task", JSON.stringify(inputValue))
    },[inputValue])
    

    const handleDelete = (id, title) =>{
        const confirm = window.confirm(`Are you confrim delete the task: ${title}?`)
        if(confirm === true){
            setInputValue(inputValue.filter((task) => task.id !== id))
        }
    }

    const handleUpdate = (task) =>{ 
        setUpdateTask(task)
        setOpenUpdate(true)
    }

    const handleUpdateTask = (updatedTask) => {
    setInputValue(inputValue.map((task) =>task.id === updatedTask.id ? updatedTask : task))
    setOpenUpdate(false);
    setUpdateTask(null);
  };
  
  return (
    <div className="firstDiv">
        <h1>To Do List</h1>
            <div className="secondDiv">
                <p>Add a new task</p>
                <input type="text" className="task" value={task} onChange={(e)=> setTask(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Add Task</button>
                <p style={{color: "red", margin: "10px", textAlign: "center"}}>{errorMessage}</p>
            </div>
            
            {inputValue.map((tasks) => (
                <div className="card" key={tasks.id}>
                    <div>
                    {tasks.isFinish ? <FaRegCheckSquare style={{color: "green", margin: "5px"}} size={50}/> : <FaRegMinusSquare style={{color: "red", margin: "5px"}} size={50}/>}
                    </div>
                    <p className="cardTitle">{tasks.title}</p>
                    <button className="deleteBtn" id={`${tasks.id}`} onClick={() => handleDelete(tasks.id, tasks.title)}>Delete</button>
                    <button className="updateBtn" id={`${tasks.id}`} onClick={() => handleUpdate(tasks)}>Update</button>
                </div>
            ))}
            {isOpenUpdate && createPortal(<UpdateTask onClose={() => {setOpenUpdate(false); setUpdateTask(null);}} task={updateTask} onUpdate={handleUpdateTask}/>,
                    document.body
            )}
    </div>
  )
}

export default ToDoList