import React from "react";

type ProgressBarProps = {
  value: number;
  color?: "green" | "red" | "blue" | "yellow";
};

const colorMap = {
  green: "bg-green-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-400",
};

export default function ProgressBar({ value, color = "green" }: ProgressBarProps) {
  const barColor = colorMap[color];

  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${barColor} transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
