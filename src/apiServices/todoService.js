import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

export const getTasks = async () => {
  const response = await axios.get(apiUrl);
  const tasks = response.data;
  return tasks;
};

export const addTask = async (task) => {
  const response = await axios.post(apiUrl, task, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newTask = response.data;
  return newTask;
};

export const updateTask = async (taskId) => {
  const response = await axios.patch(
    `${apiUrl}/${taskId}`,
    { completed: true },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const updatedTask = response.data;
  return updatedTask;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${apiUrl}/${taskId}`);
};
