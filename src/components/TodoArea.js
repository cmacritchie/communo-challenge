import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodosAsync } from '../storeSlice/todo/todoSlice'
import TodoForm from './TodoForm'
import { useForceUpdate } from '../customHooks'

export default () => {
    const [resetInt, setReset] = useState(0)
    const dispatch = useDispatch()

    const handleSubmit = async (todo) => {
        console.log("todo handlesubmit", todo)
        dispatch(addTodosAsync(todo))
        setReset(resetInt+1)
    }
    return (
        <div>
            <h4>Start entering your to-do list</h4>
            <TodoForm
                id="create"
                key={resetInt}
                onSubmit={todo => handleSubmit(todo)}
                onCancel={()=>setReset(resetInt+1)} />
        </div>
    )
}