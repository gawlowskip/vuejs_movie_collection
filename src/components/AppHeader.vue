<template>
    <header id="header">
        <h1 class="logo">Movie Collection</h1>

        <ul class="menu-items">
            <router-link :to="{name: 'movies'}" tag="li" active-class="active"><a>Movies</a></router-link>
            <router-link :to="{name: 'stats'}" tag="li" active-class="active"><a>Stats</a></router-link>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>