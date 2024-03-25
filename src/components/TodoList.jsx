import { useRef, useState } from "react";
import TodoTable from "./TodoTable";
import { DatePicker } from "@mui/x-date-pickers";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


const TodoList = () => {

    const [todo, setTodo] = useState({ description: "", priority: "", date: null });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: 'description', filter: true, floatingFilter: true },
        {
            field: 'priority',
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
            filter: true, floatingFilter: true
        },
        {
            field: 'date', filter: true, floatingFilter: true,
            valueFormatter: params => new Date(params.value).toLocaleDateString("fi-FI")
        }
    ]);

    const handleChange = (event) => {

        setTodo({ ...todo, [event.target.name]: event.target.value });

    }

    const handleDate = (value) => {

        setTodo({ ...todo, date: value });

    }

    const addTodo = () => {

        if (todo.date === null || todo.priority === "" || todo.description === "") {

            alert("Fill all fields!");

            return;

        }

        setTodos([...todos, todo]);
        setTodo({ description: "", priority: "", date: null });
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

            <fieldset>
                <legend>Add todo:</legend>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <TextField label="Description" name="description" value={todo.description} onChange={handleChange} />
                    <TextField label="Priority" name="priority" value={todo.priority} onChange={handleChange} />
                    <DatePicker label="Pick a date" value={todo.date} onChange={handleDate} />
                    <Button endIcon={<SendIcon/>} color="success" variant="outlined" onClick={addTodo}>Add</Button>
                    <Button startIcon={<DeleteIcon/>} color="error" variant="outlined" onClick={deleteTodo}>Delete</Button>
                </Stack>
            </fieldset>

            {todos.length === 0 ? <p></p> : (
                <Stack justifyContent="center" alignItems="center">
                    <TodoTable gridRef={gridRef} data={todos} columns={columnDefs} />
                </Stack>

            )}

        </>

    );

}

export default TodoList;