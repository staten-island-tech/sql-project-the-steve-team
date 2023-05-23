<script setup>
    import Section from "./sideBarSection.vue"
</script>

<template>
    <main>
        <Section></Section>

    </main>
</template>

<style scoped>
    main {
        position: absolute;
        left:0px;
        bottom: 10vh;
        width: 20vw;
        height:82vh;
        background-color: #556 ;
        z-index: -1;
        margin-left: 20px;
        border-radius: 50px;
    }
</style>