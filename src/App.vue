<template>
    <Navbar />
    <router-view></router-view>
    <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<style lang="scss">
#app
{
    @apply h-screen flex flex-col justify-between bg-gray-50;
}
</style>
