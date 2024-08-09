import { createEffect, createSignal } from "solid-js";
import axios from "axios";
import { toast, Toaster } from "solid-toast";
import "./member-list.css";
import { API_URL } from "~/utils/constant";

export default function MemberList() {
  const [members, setMembers] = createSignal([]);

  createEffect(() => {
    axios
      .get(`${API_URL}/members`)
      .then((response) => setMembers(response?.data));
  });

  const removeMember = (id: number) => {
    axios
      .delete(`${API_URL}/members/${id}`)
      .then(() => {
        setMembers(members().filter((member) => member?.id !== id));
        toast.success("Member removed successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to remove member.");
      });
  };

  return (
    <div class="member-list-container">
      <h1>Member's List</h1>
      {members().length === 0 ? (
        <p class="no-data-message">No data available.</p>
      ) : (
        <table class="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members()?.map((member) => (
              <tr class="member-row">
                <td>{member?.name}</td>
                <td>{member?.role}</td>
                <td class="member-actions">
                  <button
                    class="remove-button"
                    onClick={() => removeMember(member?.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
}
