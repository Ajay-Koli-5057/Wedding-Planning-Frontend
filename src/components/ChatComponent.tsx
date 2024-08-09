import { createSignal } from "solid-js";
import axios from "axios";
import "./chat-component.css";

export default function ChatComponent() {
  const [query, setQuery] = createSignal("");
  const [response, setResponse] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);

  const handleQueryChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/chatgpt", { query: query() });
      setResponse(res.data.response);
    } catch (err) {
      setError("Failed to fetch response from ChatGPT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="chat-container">
      <div
        class={`fixed bottom-8 right-8 p-2 bg-blue-500 text-white rounded-full cursor-pointer shadow-lg ${
          isOpen() ? "hidden" : "block"
        } jump`}
        onClick={() => setIsOpen(true)}
      >
        <i class="fas fa-comments text-3xl">Chat</i>
      </div>

      {isOpen() && (
        <div class="bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-semibold">Chat with AI</h2>
            <button
              onClick={() => setIsOpen(false)}
              class="text-white hover:text-gray-900"
            >
              <i class="fas fa-times text-xl">X</i>
            </button>
          </div>
          <div class="p-4">
            <form onSubmit={handleSubmit} class="flex flex-col">
              <input
                type="text"
                value={query()}
                onInput={handleQueryChange}
                placeholder="Ask something..."
                class="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              />
              <button
                type="submit"
                disabled={loading()}
                class="bg-blue-500 text-white rounded-lg p-2 w-full"
              >
                {loading() ? "Loading..." : "Send"}
              </button>
            </form>
            {error() && <p class="text-red-500 mt-2">{error()}</p>}
            {response() && (
              <p class="mt-2">
                <strong>Response:</strong> {response()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
