
import React from 'react';

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
  const reachedGoals = goals.filter(goal => currentAmount >= goal.amount);
  const progress = (currentAmount / totalGoal) * 100;

  return (
    <div className="w-full">
      
      <div className="relative h-5 bg-gray-300 rounded-full">
        <div
          className="h-5 bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      
      <div className="mt-2 flex justify-evenly text-sm">
        {goals.map((goal, index) => (
          <div
            key={goal.amount}
            className={`${
              currentAmount >= goal.amount ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            

        <div className="flex flex-col items-center w-18 text-center">
            <span className="text-lg font-bold">{goal.amount}</span> 
            <span className={`text-md font-bold ${currentAmount >= goal.amount ? 'text-green-600' : 'text-yellow-600'}`}>{goal.label}</span>
        </div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
