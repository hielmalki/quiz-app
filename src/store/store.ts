import { defineStore } from 'pinia';

interface Option {
    text: string;
    image: string;
}

interface Question {
    question: string;
    questionImage: string;
    options: Option[];
    correctAnswer: string[];
}

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        questions: [] as Question[],
        currentQuestionIndex: 0,
        userAnswer: { question: '', answer: '' },
    }),
    actions: {
        async loadQuestions() {
            try {
                const response = await fetch('/src/assets/questions.json');
                const data: Question[] = await response.json();
                this.questions = this.shuffleArray(data);
            } catch (error) {
                console.error('Error loading questions:', error);
            }
        },
        setUserAnswer(answer: { question: string; answer: string }) {
            this.userAnswer = answer;
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            }
        },
        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        resetQuestions() {
            this.currentQuestionIndex = 0;
        },
        hasNextQuestion() {
            return this.currentQuestionIndex < this.questions.length - 1;
        },
        shuffleArray(array: any[]) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
    },
});
