import React, { useState, useEffect } from "react";
import Task from "./Task";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../apiServices/todoService";
import AddTaskBox from "./AddTaskBox";
import { AiOutlinePlus } from "react-icons/ai";

const TaskListHeader = ({ onAddTask }) => (
  <div className="w-full md:w-2/3 p-3 flex justify-between items-center sticky top-0 bg-gray-100">
    <button onClick={onAddTask} className="bg-blue-500 p-2">
      <AiOutlinePlus className="text-4xl font-bold text-white rounded" />
    </button>
    <h1 className="text-3xl text-blue-500 font-bold">TODO TASK</h1>
  </div>
);

const TaskListFooter = ({ onReadMore, taskNumber, totalTasks }) => (
  <div
    style={{ display: taskNumber >= totalTasks ? "none" : "flex" }}
    className="items-center justify-center pt-3"
  >
    <button
      onClick={onReadMore}
      className="bg-blue-500 p-2 text-white px-6 rounded"
    >
      Read More
    </button>
  </div>
);

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(true);
  const [disAddBox, setDisAddBox] = useState(false);
  const [taskNumber, setTaskNumber] = useState(10);

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
      setError(true);
    } catch (error) {
      setError(false);
    }
  };

  const handleAddTask = async (title, completed) => {
    await addTask({ title, completed });
    setTasks((prevTasks) => [
      {
        id: prevTasks.length,
        title,
        completed,
      },
      ...prevTasks,
    ]);
  };

  const handleToggleComplete = async (taskId) => {
    await updateTask(taskId);
    const taskToToggle = tasks.find((task) => task.id === taskId);

    if (taskToToggle) {
      taskToToggle.completed = !taskToToggle.completed;
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...taskToToggle } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((elem) => taskId !== elem.id));
  };

  return (
    <div className="relative">
      <AddTaskBox
        handleAddTask={handleAddTask}
        disAddBox={disAddBox}
        setDisAddBox={setDisAddBox}
      />
      <div className="flex justify-center relative z-0">
        <div className="md:container">
          <div className="flex flex-wrap justify-center w-full">
            <TaskListHeader onAddTask={() => setDisAddBox(true)} />
            <div className="w-full md:w-2/3 px-4 py-8 sm:p-10 bg-gray-50">
              <div className="flex items-center bg-gray-200 border rounded py-3">
                <h6 className="px-3 font-medium">
                  {error
                    ? "Task List"
                    : "Please check your internet connection."}
                </h6>
              </div>
              <div className="mt-2">
                {tasks.slice(0, taskNumber).map((task) => (
                  <div className="w-full" key={task.id}>
                    <Task
                      task={task}
                      onDelete={handleDeleteTask}
                      onToggleComplete={handleToggleComplete}
                    />
                  </div>
                ))}
              </div>
              <TaskListFooter
                onReadMore={() => setTaskNumber(taskNumber + 10)}
                taskNumber={taskNumber}
                totalTasks={tasks.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
