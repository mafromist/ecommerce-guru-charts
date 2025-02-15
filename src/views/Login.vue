<template>
  <div>
    <h1>Welcome to Ecommerce Guru Dashboard</h1>
    <h2>Enter your login details for reaching your sales details</h2>

    <div class="flex justify-center items-center h-screen">
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

  </div>
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

    console.log(isUserLogged)

    if (isUserLogged) {
      console.log("User is logged in");
      console.log("Store in Login.vue:", store)
      console.log("Attempting to navigate to /dashboard");
      router.push('/dashboard').then(() => {
        console.log("Navigation to /dashboard successful");
      }).catch((error) => {
        console.error("Failed to navigate to /dashboard:", error);
      });
    }
    else {
      errorMessage.value = "Hmm, invalid email or password. Please try again.";
    }
    resetPassword();
  } catch (error) {
    console.error(error);
  }
}

</script>