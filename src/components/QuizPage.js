import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './QuizPage.css';

const QuizPage = ({ token }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
                setQuestions(response.data.results);
            } catch (error) {
                if (error.response.status === 429) {
                    await retryFetchQuestions(500);
                } else {
                    console.error('Error fetching questions:', error);
                }
            }
        };

        const retryFetchQuestions = async (delay) => {
            await new Promise((resolve) => setTimeout(resolve, delay));
            fetchQuestions();
        };

        fetchQuestions();
    }, []);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
            setScore(score + 1);
        }
        setSelectedAnswer('');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className='quiz-container'>
                <h2>Quiz Completed!</h2>
                <p className='para'>Your score: {score} / {questions.length}</p>
                <button onClick={handleLogout} className='logout-button'>Logout</button>
            </div>
        );
    }

    return (
        <div className='quiz-container'>
            {questions.length > 0 && (
                <div className='question-container'>
                    <h2 className='question'>{questions[currentQuestionIndex].question}</h2>
                    <div className='answer-container'>
                        {questions[currentQuestionIndex].incorrect_answers.concat(questions[currentQuestionIndex].correct_answer).sort().map((answer) => (
                            <button
                                key={answer}
                                className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div className='button-container'>
                        {currentQuestionIndex > 0 && (
                            <button className='previous-button' onClick={handlePreviousQuestion}>Previous</button>
                        )}
                        <button className='next-button' onClick={handleNextQuestion}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
