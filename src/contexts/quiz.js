import { createContext, useReducer } from "react";
import { shuffleAnswer } from "../helpers/helper";
import questions from "../data";

const initialState = {
    currentQuestionIndex: 0,
    questions,
    answers: shuffleAnswer(questions[0]),
    currentAnswer: "",
    correctAnswersCount: 0,
    showResults: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "RESTART":
            return initialState;
        case "NEXT_QUESTION": {
            const showResults =
                state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults
                ? state.currentQuestionIndex
                : state.currentQuestionIndex + 1;
            const answers = shuffleAnswer(questions[currentQuestionIndex]);
    
            return {
                ...state,
                currentQuestionIndex,
                answers,
                currentAnswer: "",
                showResults
            };
        }
        case "SELECT_ANSWER": {
            const correctAnswersCount =
                action.payload === 
                state.questions[state.currentQuestionIndex].correctAnswer
                ? state.correctAnswersCount + 1
                : state.correctAnswersCount;

            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount
            };
        }
        default:
            return state;
    }
}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(reducer, initialState);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
