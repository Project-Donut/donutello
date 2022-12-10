<script setup>
//import vue
import {ref, render, toHandlerKey, defineProps} from 'vue';
const props = defineProps(['model']);
let selected = ref(null);
const updateIcing = () => {
    if(selected.value){
        props.model.loadIcing(ref(selected.value));}
    }
    
 

</script>

<template>
    <div class="userInput">
        <input class="__input" type="text" placeholder="Name your nutty boy">
        <label for="flavours">Choose your flavour</label>
        <select name="flavours" class="__input" v-model="selected" @click="updateIcing()">
            <option disabled value=null>Please select a flavour</option>
            <option value="0xc71639" >
                strawberry
            </option>
            <option value="0x803721">choccy</option>
            <option value="0xedc568">vanilla</option>   
        </select>
        <label for="sprinkles">You want sprinkies?</label>
        <select name="sprinkles" class="__input __input-sprinkles">
            <option value="rainbow">rainbow sprinkies</option>
            <option value="choccy">choccy sprinkies</option>
            <option value="vanilla">vanilla sprinkies</option>
            <option value="none">No sprinkies</option>
        </select>
        <label for="balls">Balls?</label>
        <select name="balls" class="__input __input-balls">
            <option value="blue">Blue balls</option>
            <option value="none">No balls?</option>
        </select>
     

        <button class="__input">Save this Nutty man</button>
    </div>
    

</template>

<style scoped>
.userInput{
    overflow: scroll;
    background-color: aliceblue;
    width: 100%; 
    padding: 1em;
    max-height: 100%;

}
.__input{
    display: block;
    
    width: 90%;
    height: 50px;
    margin: 10px;
    margin-bottom: 2em;
    border: 2px solid white;
    border-radius: 5px;

}
</style>