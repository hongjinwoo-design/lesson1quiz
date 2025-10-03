import React, { useState, useEffect } from 'react';
import { quizData, TIMER_DURATION } from './constants';
import OptionButton from './components/OptionButton';
import { ZapIcon, TrophyIcon, MessageSquareIcon } from './components/icons';
import { Difficulty, GameState } from './types';
import Timer from './components/Timer';
import DifficultySelector from './components/DifficultySelector';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('selectingDifficulty');
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

    const currentQuestion = quizData[currentQuestionIndex];

    useEffect(() => {
        if (difficulty === 'hard' && gameState === 'playing' && !isAnswered) {
            if (timeLeft === 0) {
                setIsAnswered(true);
                return;
            }

            const timerId = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [timeLeft, difficulty, gameState, isAnswered]);

    const handleAnswerSelection = (index: number) => {
        if (!isAnswered) {
            setSelectedAnswerIndex(index);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswerIndex === null) return;
        setIsAnswered(true);

        if (selectedAnswerIndex === currentQuestion.answerIndex) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        setSelectedAnswerIndex(null);
        setIsAnswered(false);
        setTimeLeft(TIMER_DURATION);
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameState('results');
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswerIndex(null);
        setIsAnswered(false);
        setScore(0);
        setGameState('selectingDifficulty');
        setDifficulty(null);
        setTimeLeft(TIMER_DURATION);
    };

    const handleSelectDifficulty = (level: Difficulty) => {
        setDifficulty(level);
        setGameState('playing');
        setTimeLeft(TIMER_DURATION);
    };

    const getEncouragement = (finalScore: number) => {
        const percentage = (finalScore / quizData.length) * 100;
        if (percentage === 100) return { message: "와우! 퍼펙트! 💯 지문 내용을 완벽하게 이해했어요. 정말 대단합니다!", color: "text-green-600", bgColor: "bg-green-50" };
        if (percentage >= 80) return { message: "아주 잘했어요! 🌟 핵심 내용을 정확히 파악하고 있네요. 자신감을 가지세요!", color: "text-blue-600", bgColor: "bg-blue-50" };
        if (percentage >= 50) return { message: "좋아요! 💪 조금만 더 꼼꼼히 복습하면 만점도 문제없을 거예요. 힘내세요!", color: "text-yellow-600", bgColor: "bg-yellow-50" };
        return { message: "괜찮아요! 다시 한번 지문을 읽고 도전해 봅시다. 🌈 실력은 노력으로 만들어지는 법!", color: "text-red-600", bgColor: "bg-red-50" };
    };

    if (gameState === 'selectingDifficulty') {
        return <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />;
    }

    if (gameState === 'results') {
        const encouragement = getEncouragement(score);
        return (
            <div className="p-4 sm:p-6 max-w-2xl mx-auto min-h-screen flex items-center justify-center">
                <div className="w-full p-6 bg-white rounded-3xl shadow-2xl border-4 border-indigo-400">
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 text-center">🎉 학습 결과입니다! 🎉</h2>
                    <div className="text-center my-6">
                        <TrophyIcon className="w-16 h-16 mx-auto text-yellow-500 mb-3" fill="currentColor" />
                        <p className="text-6xl font-black text-gray-800">{score} / {quizData.length}</p>
                        <p className="text-lg text-gray-500 mt-2">정답 개수</p>
                    </div>
                    <p className={`text-xl font-bold p-4 rounded-xl text-center ${encouragement.color} ${encouragement.bgColor}`}>
                        {encouragement.message}
                    </p>
                    <button
                        onClick={handleRestart}
                        className="mt-8 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200 shadow-lg"
                    >
                        다시 도전하기! 🚀
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-2xl mx-auto bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-indigo-400 mt-4 sm:mt-8">
                <div className="flex justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 flex items-center shrink">
                        <ZapIcon className="w-6 h-6 mr-2 text-yellow-500" />
                        Lesson 1. 퀴즈
                    </h1>
                    <div className="flex items-center gap-4">
                         {difficulty === 'hard' && <Timer timeLeft={timeLeft} duration={TIMER_DURATION} />}
                        <span className="text-xl font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                            {currentQuestionIndex + 1} / {quizData.length}
                        </span>
                    </div>
                </div>

                <div className="bg-indigo-50 p-5 rounded-2xl border-2 border-indigo-200 mb-6 shadow-inner">
                    <p className="text-xs font-semibold text-indigo-500 mb-1">[{currentQuestion.type}]</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {currentQuestion.question}
                    </p>
                </div>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <OptionButton
                            key={index}
                            option={option}
                            index={index}
                            selected={selectedAnswerIndex}
                            isCorrect={index === currentQuestion.answerIndex}
                            isAnswered={isAnswered}
                            onClick={handleAnswerSelection}
                            isSpecialCase={currentQuestion.id === 10}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-between space-x-4">
                    {!isAnswered ? (
                        <button
                            onClick={handleSubmit}
                            disabled={selectedAnswerIndex === null}
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            정답 확인하기! ✅
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200 shadow-lg"
                        >
                            {currentQuestionIndex < quizData.length - 1 ? '다음 문제로! ➡️' : '결과 보기! 🏆'}
                        </button>
                    )}
                </div>

                {isAnswered && (
                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
                            <MessageSquareIcon className="w-5 h-5 mr-2" />
                            {timeLeft === 0 && selectedAnswerIndex !== currentQuestion.answerIndex && <span className="text-red-600 mr-2">시간 초과!</span>}
                            풀이 및 해설
                        </h3>
                        <p className="text-gray-800 leading-normal">{currentQuestion.explanation}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
