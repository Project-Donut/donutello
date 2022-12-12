<script setup>
//import vue
import {ref, onMounted, reactive, defineProps} from 'vue';
import recipe from '../assets/flavours.json';
//create reactive state to send to api
let state = reactive({order: []});
//import json from assets
const flavour = ref(recipe);

const props = defineProps(['model']);
let icingFlavour = ref(null);
let icing = ref(null);
let topping = ref(0);
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
const selectTopping = () => {
    const toppings=[ props.model.sprinkles,props.model.flakes, props.model.crumble];
    if(topping.value != 3){
    toppings.forEach(topping => {
        topping.visible = false;
    });
    toppings[topping.value].visible = true;
    }
         else{
    toppings.forEach(topping => {
        topping.visible = false;
    });
 } 
    }
const createOrder = () =>{
        
        state.order.push(icingFlavour, fillingFlavour);
        console.log(state.order);
        
}
    
 onMounted(() => {
    console.log(flavour.value.glaze[2]);
    })
 

</script>

<template>
    <div class="userInput">
        <input class="__input" type="text" placeholder="Name your nutty boy">
        
        <label for="flavours">Choose your flavour</label>
        <select name="flavours" class="__input" v-model="icing" @click="updateIcing()">
            <option disabled value=null>Please select a flavour</option>
            <option v-for="flavour in flavour.glaze" :value="flavour.color">{{flavour.taste}}</option> 
        </select>

        <label for="filling">Fill me up baby</label>
        <select name="filling" class="__input __input-filling" v-model="filling" @click="updateFilling()">
            <option disabled value=null>Please select a flavour</option>
            <option v-for="flavour in flavour.filling" :value="flavour.color">{{flavour.taste}}</option>
        </select>

        <label for="topping">Selecteer een topping!</label>
        <select name="topping" class="__input __input-topping" v-model="topping" @click="selectTopping()">
            <option selected value=0>Sprinkles</option>
            <option value=1>Flakes</option>
            <option value=2>Crumble</option>
            <option value=3>Geen topping</option>
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