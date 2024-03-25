import { useRef, useState } from "react";
import TodoTable from "./TodoTable";

const TodoList = () => {

    const [todo, setTodo] = useState({ description: "", priority: "", date: "" });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: 'description', filter: true, floatingFilter: true },
        {
            field: 'priority',
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
            filter: true, floatingFilter: true
        },
        { field: 'date', filter: true, floatingFilter: true}
    ]);

    const handleChange = (event) => {

        setTodo({ ...todo, [event.target.name]: event.target.value });

    }

    const addTodo = () => {

        if (todo.date === "" || todo.priority === "" || todo.description === "") {

            alert("Fill all fields!");

            return;

        }

        setTodos([...todos, todo]);
        setTodo({ description: "", priority: "", date: "" });
    };

    const deleteTodo = () => {

        if (gridRef.current.getSelectedNodes().length > 0) {

            const newTodos = todos.filter((todo, i) => i != gridRef.current.getSelectedNodes()[0].id);
            setTodos([...newTodos]);
    
        }

        else {

            alert("Select a row first!");

        }

    }

    return (

        <>

            <h1>Simple Todolist</h1>
            <fieldset>
                <legend>Add todo:</legend>
                <label htmlFor="description">Description:<input type="text" name="description" id="description" placeholder="Description" value={todo.description} onChange={handleChange} /></label>
                <label htmlFor="priority">Priority:<input type="text" name="priority" id="priority" placeholder="Priority" value={todo.priority} onChange={handleChange} /></label>
                <label htmlFor="date">Date:<input type="date" name="date" id="date" value={todo.date} onChange={handleChange} /></label>
                <button onClick={addTodo}>Add</button>
                <button onClick={deleteTodo}>Delete</button>
            </fieldset>

            {todos.length === 0 ? <p></p> : (

                <TodoTable gridRef={gridRef} data={todos} columns={columnDefs}/>

            )}

        </>

    );

}

export default TodoList;