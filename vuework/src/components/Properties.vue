<script setup>
let prop = defineProps(["propertyArray"])
console.log(prop.propertyArray)
</script>
<template>
    <main>
        <h3>Properties</h3>
            <ul>
                <li v-for="p in prop.propertyArray"><b>{{p.Key}}</b>: <input type="number" :id="p.Key" v-model="p.Value" v-on:input="$emit('adjust', p.Key, p.Value)"></li>
            </ul>
    </main>
</template>
<style scoped>
h3 {
    border-bottom: 2px solid black;
    width:70%;
    margin: auto auto
}
li{
    width: max-content;
    margin: auto auto;
}
input {
    width: 5em;
    text-align: right;
}
</style>