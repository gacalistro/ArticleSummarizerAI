import { Demo } from "./components/Demo";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="w-screen min-h-screen px-[10%]">
      {/* GRADIENT BACKGROUND CSS */}
      <div className="gradient" />

      <Header />

      <Demo />
    </div>
  );
}
