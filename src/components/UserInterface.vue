<script setup>
//import vue
import { ref, onMounted, reactive, defineProps } from 'vue';
import recipe from '../assets/flavours.json';
//create reactive state to send to api
let state = reactive({ order: [] });
//import json from assets
const flavour = ref(recipe);

const props = defineProps(['model']);
let icingFlavour = ref(null);
let icing = ref(null);
let topping = ref(0);
let toppingFlavour = ref(null);
let crumbleFlavour = ref(null);
let filling = ref('0xffffff');
let fillingFlavour = ref(null);
let toppingSelected = ref(null);
let toppingFlavourSelected = ref(null);
const updateIcing = () => {
    if (icing.value !== null) {
        props.model.loadIcing(flavour.value.glaze[icing.value].color);
        icingFlavour = flavour.value.glaze[icing.value].taste;
    }
    
    
    
}
const updateFilling = () => {
    if (filling.value && filling.value !== '0x000000') {
        props.model.loadFilling(ref(filling.value));
        props.model.filling.visible = true;
    } else {
        props.model.filling.visible = false;
    }
    console.log(filling + ' is the filling flavour')
    fillingFlavour = filling.value;
}
const selectTopping = () => {
    const toppingsAll = [props.model.sprinkles, props.model.flakes, props.model.crumble ];
    toppingsAll.forEach(topping => { topping.visible = false; });
    if (topping.value != 3) {
        toppingsAll[topping.value].visible = true;
        if(topping.value == 2){
            document.querySelector('.crumble').style.display = 'block';
            document.querySelector('.topping').style.display = 'none';
        }else{
            document.querySelector('.crumble').style.display = 'none';
            document.querySelector('.topping').style.display = 'block';
        }
    }
     else {
        toppingsAll.forEach(topping => {
            topping.visible = false;
        });
        console.log(topping + ' is the topping')
        toppingSelected = toppingsAll[topping.value].value;
    }
}
const updateTopping = () => {
    if (toppingFlavour.value && topping.value != 2) {
        console.log(toppingFlavour.value);

        props.model.loadTopping(ref(toppingFlavour.value));
    } else if (crumbleFlavour.value) {
        console.log(crumbleFlavour.value);

        props.model.loadCrumble(ref(crumbleFlavour.value));
    }
    console.log(toppingFlavour + ' is the topping flavour')
    toppingFlavourSelected = toppingFlavour;
}

const createOrder = () => {

    state.order.push(icingFlavour, fillingFlavour, toppingSelected, toppingFlavourSelected);
    console.log(state.order);

}




</script>

<template>
    <div class="userInput">
        <input class="__input" type="text" placeholder="Name your nutty boy">

        <label for="flavours">Choose your flavour</label>
        <select name="flavours" class="__input" v-model="icing" @click="updateIcing()">
            <option disabled value=null>Please select a flavour</option>
            <option v-for="(flavour, index) in flavour.glaze" :value="index">{{ flavour.taste }}</option>
        </select>

        <label for="filling">Fill me up baby</label>
        <select name="filling" class="__input __input-filling" v-model="filling" @click="updateFilling()">
            <option disabled value=null>Please select a flavour</option>
            <option v-for="flavour in flavour.filling" :value="flavour.color">{{ flavour.taste }}</option>
        </select>

        <label for="topping">Selecteer een topping!</label>
        <select name="topping" class="__input __input-topping" v-model="topping" @click="selectTopping()">
            <option selected value=0>Sprinkles</option>
            <option value=1>Flakes</option>
            <option value=2>Crumble</option>
            <option value=3>Geen topping</option>
        </select>

        
            <div class="topping">
                <label for="toppingFlavour">Welke topping kleur?</label>
                <select name="toppingFlavour" class="__input __input-topping_flavour" v-model="toppingFlavour"
                    @click="updateTopping()">
                    <option disabled value=null>Please select a flavour</option>
                    <option v-for="flavour in flavour.sprinkles" :value="flavour.color">{{ flavour.name }}</option>
                </select>
            </div>
        
        
            <div class="crumble">
                <label for="crumbleFlavour">Welke crumble smaak?</label>
                <select name="crumbleFlavour" class="__input __input-crumble_flavour" v-model="crumbleFlavour"
                    @click="updateTopping()">
                    <option disabled value=null>Please select a flavour</option>
                    <option v-for="flavour in flavour.crumble" :value="flavour.color">{{ flavour.name }}</option>
                </select>
            </div>
        



        <button class="__input" href="#" @click="createOrder()">Save this Nutty man</button>
    </div>


</template>

<style scoped>
.userInput {
    overflow: scroll;
    background-color: aliceblue;
    width: 100%;
    padding: 1em;


}

.__input {
    display: block;

    width: 90%;
    height: 50px;
    margin: 10px;
    margin-bottom: 2em;
    border: 2px solid white;
    border-radius: 5px;

}

.topping {
    display: 1;
}

.crumble {
    display: none;
}
</style>