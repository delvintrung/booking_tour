import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  seconds: number;
  onComplete?: () => void;
}

export default function CountdownTimer({
  seconds,
  onComplete,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, onComplete]);
  const secs = timeLeft % 60;

  return (
    <motion.div
      key={timeLeft}
      initial={{ scale: 1 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      style={{ fontSize: "1rem", fontWeight: "bold" }}
    >
      {secs.toString().padStart(2, "0")}
    </motion.div>
  );
}
