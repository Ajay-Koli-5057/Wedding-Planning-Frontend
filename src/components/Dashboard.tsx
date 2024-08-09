import ChatComponent from "./ChatComponent";
import MemberList from "./MemberList";
import TaskList from "./TaskList";

export default function Dashboard() {
  return (
    <div>
      <div>
        <MemberList />
      </div>
      <div>
        <TaskList />
      </div>
      <ChatComponent />
    </div>
  );
}
