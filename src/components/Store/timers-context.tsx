import { type ReactNode, createContext, useReducer, useContext } from "react";

export type objTimer = {
  name: string;
  duration: number;
};

type TimerInitialState = {
  isRunning: boolean;
  timers: objTimer[];
};

type TimerFunctions = {
  addTimer: (objData: objTimer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

const initialState: TimerInitialState = {
  isRunning: false,
  timers: [],
};

type TimerContextProps = TimerInitialState & TimerFunctions;

// <TimerContextProps | null> we will manage this context so when we call this context we will be able retrieve the data.
// the "null" can be the alternative value managed by the timersContext
const TimerContext = createContext<TimerContextProps | null>(null);

type AddTimerProps = {
  type: "ADD_TIMER";
  payload: objTimer;
};

type StartTimerProps = {
  type: "START_TIMER";
};

type StopTimerProps = {
  type: "STOP_TIMER";
};

type ActionProps = AddTimerProps | StartTimerProps | StopTimerProps;

function reducer(
  state: TimerInitialState,
  action: ActionProps
): TimerInitialState {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };
    case "START_TIMER":
      return { ...state, isRunning: true };
    case "STOP_TIMER":
      return { ...state, isRunning: false };
    default:
      throw new Error("unknown error in reducer function");
  }
}

type TimerProviderChildrenProps = {
  children: ReactNode;
};
function TimerProvider({ children }: TimerProviderChildrenProps) {
  // reducer is always first and then initial state
  const [{ isRunning, timers }, dispatch] = useReducer(reducer, initialState);
  function startTimer() {
    dispatch({ type: "START_TIMER" });
  }
  function stopTimer() {
    dispatch({ type: "STOP_TIMER" });
  }
  function addTimer(objTimer: objTimer) {
    dispatch({ type: "ADD_TIMER", payload: objTimer });
  }
  return (
    <TimerContext.Provider
      value={{ isRunning, timers, startTimer, stopTimer, addTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
}
function useTimer() {
  const contextValue = useContext(TimerContext);
  if (contextValue === undefined) {
    throw new Error("Timer was used outside of timer provider");
  }
  return contextValue;
}

export { useTimer, TimerProvider };
