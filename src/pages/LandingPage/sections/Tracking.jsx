import React from "react";
import useTracking from "../hooks/useTracking";
import { steps } from "../data/steps";
import Step from "../components/Step";

export default function Tracking() {
  const { statusIndex, progress } = useTracking();

  return (
    <section className="max-w-6xl mx-auto px-6 mt-20">
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 border">
        <p className="text-sm text-slate-500">Order Tracking</p>

        <div className="mt-3">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs mt-1">Progres {Math.round(progress)}%</p>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((step, i) => (
            <Step
              key={i}
              icon={step.icon}
              text={step.text}
              status={
                i < statusIndex
                  ? "completed"
                  : i === statusIndex
                  ? "current"
                  : "pending"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
