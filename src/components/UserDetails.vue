<script setup>
import { ref, onMounted, reactive, defineProps } from 'vue';
const props = defineProps(['donutDetails']);
const displayModal = ref(false);
const openModal = () => {
    displayModal.value = true;
    console.log(props.donutDetails);
};
const closeModal = () => {
    displayModal.value = false;
}
let adresLever1 = ref(null);
let adresLever2 = ref(null);
</script>

<template>


    <Button label="Ga naar bestellen" icon="pi pi-chevron-right" @click="openModal" />
        <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" :modal="true">
            <h4>Sale</h4>
            <p>lorem text bevestig bestelling met gegevens</p>
            <h5>Voornaam</h5>
                <InputText type="text" v-model="voornaam" />
                <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
            <h5>Achternaam</h5>
                <InputText type="text" v-model="Achternaam" />
                <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
            <h5>Bedrijf*</h5>
                <span class="p-float-label">
                <InputText id="bedrijf" type="text" v-model="bedrijf" />
                <label for="bedrijf">Optioneel</label>
                </span>
            <h5>E-mail adres</h5>
                <span class="p-float-label">
                <InputText id="mail" type="text" v-model="mail" />
                <label for="mail">example@gmail.com</label>
                </span>
            <h5>Telefoonnummer</h5>
                <InputText type="text" v-model="tel" />
                <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
            <h5>Lever adres 1</h5>
                <span class="p-float-label">
                <InputText id="adresLever1" type="text" v-model="adresLever1" />
                <label for="adresLever1">straat naam</label>
                </span>
            <h5>Lever adres 2</h5>
                <span class="p-float-label">
                <InputText id="adresLever2" type="text" v-model="adresLever2" />
                <label for="adresLever2">postcode + stad</label>
                </span>
            <h5>Factuur adres 1</h5>
                <span class="p-float-label">
                <InputText id="factuurLever1" type="text" v-model="factuurLever1" />
                <label for="factuurLever1">{{adresLever1}}</label>
                </span>
            <h5>Factuur adres 2</h5>
                <span class="p-float-label">
                <InputText id="factuurLever2" type="text" v-model="factuurLever2" />
                <label for="factuurLever2">{{adresLever2}}</label>
                </span>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                <Button label="Bestel" icon="pi pi-check" @click="closeModal" autofocus />
            </template>
        </Dialog>

</template>


<style scoped>
.p-button {
    margin: 0.3rem .5rem;
    min-width: 10rem;
}

p {
    margin: 0;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-dialog .p-button {
    min-width: 6rem;
}
</style>