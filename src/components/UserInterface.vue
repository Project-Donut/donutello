<script setup>
//import vue
import {ref, render, toHandlerKey} from 'vue';

</script>

<template>
    <h1>hahahah ik ben een user interface hahaha</h1>
    <div class="userInput">
        <input class="__input" type="text" placeholder="Name your nutty boy">
        <label for="flavours">Choose your flavour</label>
        <select name="flavours" class="__input">
            <option value="choccy">choccy</option>
            <option value="vanilla">vanilla</option>
            <option value="strawberry">strawberry</option>
        </select>

        <button class="__input">Submit</button>
    </div>
    

</template>

<style scoped>
.userInput{
    
    background-color: aliceblue;
    width: 90%; 

}
.__input{
    width: 90%;
    height: 50px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
        
}
</style>