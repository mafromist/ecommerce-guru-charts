<script setup>

</script>

<template>
    <nav class="relative flex items-stretch justify-center capitalize text-lg pt-4">
        <router-link class="inline pr-5" to="/" active-class="active">Home</router-link>
    </nav>
    <router-view></router-view>
    <footer>
        <p class="text-center font-bold">2025 - Developed by Muge Alev</p>
    </footer>
</template>

<style lang="scss">
#app {
    @apply h-screen bg-gray-50;
}

nav {
    a.active {
        &::after {
            @apply block w-full bg-green-500;
            content: '';
            height: 1px;
        }
    }
}
</style>
