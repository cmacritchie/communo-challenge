import { db } from '../../db/db'

export const fetchDBTodos = () => {
    return db.todos.toArray()
}

export const addDBTodos = (todo) => {
    return db.todos.add(todo)
}

export const deleteDBTodos = (id) => {
    return db.todos.delete(id)
}

export const patchDBTools = (id, updatedTodo) => {
    console.log("Db entry", id, updatedTodo)
    delete updatedTodo.id
    return db.todos.update(id, updatedTodo)
}

export const deleteAllTodosDB = () => {
    return db.todos.clear()
}

export const updateDBOrder =(orderedList) => {
    const strippedList = orderedList.map(({completed, description}) => {
        return {completed, description}
    })

    return db.todos.bulkAdd(strippedList.reverse())

}