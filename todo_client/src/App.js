import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);


  //getallData
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://todo-backend-fhsl.onrender.com/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

//create

  const handleCreateTask = async () => {
 if (!description) {
    toast.error("Please provide a description");
    return;
  }
    try {
      const response = await axios.post(
        "https://todo-backend-fhsl.onrender.com/api/tasks",
        { title, description }
      );
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };


  //delete
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(
        `https://todo-backend-fhsl.onrender.com/api/tasks/${taskId}`
      );
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };

  //search
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://todo-backend-fhsl.onrender.com/api/tasks/todos-search/${searchText}`
      );
      setTasks(response.data);
      setSearchText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="title">Task Manager</h1>

      <div className="container">
        <div>
          <h2>Create Task</h2>
          <input
            type="text"
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            className="input-field"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="button" onClick={handleCreateTask}>
            Create
          </button>
          <input
            type="text"
            className="input-field"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <h2>All Tasks</h2>
      <div className="tasklist">
        {tasks.map((task) => (
          <div className="task" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button
              className="delete-button"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
