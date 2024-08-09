import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import axios from "axios";
import { toast, Toaster } from "solid-toast";

export default function Home() {
  const [description, setDescription] = createSignal("");
  const [dueDate, setDueDate] = createSignal("");
  const [category, setCategory] = createSignal("");
  const [assignedMember, setAssignedMember] = createSignal("");
  const [descriptionError, setDescriptionError] = createSignal("");
  const [dueDateError, setDueDateError] = createSignal("");
  const [categoryError, setCategoryError] = createSignal("");
  const [assignedMemberError, setAssignedMemberError] = createSignal("");

  const validateForm = () => {
    let isValid = true;
    setDescriptionError("");
    setDueDateError("");
    setCategoryError("");
    setAssignedMemberError("");

    if (description().trim() === "") {
      setDescriptionError("Description is required.");
      isValid = false;
    }

    if (dueDate().trim() === "") {
      setDueDateError("Due Date is required.");
      isValid = false;
    }

    if (category().trim() === "") {
      setCategoryError("Category is required.");
      isValid = false;
    }

    if (assignedMember().trim() === "") {
      setAssignedMemberError("Assigned Member is required.");
      isValid = false;
    }

    return isValid;
  };

  const addTask = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8000/tasks", {
        description: description(),
        dueDate: dueDate(),
        category: category(),
        assignedMember: assignedMember(),
        status: "Pending",
      })
      .then(() => {
        setDescription("");
        setDueDate("");
        setCategory("");
        setAssignedMember("");
        toast.success("Task added successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add task.");
      });
  };

  return (
    <main>
      <Title>Task Form</Title>
      <h1>Task Form</h1>

      <div>
        <h3>Add Wedding Task</h3>
        <div class="task-form">
          <input
            type="text"
            placeholder="Description"
            value={description()}
            onInput={(e) => setDescription(e.currentTarget.value)}
          />
          {descriptionError() && <p class="error-message">{descriptionError()}</p>}
          
          <input
            type="date"
            placeholder="Due Date"
            value={dueDate()}
            onInput={(e) => setDueDate(e.currentTarget.value)}
          />
          {dueDateError() && <p class="error-message">{dueDateError()}</p>}
          
          <input
            type="text"
            placeholder="Category"
            value={category()}
            onInput={(e) => setCategory(e.currentTarget.value)}
          />
          {categoryError() && <p class="error-message">{categoryError()}</p>}
          
          <input
            type="text"
            placeholder="Assigned Member"
            value={assignedMember()}
            onInput={(e) => setAssignedMember(e.currentTarget.value)}
          />
          {assignedMemberError() && <p class="error-message">{assignedMemberError()}</p>}
          
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      <Toaster />
    </main>
  );
}
