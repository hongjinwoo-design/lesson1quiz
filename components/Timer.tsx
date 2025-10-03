import React from 'react';
import { TimerProps } from '../types';

const Timer: React.FC<TimerProps> = ({ timeLeft, duration }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (timeLeft / duration) * circumference;

    const timerColor = timeLeft <= 5 ? 'stroke-red-500' : 'stroke-green-500';
    const textColor = timeLeft <= 5 ? 'fill-red-600' : 'fill-gray-700';

    return (
        <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle
                    className="stroke-gray-200"
                    strokeWidth="4"
                    fill="transparent"
                    r={radius}
                    cx="20"
                    cy="20"
                />
                <circle
                    className={`transform -rotate-90 origin-center transition-all duration-300 ${timerColor}`}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="20"
                    cy="20"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className={`text-lg font-bold ${textColor}`}
                >
                    {timeLeft}
                </text>
            </svg>
        </div>
    );
};

export default Timer;
