import { useEffect, useState } from "react";
import { steps } from "../data/steps";

export default function useTracking() {
  const [statusIndex, setStatusIndex] = useState(1);

  const progress = ((statusIndex + 1) / steps.length) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { statusIndex, progress };
}
