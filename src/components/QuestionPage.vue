<template>
  <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
    <div v-if="currentQuestionIndex > 0" class="mb-10">
      <font-awesome-icon
          icon="angle-left"
          class="text-4xl cursor-pointer text-gray-400 hover:text-gray-700 transition-transform duration-300 transform hover:scale-150 mr-4"
          @click="goBack"
      />
    </div>
    <h2 class="text-2xl font-bold mb-6 text-left">{{ currentQuestion.question }}</h2>
    <p class="text-gray-600 mb-6">Markieren Sie die richtigen Antworten</p>
    <img v-if="currentQuestion.questionImage" :src="currentQuestion.questionImage" alt="Question Image" class="mb-6 rounded-lg shadow-md" />
    <div v-for="(option, index) in currentQuestion.options" :key="index" class="mb-4">
      <label
          class="flex items-center justify-between p-4 border rounded-lg cursor-pointer transition transform hover:scale-105"
          :class="{ 'bg-green-500 text-white': selectedAnswers.includes(option.text), 'border-green-500': selectedAnswers.includes(option.text) }"
      >
        <div class="flex items-center">
          <input type="checkbox" :value="option.text" v-model="selectedAnswers" class="hidden" />
          <span>{{ option.text }}</span>
        </div>
        <button v-if="option.image" @click.prevent="toggleImage(index)" class="text-black underline hover:text-black-700 text-sm">Show Image</button>
      </label>
      <div v-if="isImageVisible(index) && option.image" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full transition-transform transform scale-95 hover:scale-100">
          <img :src="option.image" :alt="option.text" class="w-full h-auto object-cover rounded-lg" />
          <button @click="toggleImage(index)" class="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">Close</button>
        </div>
      </div>
    </div>
    <button :disabled="selectedAnswers.length === 0" @click="checkAnswer" class="w-full bg-black text-white p-3 rounded-lg mt-6 disabled:bg-gray-300 hover:bg-gray-800">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../store/store';

export default {
  setup() {
    const quizStore = useQuizStore();
    const router = useRouter();
    const currentQuestion = computed(() => quizStore.questions[quizStore.currentQuestionIndex]);
    const selectedAnswers = ref<string[]>([]);
    const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex);
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

    const checkAnswer = () => {
      quizStore.setUserAnswer({ question: currentQuestion.value.question, answer: selectedAnswers.value.join(', ') });
      router.push('/result');
    };

    const goBack = () => {
      if (quizStore.currentQuestionIndex > 0) {
        quizStore.previousQuestion();
        router.push('/question');
      } else {
        router.push('/');
      }
    };

    onMounted(() => {
      if (!currentQuestion.value) {
        quizStore.loadQuestions();
      }
    });

    return { currentQuestion, selectedAnswers, checkAnswer, toggleImage, isImageVisible, currentQuestionIndex, goBack };
  },
};
</script>
