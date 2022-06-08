import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    fetchDBTodos, 
    addDBTodos, 
    deleteDBTodos, 
    patchDBTools,
    deleteAllTodosDB,
    updateDBOrder  } from './todoAPI'

const initialState = {
    list:[],
    fetched:false
}

export const fetchTodosAsync = createAsyncThunk(
    'fetchtodoasync',
    async () => {
        const response = await fetchDBTodos()
        return response.reverse()
    }
)

export const addTodosAsync = createAsyncThunk(
    'addtodoasync',
    async (todo) => {
        const response = await addDBTodos(todo)
        console.log("response, add ",response )
        return { id:response, ...todo }
    }
)

export const deleteTodoAsync = createAsyncThunk(
    'deletetodoasync',
    async (id) => {
        const response = await deleteDBTodos(id)
        console.log("response delete", response)
        return id
    }
)

export const editTodoAsync = createAsyncThunk(
    'edittodoasync',
    async (todo) => {
        console.log("response edit",  todo)
        const todoId = todo.id
        const response = await patchDBTools(todoId, todo)
        console.log("response0 edit", {id:todoId, ...todo})
        return {id:todoId, ...todo}  
    }
)

export const deleteAllTodos = createAsyncThunk(
    'deleteAllTodo',
    async () => {
        console.log("testerton")
        const response = await deleteAllTodosDB()
        console.log("delete all todos DB", response)
        return
    }
)

export const asyncUpdateOrder = createAsyncThunk(
    'asyncupdateOrder',
    async (updatedOrder) => {
        // const test = getState().todo
        // console.log("test", updatedOrder)
        await deleteAllTodosDB()
        const response = await updateDBOrder(updatedOrder)
        console.log("response update", response)
        return updatedOrder
    }
)

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo:  (state, action) => {
            state.list.push(action.payload)
        },
        updateOrder: (state, action) => {
            updateDBOrder(action.payload)
            state.list = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                console.log(action)
                state.fetched = true;
                state.list = action.payload;
            })
            .addCase(addTodosAsync.fulfilled, (state, action) => {
                console.log("STate", state)
                state.list.unshift(action.payload)
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                console.log(state.list, action.payload)
                state.list = state.list.filter(todo => todo.id !== action.payload)
                
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload.id)
                state.list = state.list.map(todo => {
                    if(todo.id === action.payload.id) {
                        return action.payload
                    }
                    return todo
                })
            })
            .addCase(deleteAllTodos.fulfilled, (state, action) => {
                state.list = []
            })
            .addCase(asyncUpdateOrder.pending, (state, {meta}) => {
                console.log("action.payload pending", meta.arg)
                state.list = meta.arg
            })
            .addCase(asyncUpdateOrder.fulfilled, (state, action) => {
                console.log("action.payload fulfilled", action.payload)
                state.list = action.payload
            })
    }
})

export const { addTodo, updateOrder } = TodoSlice.actions
export default TodoSlice.reducer