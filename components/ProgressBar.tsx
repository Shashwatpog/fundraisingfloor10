import React from "react";

interface Goal {
  amount: number;
  label: string;
}

interface ProgressBarProps {
  currentAmount: number;
  goals: Goal[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentAmount, goals }) => {
  const totalGoal = goals[goals.length - 1].amount;
  const progress = (currentAmount / totalGoal) * 100;

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Display Total Raised Amount */}
      <h2 className="text-xl font-semibold mb-2">
        Total Raised: <span className="text-green-600">${currentAmount}</span>
      </h2>

      {/* Progress Bar */}
      <div className="relative w-full h-5 bg-gray-300 rounded-full">
        <div
          className="h-5 bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        
        {/* Goal Markers on Progress Bar */}
        {goals.map((goal) => {
          const position = (goal.amount / totalGoal) * 100; // Position based on goal percentage

          return (
            <div
              key={goal.amount}
              className="absolute top-0 flex flex-col items-center transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              <div className="w-1 h-5 bg-black"></div> {/* Vertical marker */}
            </div>
          );
        })}
      </div>

      {/* Goal Labels Positioned Below Correctly */}
      <div className="relative w-full mt-2">
        {goals.map((goal) => {
          const position = (goal.amount / totalGoal) * 100;

          return (
            <div
              key={goal.amount}
              className="absolute flex flex-col items-center transform -translate-x-1/2 text-center"
              style={{ left: `${position}%` }}
            >
              <span className="text-lg font-bold">{goal.amount}</span>
              <span
                className={`text-md font-bold ${
                  currentAmount >= goal.amount ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {goal.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
