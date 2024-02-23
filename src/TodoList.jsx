import React from 'react'

import { useState } from "react";



const TodoList = () => {

    const [task, setTask] = useState({ date: "", description: "" });
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {

        setTask({ ...task, [event.target.name]: event.target.value });

    }

    const addTodo = () => {
        setTodos([...todos, task]);
        setTask({ date: "", description: "" });
    };

    const deleteTask = (index) => {

        const newTodos = todos.filter((todo, i) => i !== index);
        setTodos([...newTodos]);

    }

    return (

        <>
            <h1>Simple Todolist</h1>
            <fieldset>
                <legend>Add todo:</legend>
                <label htmlFor="date">Date: <input name="date" placeholder="date" id="date" value={task.date} onChange={handleChange}/></label>
                <label htmlFor="description">Description: <input name="description" placeholder="description" id="description" value={task.description} onChange={handleChange}/></label>
                <button onClick={addTodo}>Add</button>
            </fieldset>

            {todos.length === 0 ? <p></p> : (
            
            <table>
                <tbody>

                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>

                    {todos.map((todo, index) => (

                        <tr key={index}>

                            <td>{todo.date}</td>
                            <td>{todo.description}</td>
                            <td><button onClick={() => deleteTask(index)}>Delete</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
            )}





        </>


    );

}

export default TodoList;