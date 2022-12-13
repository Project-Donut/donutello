<script setup>
//import vue
import { ref, reactive, defineProps } from 'vue';
import UserDetails from './UserDetails.vue';
import recipe from '../assets/flavours.json';

//import json from assets
const flavour = ref(recipe);

const props = defineProps(['model']);
let selectedIcing = ref(0);
let selectedFilling = ref(3);
let selectedToppingType = ref(1);
let selectedSprinkleFlavor = ref(0);
let selectedCrumbleFlavor = ref(0);
let labelImage = ref("");

const donutDetails = reactive({
    icing: flavour.value.glaze[selectedIcing.value].taste,
    filling: flavour.value.filling[selectedFilling.value].taste,
    topping: flavour.value.toppings[selectedToppingType.value].name,
    toppingFlavor: flavour.value.sprinkles[selectedSprinkleFlavor.value].name,
    crumbleFlavor: flavour.value.crumble[selectedCrumbleFlavor.value].name,
    image: '',
})

const onChangeIcing = (e) => {
    selectedIcing.value = flavour.value.glaze.findIndex(icing => icing.taste === e.value.taste);
    donutDetails.icing = flavour.value.glaze[selectedIcing.value].taste;
    if (selectedIcing.value !== null) {
        props.model.loadIcing(flavour.value.glaze[selectedIcing.value].color);
    }
}

const onChangeFilling = (e) => {
    selectedFilling.value = flavour.value.filling.findIndex(fill => fill.taste === e.value.taste);
    donutDetails.filling = flavour.value.filling[selectedFilling.value].taste;
    if (flavour.value.filling[selectedFilling.value].taste !== 'Geen') {
        props.model.loadFilling(flavour.value.filling[selectedFilling.value].color);
        props.model.filling.visible = true;
    } else {
        props.model.filling.visible = false;
    }
}

const onChangeToppingType = e => {
    selectedToppingType.value = flavour.value.toppings.findIndex(topping => topping.name === e.value.name);
    donutDetails.topping = flavour.value.toppings[selectedToppingType.value].name;
    const toppingsAll = [props.model.sprinkles, props.model.flakes, props.model.crumble];
    toppingsAll.forEach(topping => { topping.visible = false; });

    if (flavour.value.toppings[selectedToppingType.value].name !== 'Geen') {
        toppingsAll[selectedToppingType.value - 1].visible = true;
    }
}

const onChangeToppingFlavor = e => {
    let toppingType = flavour.value.toppings[selectedToppingType.value].name;
    if (toppingType === 'Geen') return;

    if (toppingType === 'Sprinkles' || toppingType === 'Flakes') {
        selectedSprinkleFlavor.value = flavour.value.sprinkles.findIndex(taste => taste.name === e.value.name);
        donutDetails.toppingFlavor = flavour.value.sprinkles[selectedSprinkleFlavor.value].name;
        props.model.loadTopping(flavour.value.sprinkles[selectedSprinkleFlavor.value].color);
    }
    else if (toppingType === 'Crumble') {
        selectedCrumbleFlavor.value = flavour.value.crumble.findIndex(taste => taste.name === e.value.name);
        donutDetails.toppingFlavor = flavour.value.crumble[selectedCrumbleFlavor.value].name;
        props.model.loadCrumble(flavour.value.crumble[selectedCrumbleFlavor.value].color);
    }
}

const onUpload = e => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        donutDetails.image = reader.result;
        props.model.loadImage(reader.result);
    };
}

</script>

<template>
    <div class="userInput">
        <div class="__input--group">
            <label for="flavours">Welke glazuur wil je?</label>
            <DropDown :modelValue="flavour.glaze[selectedIcing]" :options="flavour.glaze" @change="onChangeIcing">
                <template #value="slot">
                    <div class="option" v-if="slot.value">
                        <div class="option__color" :style="{ backgroundColor: slot.value?.color.replace('0x', '#') }">
                        </div>
                        <div>{{ slot.value?.taste }}</div>
                    </div>
                </template>
                <template #option="{ option }">
                    <div class="option">
                        <div class="option__color" :style="{ backgroundColor: option?.color.replace('0x', '#') }"></div>
                        <div>{{ option.taste }}</div>
                    </div>
                </template>
            </DropDown>
            <label for="filling">Wat zit er in verstopt?</label>
            <DropDown :modelValue="flavour.filling[selectedFilling]" :options="flavour.filling"
                @change="onChangeFilling">
                <template #value="slot">
                    <div class="option" v-if="slot.value">
                        <div class="option__color" :style="{ backgroundColor: slot.value?.color.replace('0x', '#') }">
                        </div>
                        <div>{{ slot.value?.taste }}</div>
                    </div>
                </template>
                <template #option="{ option }">
                    <div class="option">
                        <div class="option__color" :style="{ backgroundColor: option?.color.replace('0x', '#') }"></div>
                        <div>{{ option.taste }}</div>
                    </div>
                </template>
            </DropDown>
            <label for="topping">Strooi er wat over!</label>
            <DropDown :modelValue="flavour.toppings[selectedToppingType]" :options="flavour.toppings"
                @change="onChangeToppingType">
                <template #value="option">{{ option?.value.name }}</template>
                <template #option="{ option }">{{ option?.name }}</template>
            </DropDown>
            <template v-if="selectedToppingType === 1 || selectedToppingType === 2">
                <label for="toppingFlavour">Welke topping kleur?</label>
                <DropDown :modelValue="flavour.sprinkles[selectedSprinkleFlavor]" :options="flavour.sprinkles"
                    @change="onChangeToppingFlavor">
                    <template #value="slot">
                        <div class="option" v-if="slot.value">
                            <div class="option__color"
                                :style="{ backgroundColor: slot.value?.color.replace('0x', '#') }">
                            </div>
                            <div>{{ slot.value?.name }}</div>
                        </div>
                    </template>
                    <template #option="{ option }">
                        <div class="option">
                            <div class="option__color" :style="{ backgroundColor: option?.color.replace('0x', '#') }">
                            </div>
                            <div>{{ option.name }}</div>
                        </div>
                    </template>
                </DropDown>
            </template>
            <template v-if="selectedToppingType === 3">
                <label for="toppingFlavour">Welke crumble smaak?</label>
                <DropDown :modelValue="flavour.crumble[selectedCrumbleFlavor]" :options="flavour.crumble"
                    @change="onChangeToppingFlavor">
                    <template #value="slot">
                        <div class="option" v-if="slot.value">
                            <div class="option__color"
                                :style="{ backgroundColor: slot.value?.color.replace('0x', '#') }">
                            </div>
                            <div>{{ slot.value?.name }}</div>
                        </div>
                    </template>
                    <template #option="{ option }">
                        <div class="option">
                            <div class="option__color" :style="{ backgroundColor: option?.color.replace('0x', '#') }">
                            </div>
                            <div>{{ option.name }}</div>
                        </div>
                    </template>
                </DropDown>
            </template>
            <div class="imageUpload">
                <label for="imageUpload">Upload een cool label 😎</label>
                <FileUpload mode="basic" class="p-button-outlined" accept="image/*" :maxFileSize="500000"
                    :customUpload="true" @uploader="onUpload" :auto="true" chooseLabel="Upload Afbeelding" />
            </div>
        </div>

        <UserDetails :donutDetails="donutDetails" />
    </div>
</template>

<style scoped>
label {
    font-size: 1em;
    margin-bottom: 0.25em;
    margin-top: 0.75em;
    display: block;
}

.userInput {
    width: 100%;
    height: 100%;
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

.__input--group {
    display: flex;
    flex-direction: column;
    padding-bottom: 8em;
}

.option {
    display: flex;
    line-height: 140%;
}

.option .option__color {
    width: 1.5em;
    height: 1.5em;
    border: 2px solid rgba(33, 37, 41, 0.25);
    border-radius: 50%;
    margin-right: 10px;
}

@media screen and (max-width: 768px) {
    .__input--group {
        padding-bottom: 4em;
    }
    .userInput {
        height: fit-content;
        margin-top: 100vw;
        background-color: var(--surface-100);
        border-radius: 1em 1em 0 0;
        border: 1px solid var(--surface-400);
        box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
    }
}
</style>