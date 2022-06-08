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
        return { id:response, ...todo }
    }
)

export const deleteTodoAsync = createAsyncThunk(
    'deletetodoasync',
    async (id) => {
        await deleteDBTodos(id)
        return id
    }
)

export const editTodoAsync = createAsyncThunk(
    'edittodoasync',
    async (todo) => {
        const todoId = todo.id
        await patchDBTools(todoId, todo)
        return {id:todoId, ...todo}  
    }
)

export const deleteAllTodos = createAsyncThunk(
    'deleteAllTodo',
    async () => {
        await deleteAllTodosDB()
        return
    }
)

export const asyncUpdateOrder = createAsyncThunk(
    'asyncupdateOrder',
    async (updatedOrder) => {
        await deleteAllTodosDB()
        await updateDBOrder(updatedOrder)
        const response = await fetchDBTodos()
        return response.reverse()
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
                state.fetched = true;
                state.list = action.payload;
            })
            .addCase(addTodosAsync.fulfilled, (state, action) => {
                state.list.unshift(action.payload)
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.list = state.list.filter(todo => todo.id !== action.payload)
                
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
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
                state.list = meta.arg
            })
            .addCase(asyncUpdateOrder.fulfilled, (state, action) => {
                state.list = action.payload
            })
    }
})

export const { addTodo, updateOrder } = TodoSlice.actions
export default TodoSlice.reducer