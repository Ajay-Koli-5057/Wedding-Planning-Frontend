import { Title } from "@solidjs/meta";
import Dashboard from "~/components/Dashboard";

export default function Home() {
  return (
    <main>
      <Title>Wedding Planning Task Manager</Title>
      <Dashboard />
    </main>
  );
}
