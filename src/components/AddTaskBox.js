import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

function AddTask({ handleAddTask, setDisAddBox }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  function resetValue() {
    setStatus(false);
    setTitle("");
    setDisAddBox(false);
  }
  async function addTask() {
    setLoading(true);
    if (title && !loading) {
      try {
        await handleAddTask(title, status);
        setIsTitleEmpty(false);
        resetValue();
      } catch {
        alert("Task is not updated, please try agin");
      }
    } else {
      if (!loading) {
        setIsTitleEmpty(true);
      }
    }
    setLoading(false);
  }
  return (
    <div className="px-3 sm:p-0 w-full flex justify-center">
      <div className="p-4 rounded-xl bg-gray-100 w-full sm:w-80 shadow-md">
        <div>
          <div className="mb-3 flex justify-between items-center">
            <h5 className="text-xl font-bold text-blue-500">Add TODO</h5>
            <MdOutlineCancel
              onClick={() => {
                setDisAddBox(false);
              }}
              className="text-xl font-bold text-red-600"
            />
          </div>
          <div className="mb-3">
            <label className="text-blue-500 font-medium">Title</label>
            {isTitleEmpty && (
              <h6 className="text-red-600 text-sm">Please fill the title</h6>
            )}
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter The Title"
              className="bg-white mt-1 py-2 px-4 border rounded-md flex items-cente w-full"
            />
          </div>
          <div className="mb-3 ">
            <label className="text-blue-500 font-medium">Status</label>
            <select
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="bg-white mt-1 py-2 px-4 border rounded-md flex items-cente w-full"
            >
              <option value={false}>Incompleted</option>
              <option value={true}>Completed</option>
            </select>
          </div>
          <div className="flex justify-around">
            <button
              onClick={() => {
                addTask();
              }}
              className="border-inherit border py-1 px-3 rounded-md text-white bg-blue-500 w-24"
            >
              Add Task
            </button>
            <button
              onClick={() => {
                resetValue();
              }}
              className="border-inherit border py-1 px-3 rounded-md text-white bg-red-600 w-24"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function AddTaskBox({ handleAddTask, setDisAddBox, disAddBox }) {
  return (
    disAddBox && (
      <div className="h-full w-full fixed justify-center items-center z-10 bg-gray-200 bg-opacity-60 flex">
        <AddTask handleAddTask={handleAddTask} setDisAddBox={setDisAddBox} />
      </div>
    )
  );
}
export default AddTaskBox;
