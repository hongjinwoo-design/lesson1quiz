
import React from 'react';
import { OptionButtonProps } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

const OptionButton: React.FC<OptionButtonProps> = ({ option, index, selected, isCorrect, isAnswered, onClick, isSpecialCase }) => {
    let baseStyle = "border p-3 my-2 text-left rounded-xl transition duration-300 shadow-md font-medium ";
    let colorStyle = "bg-white border-gray-300 hover:bg-indigo-50 hover:border-indigo-500";
    
    if (isAnswered) {
        if (isCorrect) {
            colorStyle = "bg-green-100 border-green-500 text-green-800 shadow-lg";
        } else if (selected === index) {
            colorStyle = "bg-red-100 border-red-500 text-red-800 shadow-lg";
        } else {
            colorStyle = "bg-white border-gray-300 text-gray-700 opacity-60";
        }
    } else if (selected === index) {
        colorStyle = "bg-indigo-100 border-indigo-500 text-indigo-700 shadow-lg";
    }

    const displayOptionText = isSpecialCase ? option : `${String.fromCharCode(65 + index)}. ${option}`;

    return (
        <button
            className={`${baseStyle} ${colorStyle} w-full`}
            onClick={() => onClick(index)}
            disabled={isAnswered}
        >
            {displayOptionText}
            {isAnswered && (
                <span className="float-right ml-2">
                    {isCorrect && <CheckCircleIcon className="text-green-500 inline-block w-5 h-5" />}
                    {selected === index && !isCorrect && <XCircleIcon className="text-red-500 inline-block w-5 h-5" />}
                </span>
            )}
        </button>
    );
};

export default OptionButton;
