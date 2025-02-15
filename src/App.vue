<template>
    <nav
        class="relative flex items-stretch justify-center capitalize text-lg pt-4">
        <router-link v-if="!isAuthenticated" class="inline pr-5" to="/"
            active-class="active">Login</router-link>

        <div v-else>
            <router-link class="inline pr-5" to="/dashboard"
                active-class="active">Dashboard</router-link>
            <router-link class="inline pr-5" to="/"
                @click.prevent="logout"
                active-class="active">Logout</router-link>
        </div>
    </nav>
    <router-view></router-view>
    <footer>
        <p class="text-center font-bold">2025 - Developed by Muge Alev</p>
    </footer>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { routerKey, useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const logout = () => {
    store.dispatch('auth/logoutUser');
    router.push('/');
}

</script>

<style lang="scss">
#app
{
    @apply h-screen bg-gray-50;
}

nav
{
    a.active
    {
        &::after
        {
            @apply block w-full bg-green-500;
            content: '';
            height: 1px;
        }
    }
}
</style>
