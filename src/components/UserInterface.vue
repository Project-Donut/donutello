<script setup>
//import vue
import { ref, onMounted, reactive, defineProps } from 'vue';
import UserDetails from './UserDetails.vue';
import recipe from '../assets/flavours.json';
//create reactive state to send to api
let state = reactive({ order: [] });
//import json from assets
const flavour = ref(recipe);

const props = defineProps(['model']);
let icingFlavour = ref(null);
let icing = ref(0);
let topping = ref(0);
let toppingFlavour = ref(null);
let crumbleFlavour = ref(null);
let filling = ref(null);
let fillingFlavour = ref(null);
let toppingSelected = ref(null);
let toppingFlavourSelected = ref(null);
let labelImage = ref("");
const updateIcing = (e) => {
    icing.value = flavour.value.glaze.findIndex(icing => icing.taste === e.value.taste);
    if (icing.value !== null) {
        props.model.loadIcing(flavour.value.glaze[icing.value].color);
        icingFlavour = flavour.value.glaze[icing.value].taste;
    }
}
const updateFilling = () => {
    if (filling.value !== null && filling.value !== 4) {
        props.model.loadFilling(flavour.value.filling[filling.value].color);
        fillingFlavour = flavour.value.filling[filling.value].taste;
        props.model.filling.visible = true;
    } else {
        props.model.filling.visible = false;
        fillingFlavour = 'none';
    }
}
const selectTopping = () => {
    const toppingsAll = [props.model.sprinkles, props.model.flakes, props.model.crumble];
    toppingsAll.forEach(topping => { topping.visible = false; });
    if (topping.value !== null && topping.value !== 3) {

        toppingsAll[topping.value].visible = true;
        if (topping.value == 2) {
            document.querySelector('.crumble').style.display = 'block';
            document.querySelector('.topping').style.display = 'none';
        } else {
            document.querySelector('.crumble').style.display = 'none';
            document.querySelector('.topping').style.display = 'block';
        }
        toppingSelected = flavour.value.toppings[topping.value].name;
    }
    else if (topping.value !== null) {
        toppingsAll.forEach(topping => { topping.visible = false; });
        toppingSelected = flavour.value.toppings[topping.value].name;
    }
}
const updateTopping = () => {
    if (toppingFlavour.value !== null && topping.value !== 2) {
        console.log(toppingFlavour.value);

        props.model.loadTopping(flavour.value.sprinkles[toppingFlavour.value].color);
        toppingFlavourSelected = flavour.value.crumble[toppingFlavour.value].name;
    } else if (crumbleFlavour.value !== null) {
        console.log(crumbleFlavour.value);

        props.model.loadCrumble(flavour.value.crumble[crumbleFlavour.value].color);
        toppingFlavourSelected = flavour.value.crumble[crumbleFlavour.value].name;
    }
}

const createOrder = () => {
    state.order.push(icingFlavour, fillingFlavour, toppingSelected, toppingFlavourSelected);
    console.log(state.order);
}

const onUpload = e => {
    const file = e.files[0];
    // file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        labelImage.value = reader.result;
        props.model.loadImage(reader.result);
    };
}

</script>

<template>
    <div class="userInput">
        <input class="__input" type="text" placeholder="Name your nutty boy">

        <label for="flavours">Choose your flavour</label>
        <DropDown :modelValue="flavour.glaze[icing]" :options="flavour.glaze" @change="updateIcing">
            <template #value="slot">
                <div class="option" v-if="slot.value">
                    <div class="option__color" :style="{backgroundColor: slot.value?.color.replace('0x', '#')}"></div>
                    <div>{{ slot.value?.taste }}</div>
                </div>
                <div v-else>{{ slot.placeholder }}</div>
            </template>
            <template #option="{ option }">
                <div class="option">
                    <div class="option__color" :style="{backgroundColor: option?.color.replace('0x', '#')}"></div>
                    <div>{{ option.taste }}</div>
                </div>
            </template>
        </DropDown>
       

        <label for="filling">Fill me up baby</label>
        <select name="filling" class="__input __input-filling" v-model="filling" @click="updateFilling()">
            <option disabled value=null>Please select a flavour</option>
            <option v-for="(flavour, index) in flavour.filling" :value="index">{{ flavour.taste }}</option>
        </select>

        <label for="topping">Selecteer een topping!</label>
        <select name="topping" class="__input __input-topping" v-model="topping" @click="selectTopping()">
            <option disabled value=null>Please select a topping</option>
            <option v-for="(flavour, index) in flavour.toppings" :value="index">{{ flavour.name }}</option>
        </select>

        <div class="topping">
            <label for="toppingFlavour">Welke topping kleur?</label>
            <select name="toppingFlavour" class="__input __input-topping_flavour" v-model="toppingFlavour"
                @click="updateTopping()">
                <option disabled value=null>Please select a flavour</option>
                <option v-for="(flavour, index) in flavour.sprinkles" :value="index">{{ flavour.name }}</option>
            </select>
        </div>

        <div class="crumble">
            <label for="crumbleFlavour">Welke crumble smaak?</label>
            <select name="crumbleFlavour" class="__input __input-crumble_flavour" v-model="crumbleFlavour"
                @click="updateTopping()">
                <option disabled value=null>Please select a flavour</option>
                <option v-for="(flavour, index) in flavour.crumble" :value="index">{{ flavour.name }}</option>
            </select>
        </div>
        <div class="imageUpload">
            <label for="imageUpload">Upload een cool label 😎</label>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="500000" :customUpload="true" @uploader="onUpload" :auto="true"
                chooseLabel="Upload Afbeelding" />
        </div>

        <UserDetails />
        <button class="__input" href="#" @click="createOrder()">Save this Nutty man</button>
    </div>


</template>

<style scoped>
.userInput {
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

.option {
    display: flex;
}

.option .option__color {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    margin-right: 10px;
    background-color: gray;
}
</style>