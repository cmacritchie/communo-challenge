import React, {useEffect, useState} from 'react'
import TodoCard from './TodoCard'
import TodoForm from './TodoForm'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { 
    fetchTodosAsync, 
    deleteTodoAsync,
    editTodoAsync,
    deleteAllTodos,
    updateOrder,
    asyncUpdateOrder
} from '../storeSlice/todo/todoSlice'
import '../stylesheets/todolist.css'
import { Draggable } from 'react-beautiful-dnd'


export default () => {
    const dispatch = useDispatch()
    const toDos = useSelector((state) => state.todo)
    const [editIds, setEditIds] = useState([])
    
    useEffect(() => {
        dispatch(fetchTodosAsync())
        return () => {
        }
    },[])

    const removeEditId = (id) => {
        const filteredIds = editIds.filter(editId => editId !== id)
        setEditIds(filteredIds)
    } 

    const changeStatus = (todo) => {
        console.log("original todo", todo)
        const updatedToDo = { ...todo, completed: !todo.completed}
        dispatch(editTodoAsync(updatedToDo))
    } 

    const handleEditSubmit = (id, updatedTodo) => {
        console.log("updated", id, updatedTodo)
        dispatch(editTodoAsync({...updatedTodo, id }))
        removeEditId(id)
    }

    const displayView = (item) => {
        return (<div>
            <div className={`card-description  ${item.completed ? 'strikethrough' : ''}`}>
                {item.description}
            </div>
            <div className='card-buttons'>
                <button onClick={() => changeStatus(item)} className='btn'>MarkComplete</button>
                <button onClick={() => setEditIds([...editIds, item.id])} className='btn'>Edit</button>
                <button onClick={() => dispatch(deleteTodoAsync(item.id))} className='btn'>Delete</button>
            </div>
        </div>)
    }

    const renderList = (list) => {
        console.log("render list", list)
        if(list.length === 0) {
            return <p>No items yet</p>
        }
        return list.map((item, index) => {
                return (
                        <Draggable key={item.id} draggableId={`drag-${item.id}`} index={index}>
                            {(provided, snapshot) => (

                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <TodoCard 
                                key={item.id}
                                id={item.id}
                                
                      >
    
                                {editIds.includes(item.id) ?
                                    <TodoForm
                                        id={item.id}
                                        key={item.id}
                                        onCancel={()=>removeEditId(item.id)} 
                                        existingTodo={item}
                                        onSubmit={(updatedTodo) => handleEditSubmit(item.id, updatedTodo)}
                                        />
                                    :
                                    displayView(item)
                                }
                                
                            </TodoCard>
                            </div>
                            )}

                        </Draggable>
                        )
                    
                    })
        }
            
    
    
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
      
        return result;
    }
    

    const onDragEnd = result => {
        const { destination, source, draggableId } = result
        console.log(result)

        if(!destination) {
            return
        }

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return
        }

        const items = reorder(toDos.list, result.source.index, result.destination.index)

        dispatch(asyncUpdateOrder(items))
    }

    return(
        <div>
            <button className='btn red darken-4 waves-effect waves-light' onClick={()=>dispatch(deleteAllTodos())}>
                Clear All Todos!
            </button>

            <div className='card-list'>
                {toDos.fetched ?
                <DragDropContext 
                    // onDragStart={}
                    // onDragUpdate
                    onDragEnd={onDragEnd} 
                    >
                    <Droppable droppableId="TaskDropArea" >
                    {(provided, snapshot) =>(
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                        {renderList(toDos.list, provided)}
                        {provided.placeholder}  
                        </div>
                    )}
                    </Droppable> 
                </DragDropContext>
                : 
                <p>Loading</p>
                }
            </div>
        </div>
    )
}