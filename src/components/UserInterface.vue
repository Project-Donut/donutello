<script setup>
//import vue
import {ref, render, reactive, defineProps} from 'vue';
//create reactive state to send to api
let state = reactive({order: []});
const props = defineProps(['model']);
let icingFlavour = ref(null);
let icing = ref(null);
let filling = ref('0xffffff');
let fillingFlavour = ref(null);
const updateIcing = () => {
    if(icing.value){
        props.model.loadIcing(ref(icing.value));}
        icingFlavour = icing.value;  
    }
const updateFilling = () => {
    if(filling.value && filling.value != '0x000000'){
        props.model.loadFilling(ref(filling.value));
        props.model.filling.visible=true;
    }else{
        props.model.filling.visible=false;
    }
        fillingFlavour = filling.value;  
}
const createOrder = () =>{
        
        state.order.push(icingFlavour, fillingFlavour);
        console.log(state.order);
        
}
    
 

</script>

<template>
    <div class="userInput">
        <input class="__input" type="text" placeholder="Name your nutty boy">
        
        <label for="flavours">Choose your flavour</label>
        <select name="flavours" class="__input" v-model="icing" @click="updateIcing()">
            <option disabled value=null>Please select a flavour</option>
            <option value="0xc71639" >strawberry</option>
            <option value="0x803721">choccy</option>
            <option value="0xedc568">vanilla</option>   
        </select>

        <label for="filling">Fill me up baby</label>
        <select name="filling" class="__input __input-filling" v-model="filling" @click="updateFilling()">
            <option disabled value=null>Please select a filling</option>
            <option value="0x803721">filling1</option>
            <option value="0xedc568">filling2</option>
            <option value="0xc71639">filling3</option>
            <option value="0x000000">No filling</option>
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
     

        <button class="__input" href="#" @click="createOrder()">Save this Nutty man</button>
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