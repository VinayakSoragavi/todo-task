import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const TaskItem = ({
  task,
  onToggleComplete,
  onDelete,
  loading,
  setLoading,
  updateStatus,
  setUpdateStatus,
}) => (
  <div className="py-2">
    <div className="flex items-center bg-gray-100 border rounded">
      <div className="py-3 px-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={async () => {
            setLoading(true);
            try {
              await onToggleComplete(task.id);
              setUpdateStatus(true);
            } catch {
              setUpdateStatus(false);
            }
            setLoading(false);
          }}
        />
      </div>
      <div className="flex items-center w-full justify-between">
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          <h6>{`${task.title}`}</h6>
        </span>
        <h6
          style={{ color: updateStatus ? "black" : "red" }}
          className={`px-3 sm:w-auto text-sm ${
            updateStatus ? "text-black w-auto" : "text-red-600 w-16"
          }`}
        >{`${loading ? "loading..." : updateStatus ? "" : "Not updated"}`}</h6>
      </div>
      <button
        onClick={async () => {
          setLoading(true);
          try {
            await onDelete(task.id);
            setUpdateStatus(true);
          } catch {
            setUpdateStatus(false);
          }
          setLoading(false);
        }}
        className="py-2 px-3"
      >
        <AiFillDelete className="text-red-600" />
      </button>
    </div>
  </div>
);

const Task = ({ task, onDelete, onToggleComplete }) => {
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(true);
  return (
    <TaskItem
      task={task}
      onDelete={onDelete}
      onToggleComplete={onToggleComplete}
      loading={loading}
      setLoading={setLoading}
      updateStatus={updateStatus}
      setUpdateStatus={setUpdateStatus}
    />
  );
};

export default Task;
