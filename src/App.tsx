import AddTimer from "./components/AddTimer.tsx";
import Header from "./components/Header.tsx";
import { TimerProvider } from "./components/Store/timers-context.tsx";
import Timers from "./components/Timers.tsx";

function App() {
  return (
    <TimerProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimerProvider>
  );
}

export default App;
