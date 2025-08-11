import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  init?: number;
};

export const timer = (props: Props) => {
  const { init = 0 } = props;
  const [time, setTime] = useState(init);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number>(null);

  useEffect(() => {
    setTime(init);
  }, [init]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const onStart = useCallback(() => {
    if (!running) {
      setRunning(true);
    }
  }, [setRunning]);

  const onEnd = useCallback(() => {
    setRunning(false);
  }, [setRunning]);

  const reset = useCallback(() => {
    setRunning(false);
    setTime(init);
  }, [setRunning, setTime]);

  const getCurrentFormatted = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");
  };

  const getCurrent = () => {
    return time;
  };

  return { onStart, onEnd, getCurrent, reset, getCurrentFormatted };
};
