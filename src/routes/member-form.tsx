import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import axios from "axios";
import { toast, Toaster } from "solid-toast";

export default function Home() {
  const [name, setName] = createSignal("");
  const [role, setRole] = createSignal("");
  const [nameError, setNameError] = createSignal("");
  const [roleError, setRoleError] = createSignal("");

  const validateForm = () => {
    let isValid = true;
    setNameError("");
    setRoleError("");

    if (name().trim() === "") {
      setNameError("Name is required.");
      isValid = false;
    }

    if (role().trim() === "") {
      setRoleError("Role is required.");
      isValid = false;
    }

    return isValid;
  };

  const addMember = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8000/members", { name: name(), role: role() })
      .then(() => {
        setName("");
        setRole("");
        toast.success("Member added successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add member.");
      });
  };

  return (
    <main>
      <Title>Member Form</Title>
      <h1>Member Form</h1>

      <div>
        <h3>Add Wedding Party Member</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
          />
          {nameError() && <p class="error-message">{nameError()}</p>}
        </div>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Role"
            value={role()}
            onInput={(e) => setRole(e.currentTarget.value)}
          />
          {roleError() && <p class="error-message">{roleError()}</p>}
        </div>
        <button onClick={addMember}>Add Member</button>
      </div>

      <Toaster />
    </main>
  );
}
