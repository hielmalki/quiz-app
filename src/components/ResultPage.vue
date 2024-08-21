<template>
  <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
    <div class="flex items-center mb-10">
      <font-awesome-icon
          icon="angle-left"
          class="text-4xl cursor-pointer text-gray-400 hover:text-gray-700 transition-transform duration-300 transform hover:scale-150 mr-4"
          @click="goBack"
      />
      <h2 :class="['text-2xl', 'font-bold', 'flex-grow', 'text-center', 'mr-8', isCorrect(userAnswer) ? 'text-green-500 animate-bounce' : 'text-red-500 animate-bounce']">{{ isCorrect(userAnswer) ? 'Richtig!' : 'Falsch!' }}</h2>
    </div>
    <div v-if="userAnswer">
      <img v-if="getQuestionImage(userAnswer.question)" :src="getQuestionImage(userAnswer.question)" alt="Question Image" class="mb-6 rounded-lg shadow-md" />
      <div v-for="(option, index) in getOptions(userAnswer.question)" :key="index" class="mb-4">
        <p
            class="flex items-center justify-between p-4 border rounded-lg shadow-sm transition transform hover:scale-105"
            :class="{
            'bg-green-500 text-white': getCorrectAnswer(userAnswer.question).includes(option.text) && userAnswer.answer.split(', ').includes(option.text),
            'bg-red-500 text-white': !getCorrectAnswer(userAnswer.question).includes(option.text) && userAnswer.answer.split(', ').includes(option.text),
            'bg-gray-200': !userAnswer.answer.split(', ').includes(option.text) && getCorrectAnswer(userAnswer.question).includes(option.text),
          }"
        >
          <span>{{ option.text }}</span>
          <button v-if="option.image" @click.prevent="toggleImage(index)" class="text-black underline hover:text-black-700 text-sm">Show Image</button>
        </p>
        <div v-if="isImageVisible(index) && option.image" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full transition-transform transform scale-95 hover:scale-100">
            <img :src="option.image" :alt="option.text" class="w-full h-auto object-cover rounded-lg" />
            <button @click="toggleImage(index)" class="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">Close</button>
          </div>
        </div>
      </div>
      <hr class="my-6">
      <p class="mt-4 text-base">
        <span class="font-semibold">Richtige Antwort:</span> {{ getCorrectAnswer(userAnswer.question).join(', ') }}
      </p>
    </div>
    <button :disabled="!hasNextQuestion" @click="goToNextQuestion" class="w-full bg-black text-white p-3 rounded-lg mt-4 disabled:bg-gray-300 hover:bg-gray-800">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../store/store';

export default {
  setup() {
    const quizStore = useQuizStore();
    const router = useRouter();
    const userAnswer = computed(() => {
      const currentQuestion = quizStore.questions[quizStore.currentQuestionIndex];
      return quizStore.userAnswers.find(answer => answer.question === currentQuestion.question) || { question: '', answer: '' };
    });
    const hasNextQuestion = computed(() => quizStore.hasNextQuestion());
    const visibleImages = ref<number[]>([]);

    const toggleImage = (index: number) => {
      if (visibleImages.value.includes(index)) {
        visibleImages.value = visibleImages.value.filter(i => i !== index);
      } else {
        visibleImages.value.push(index);
      }
    };

    const isImageVisible = (index: number) => {
      return visibleImages.value.includes(index);
    };

    const getOptions = (question: string) => {
      const q = quizStore.questions.find(q => q.question === question);
      return q ? q.options : [];
    };

    const getQuestionImage = (question: string) => {
      const q = quizStore.questions.find(q => q.question === question);
      return q ? q.questionImage : '';
    };

    const getCorrectAnswer = (question: string) => {
      const q = quizStore.questions.find(q => q.question === question);
      return q ? q.correctAnswer : [];
    };

    const isCorrect = (answer: { question: string; answer: string }) => {
      const userAnswers = answer.answer.split(', ').sort().join(', ');
      const correctAnswers = getCorrectAnswer(answer.question).sort().join(', ');
      return userAnswers === correctAnswers;
    };

    const goBack = () => {
      router.go(-1);
    };

    const goToNextQuestion = () => {
      if (hasNextQuestion.value) {
        quizStore.nextQuestion();
        router.push('/question');
      } else {
        router.push('/');
      }
    };

    return { userAnswer, getOptions, isCorrect, getCorrectAnswer, getQuestionImage, goBack, hasNextQuestion, goToNextQuestion, toggleImage, isImageVisible };
  },
};
</script>
