import { useTimer } from "./Store/timers-context.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  // Need to use exclamation to let the context know there is a object that is not null in the context
  const { isRunning, startTimer, stopTimer } = useTimer()!;
  // const timeCTX = useTimer();
  return (
    <header>
      <h1>ReactTimer</h1>
      <Button onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
