import { useEffect, useRef, useState } from "react";
import { useTimer, type objTimer } from "./Store/timers-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ name, duration }: objTimer) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimer()!;

  // using a falsy value like "interval.current" to make sure there isn't Type 'null' is not assignable to type 'number | undefined'
  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(function () {
        setRemainingTime((remainTime) => {
          if (remainTime <= 0) {
            return remainTime;
          }
          return remainTime - 50;
        });
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    //Creating a cleanup function since react strict mode runs twice and makes the time go faster than normal when executed
    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      {/* <p>{duration}</p> */}
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
