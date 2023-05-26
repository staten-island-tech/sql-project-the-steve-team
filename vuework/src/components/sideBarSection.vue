<script setup>

</script>

<template>
<div>
    <h1>Lines</h1>
    <div class="options">
        <button @click="$emit('SolidLine')" id="solid"></button>
        <button @click="$emit('DashedLine')" id="dashed"></button>
    </div>
    <br><br>
    <h1>Shapes</h1>
    <div class="options">
        <button @click="$emit('Rectangle')" id="rectangle"></button>
        <button @click="$emit('Triangle')" id="triangle"></button>
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
#rectangle {
background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png');
}
#triangle {
    background-image: url("https://static.vecteezy.com/system/resources/thumbnails/001/200/602/small/triangle.png");
}
</style>