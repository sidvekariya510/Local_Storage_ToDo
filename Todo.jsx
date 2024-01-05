import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
    const [todo, setTodo] = useState([])
    const [title, setTitle] = useState("")
    const [editIndex, setEditIndex] = useState(null)


    const handleAddTask = () => {
        if (editIndex === null) {
            if (title === "") {
                alert("Invalid Input !!!")
            } else {
                let updatedTodoArr = [...todo];
                let newTodoObject = { item: title };
                updatedTodoArr.push(newTodoObject);

                setTodo(updatedTodoArr);

                localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
                setTitle("");
            }
        } else {
            updateFunction();
            console.log(todo);
        }
    }

    useEffect(() => {
        // let savedTodo = JSON.parse(localStorage.getItem('todolist'));

        // if (savedTodo) {
        //     setTodo(savedTodo);
        // }
        setTodo(JSON.parse(localStorage.getItem('todolist')));
    }, [])

    const updateFunction = () => {
        const updatedArr = [...todo];

        const updatedItem = updatedArr.map((data, index) => {
            if (index === editIndex) {
                return { item: title };
            } else {
                return data;
            }
        })

        setTodo(updatedItem);
        localStorage.setItem("todolist", JSON.stringify(updatedItem));
        setEditIndex(null);
        setTitle("");
        document.getElementById("main-btn").innerHTML = "Add Item"
    }

    const handleUpdateTask = (data, index) => {
        // console.log(data, index);
        setTitle(data.item);
        setEditIndex(index);
        document.getElementById("main-btn").innerHTML = "Update Item";
    }
    const handleDeleteTask = (data, index) => {
        const deleteTodo = [...todo];

        const filteredTodo = deleteTodo.filter((data,i)=>{
            return index !== i;
        })
        console.log(filteredTodo);
        setTodo(filteredTodo);
        localStorage.setItem("todolist", JSON.stringify(filteredTodo));
    }


    return (
        <>
            <h1 className="text-center h1 font-monospace pt-4">Todo App</h1>
            <br />
            <br />
            <div className="text-center mb-3">
                <input className='input text-dark border-2 p-2' type="text" placeholder='Enter task'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <br />
                <br />
                <button className='btn btn-success' id='main-btn'
                    onClick={handleAddTask}
                >Add task</button>
            </div>
            <div className="text-center d-flex justify-content-center">
                <table className='table table-bordered w-50'>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Update Button</th>
                        <th>Delete Button</th>
                    </tr>

                    {todo.map((data, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.item}</td>
                                    <td><button className='btn btn-secondary px-2 py-1 my-2 border-2'
                                        onClick={() => { handleUpdateTask(data, index) }}
                                    >Update</button></td>
                                    <td><button className='btn btn-secondary px-2 py-1 my-2 border-2'
                                        onClick={() => { handleDeleteTask(data, index) }}
                                    >Delete</button></td>
                                </tr>

                            </>
                        )
                    })}
                </table>
            </div>


        </>
    )
}

export default Todo