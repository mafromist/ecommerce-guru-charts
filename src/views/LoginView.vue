<template>
  <section
    class="flex flex-col items-center justify-center h-full bg-red-100 gap-20">
    <div class="text-center mt-20">
      <h1 class="font-bold">Welcome to Ecommerce Guru Dashboard</h1>
      <h2>Enter your login details for reaching your daily sales details in your marketplace</h2>
    </div>

    <div class="flex justify-center items-center">
      <div class="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 class="text-xl font-bold mb-4">Login</h1>
        <form @submit.prevent="submitLoginDetails">
          <div class="mb-4">
            <label class="block mb-1">Email</label>
            <input type="email" v-model="loginDetails.email"
              class="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div class="mb-4">
            <label class="block mb-1">Password</label>
            <input type="password" v-model="loginDetails.password"
              class="w-full p-2 border border-gray-300 rounded" required />
          </div>

          <div v-if="errorMessage" class="text-red-500 mb-4">
            {{ errorMessage }}
          </div>

          <button type="submit"
            class="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Login
          </button>
        </form>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const loginDetails = reactive({
  email: "",
  password: "",
});

const errorMessage = ref("");

const router = useRouter();
const store = useStore();

const resetPassword = () => {
  loginDetails.password = "";
}

const submitLoginDetails = async () => {
  try {
    errorMessage.value = "";
    const isUserLogged = await store.dispatch("auth/loginUser", {
      email: loginDetails.email, password: loginDetails.password
    });

    if (isUserLogged) {
      router.push('/dashboard')
    } else {
      errorMessage.value = "Hmm, invalid email or password. Please try again.";
    }
    resetPassword();
  } catch (error) {
    console.error(error);
  }
}

</script>