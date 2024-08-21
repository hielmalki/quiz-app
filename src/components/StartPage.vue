<template>
  <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center animated-title">Willkommen zum Quiz</h1>
    <p class="text-gray-600 mb-6 text-center">Klicken Sie auf den Button unten, um das Quiz zu starten.</p>
    <button @click="startQuiz" class="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300">Start Quiz</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useQuizStore } from '../store/store';

export default {
  setup() {
    const router = useRouter();
    const quizStore = useQuizStore();

    const startQuiz = () => {
      quizStore.loadQuestions();
      router.push('/question');
    };

    return { startQuiz };
  },
};
</script>

<style>
.animated-title {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
