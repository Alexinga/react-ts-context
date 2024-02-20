import { useTimer } from "./Store/timers-context";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = useTimer()!;
  console.log(timers);
  return (
    <ul>
      {timers.map((time) => (
        <li key={time.name}>
          <Timer {...time} />
        </li>
      ))}
    </ul>
  );
}
