import React, { useEffect, useState } from "react";

interface CountDownTimerProps {
  targetDate: Date;
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<number>(targetDate.getTime() - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetDate.getTime() - new Date().getTime();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex gap-2 text-center font-mono">
      <div>
        <div className="text-2xl font-bold">{days}</div>
        <div className="text-sm">Days</div>
      </div>
      <div>
        <div className="text-2xl font-bold">{hours}</div>
        <div className="text-sm">Hours</div>
      </div>
      <div>
        <div className="text-2xl font-bold">{minutes}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div>
        <div className="text-2xl font-bold">{seconds}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
};

export default CountDownTimer;
