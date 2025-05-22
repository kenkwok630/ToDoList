import { useState } from "react"

const UpdateTask = ({ onClose, task, onUpdate}) => {
    const [title, setTitle] = useState(task.title)
    const [isFinish, setIsFinish] = useState(task.isFinish)
    const [errorMessage, setErrorMessage] = useState("");
    
    const showErrorMessage = () =>{
        setErrorMessage("Please enter a task title")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(title.trim()){
            onUpdate({id: task.id, title, isFinish})
            setErrorMessage("")
        }else{
            showErrorMessage ()
        }
    }

  return (
    <div className="update-content">
        <form onSubmit={handleSubmit}>
        <h2 style={{textAlign: "center"}}>Update Task</h2>
        <div className="update-text">
            <p style={{fontSize: "25px", margin: "10px"}}>Task:</p>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{fontSize: "25px", margin: "5px"}}/>
            <p style={{color: "red", margin: "10px", textAlign: "center"}}>{errorMessage}</p>
        </div>
        <div className="update-checkbox">
            <p style={{fontSize: "25px", margin: "10px"}}>Are you finish a task?</p>
            <input type="checkbox" checked={isFinish} onChange={(e) => setIsFinish(e.target.checked)} style={{width:"50px", height:"50px", margin: "10px"}}/>
        </div>
        <button type="submit" style={{borderRadius:"10px", margin: "10px", height:"50px", width:"100px", fontSize: "25px", backgroundColor: "#003246", fontWeight:"bold", color: "white", border:"4px solid"}}>Update</button>
        <button onClick={onClose} style={{borderRadius:"10px", margin: "10px", height:"50px", width:"100px", fontSize: "25px", backgroundColor: "rgba(255, 0, 0, 0.7)", fontWeight:"bold", color:"white", border:"4px solid"}}>Cancel</button>
        </form>
    </div>
  )
}

export default UpdateTask