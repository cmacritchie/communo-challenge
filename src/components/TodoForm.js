import React, { useState } from "react"
import { useSelector } from "react-redux"

//defaultProps are deprecated
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
            setWarning(warnings)
        }
        else {
            onSubmit(todoForm)
        }
    }

    const validator = (text) => {
        const warnings = []
        if(text.trim().length === 0) {
            warnings.push('To-Do cannot be empty!')
        }
        if(!(existingToDos.every(todo => 
            todo.description.trim().toLowerCase() !== text.trim().toLowerCase() || id === todo.id))) {
            warnings.push('To-Do already exists')
        }
        //other validation
        return warnings

    }
    
    return (
        <div className="row">
            <form id={`todoform-${id}`} onSubmit={submitForm} className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <label htmlFor="textarea1">Add To-Do</label>
                    <textarea 
                        value={todoForm.description} 
                        onChange={e => setTodoForm({ ...todoForm, description: e.target.value})} 
                        id="textarea1"
                        maxLength="25"
                        className={`materialize-textarea ${todoForm.completed ? 'strikethrough' : ''}`} />
                    </div>
                <div className="warning">{warning.map((warn, index) => <span key={index}>{warn}</span>)}</div>
            </div>
            </form>
            <div>
                <button className="btn blue darken-4 waves-effect waves-light" onClick={() => setTodoForm({...todoForm, completed:!todoForm.completed})}>
                    {todoForm.completed ? 
                        <i className="material-icons warning right">close</i> : 
                        <i className="material-icons success right">check</i>}
                    {todoForm.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button form={`todoform-${id}`} className="btn waves-effect waves-light" type="submit">
                    <i className="material-icons right">send</i>
                    Submit
                </button>
                <button onClick={()=>onCancel()} className="btn amber lighten-1 waves-effect waves-light" >
                    <i className="material-icons right">close</i>
                    Cancel
                </button>
            </div>
        </div>
    )
}