import React, { useState } from "react"
import { useSelector } from "react-redux"


const  defaultToDo = {
    description:"",
    completed: false
}

export default ({ id, onSubmit, onCancel, existingTodo = defaultToDo }) => {

    const [todoForm, setTodoForm] = useState(existingTodo)
    const [warning, setWarning] = useState([])
    const existingToDos = useSelector((state) => state.todo.list)

    const submitForm = (e) => {
        e.preventDefault()
        const warnings = validator(todoForm.description)
        if(warnings.length > 0) {
            // console.log("warnings")
            setWarning(warnings)
        }
        else {
            onSubmit(todoForm)
        }
    }

    const validator = (text) => {
        console.log(existingToDos, id)
        const warnings = []
        if(text.trim().length === 0) {
            warnings.push('to-do cannot be empty!')
        }
        if(!(existingToDos.every(todo => 
            todo.description.trim().toLowerCase() !== text.trim().toLowerCase() || id === todo.id))) {
            warnings.push('to-do already exists')
        }
        //other validation
        return warnings

    }
    
    return (
        <div className="row">
            <form id={`todoform-${id}`} onSubmit={submitForm} className="col s12">
            <div className="row">
                <div className="input-field col s12">
                <label htmlFor="textarea1">Add Todo</label>
                <textarea 
                    value={todoForm.description} 
                    onChange={e => setTodoForm({ ...todoForm, description: e.target.value})} 
                    id="textarea1"
                    maxLength="25"
                    className={`materialize-textarea ${todoForm.completed ? 'strikethrough' : ''}`} />
                </div>
                <div>{warning.map((warn, index) => <span key={index}>{warn}</span>)}</div>
            </div>
            </form>
            <div>
                <button className="btn blue darken-4 waves-effect waves-light" onClick={() => setTodoForm({...todoForm, completed:!todoForm.completed})}>
                    {todoForm.completed ? 'Mark Complete' : 'Mark Incomplete'}
                </button>
                <button form={`todoform-${id}`} className="btn waves-effect waves-light" type="submit">
                    <i className="material-icons right">send</i>
                    Submit
                </button>
                <button onClick={()=>onCancel()} className="btn yellow lighten-3 waves-effect waves-light" >
                    <i className="material-icons right">send</i>
                    Cancel
                </button>
            </div>
        </div>
        // <div>
        //     <form onSubmit={submitForm}>
        //         <textarea onChange={e => setDesription(e.target.value)} 
        //         id="w3review" name="w3review" rows="4" cols="50" />
        //         <button type="submit">Submit</button>
        //     </form>
        // </div>
    )
}