import React from 'react';
import { DifficultySelectorProps } from '../types';

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border-4 border-indigo-400 text-center">
                <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">도전 모드를 선택하세요!</h1>
                <p className="text-gray-600 mb-8">자신에게 맞는 난이도로 학습 효과를 높여보세요.</p>
                
                <div className="space-y-4">
                    <button
                        onClick={() => onSelectDifficulty('easy')}
                        className="w-full text-left p-6 bg-green-50 border-2 border-green-300 rounded-xl hover:bg-green-100 hover:border-green-400 transition duration-200 group"
                    >
                        <h2 className="text-xl font-bold text-green-800">🎓 쉬움 모드</h2>
                        <p className="text-green-700">시간 제한 없이 차근차근 문제를 풀어보세요.</p>
                    </button>
                    
                    <button
                        onClick={() => onSelectDifficulty('hard')}
                        className="w-full text-left p-6 bg-red-50 border-2 border-red-300 rounded-xl hover:bg-red-100 hover:border-red-400 transition duration-200 group"
                    >
                        <h2 className="text-xl font-bold text-red-800">🔥 어려움 모드</h2>
                        <p className="text-red-700">문제당 15초! 순발력과 정확도에 도전하세요.</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DifficultySelector;
