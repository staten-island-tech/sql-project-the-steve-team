<script setup>
    import Section from "./sideBarSection.vue"


</script>

<template>
    <main id="m">
        <Section @SolidLine="$emit('_SolidLine')" @DashedLine="$emit('_DashedLine')" @Triangle="$emit('_Triangle')" @Rectangle="$emit('_Rectangle')" ></Section>
        <slot></slot>
    </main>
    
</template>

<style scoped>
    #m {
        position: absolute;
        left:0px;
        bottom: 10vh;
        width: 20vw;
        height:82vh;
        background-color: #556 ;
        margin-left: 20px;
        border-radius: 50px;
        pointer-events: all;
    }
</style>