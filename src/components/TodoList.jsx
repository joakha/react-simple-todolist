import {useState} from "react";
import TodoTable from './TodoTable';

const TodoList = () => {

    const [task, setTask] = useState({ date: "", description: "" });
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {

        setTask({ ...task, [event.target.name]: event.target.value });

    }

    const addTodo = () => {

        if (task.date === "" || task.description === "") {

            alert("Fill both fields!");

            return;

        }

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
                <label htmlFor="date">Date: <input type="date" name="date" placeholder="date" id="date" value={task.date} onChange={handleChange} /></label>
                <label htmlFor="description">Description: <input type="text" name="description" placeholder="description" id="description" value={task.description} onChange={handleChange} /></label>
                <button onClick={addTodo}>Add</button>
            </fieldset>

            <TodoTable todos = {todos} deleteTask = {deleteTask}/>

        </>


    );

}

export default TodoList;