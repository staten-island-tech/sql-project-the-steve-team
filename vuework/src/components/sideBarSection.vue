<script setup>

</script>

<template>
<div>
    <h1>Lines</h1>
    <div class="options">
        <button id="solid"></button>
        <button id="dashed"></button>
    </div>
    <br><br><br><br><br><br>
    <h1>Shapes</h1>
    <div class="options">
        <p id="test"></p>
    </div>

</div>
</template>

<style scoped>

h1 {
    border-bottom: 2px solid black;
}

.options {
    width: 20vw;
    height: 100px;
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    justify-content: space-around;
}
button {
    height: 75px;
    width: 75px;
    background-size: contain;
    background-repeat: no-repeat;
}

#solid {
    background-image: url('solidline.png');
}

#dashed {
    background-image: url('dashedline.png');
}
</style>