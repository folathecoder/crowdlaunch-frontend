import React, { useState, useEffect } from 'react';

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  startDate: string;
  targetSeconds: number;
}

const Timer = ({ startDate, targetSeconds }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(startDate, targetSeconds)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(startDate, targetSeconds);
      setTimeRemaining(newTimeRemaining);

      if (newTimeRemaining.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, targetSeconds]);

  const formattedTime = `${timeRemaining.days.toLocaleString()}d : ${timeRemaining.hours.toLocaleString()}h : ${timeRemaining.minutes.toLocaleString()}m : ${timeRemaining.seconds.toLocaleString()}s`;

  return <h3>{formattedTime}</h3>;
};

function calculateTimeRemaining(
  startDate: string,
  targetSeconds: number
): TimeRemaining {
  const now = new Date().getTime();
  const targetDate = new Date(startDate).getTime() + targetSeconds * 1000; // Convert targetSeconds to milliseconds
  const timeDiff = targetDate - now;

  if (timeDiff <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return {
    total: timeDiff,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default Timer;
