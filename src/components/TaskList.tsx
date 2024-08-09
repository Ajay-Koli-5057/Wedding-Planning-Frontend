import { Component, createSignal, createEffect } from "solid-js";
import axios from "axios";
import { toast, Toaster } from "solid-toast";
import "./task-list.css";
import { API_URL } from "~/utils/constant";

const TaskList: Component = () => {
  const [tasks, setTasks] = createSignal([]);
  const [sortKey, setSortKey] = createSignal("dueDate");
  const [filterStatus, setFilterStatus] = createSignal("");

  createEffect(() => {
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => setTasks(response?.data))
      .catch((error) => console.error(error));
  });

  const removeTask = (id: number) => {
    axios
      .delete(`${API_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks().filter((task) => task?.id !== id));
        toast.success("Task removed successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to remove task.");
      });
  };

  const editTask = (id: number, updatedTask: any) => {
    axios
      .patch(`http://192.168.1.35:8000/tasks/${id}`, updatedTask)
      .then(() => {
        setTasks(
          tasks().map((task) =>
            task?.id === id ? { ...task, ...updatedTask } : task
          )
        );
        toast.success("Task status updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update task status.");
      });
  };

  const filteredTasks = () => {
    return tasks()
      .filter((task) => filterStatus() === "" || task?.status === filterStatus())
      .sort((a: any, b: any) => (a[sortKey()] > b[sortKey()] ? 1 : -1));
  };

  return (
    <div class="task-list-container">
      <h1>Task List</h1>
      <div class="filter-container">
        <div class="filter-section">
          <label class="filter-label">Filter by Status:</label>
          <select
            class="filter-select"
            onChange={(e) => setFilterStatus(e.currentTarget.value)}
          >
            <option value="">All</option>
            <option value="in progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div class="sort-section">
          <label class="sort-label">Sort by:</label>
          <select
            class="sort-select"
            onChange={(e) => setSortKey(e.currentTarget.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
            <option value="assignedMember">Assigned Member</option>
          </select>
        </div>
      </div>
      <table class="task-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Assigned Member</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks()?.length === 0 ? (
            <tr>
              <td colSpan="6" class="no-data">
                No data available
              </td>
            </tr>
          ) : (
            filteredTasks()?.map((task) => (
              <tr class="task-row">
                <td>{task?.description}</td>
                <td>{task?.dueDate}</td>
                <td>{task?.category}</td>
                <td>{task?.assignedMember?.name}</td>
                <td>{task?.status}</td>
                <td class="task-actions">
                  <button
                    class="remove-button"
                    onClick={() => removeTask(task?.id)}
                  >
                    Remove
                  </button>
                  <button
                    class="complete-button"
                    onClick={() =>
                      editTask(task?.id, { ...task, status: "complete" })
                    }
                  >
                    Mark Complete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Toaster />
    </div>
  );
};

export default TaskList;
