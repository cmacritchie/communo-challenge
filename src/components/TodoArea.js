import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodosAsync } from '../storeSlice/todo/todoSlice'
import TodoForm from './TodoForm'

export default () => {
    const [resetInt, setReset] = useState(0)
    const dispatch = useDispatch()

    const handleSubmit = async (todo) => {
        dispatch(addTodosAsync(todo))
        setReset(resetInt+1)
    }
    return (
        <div className='add-todo'>
            <h6>Start entering your To-Do list</h6>
            <TodoForm
                id="create"
                key={resetInt}
                onSubmit={todo => handleSubmit(todo)}
                onCancel={()=>setReset(resetInt+1)} />
        </div>
    )
}