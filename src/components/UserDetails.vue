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
let voornaam = ref(null);
let achternaam = ref(null);
let bedrijf = ref(null);
let mail = ref(null);
let tel = ref(null);
let adresLever1 = ref(null);
let adresLever2 = ref(null);
let customer = reactive({
    order: [
        { voornaam: null },
        { achternaam: null },
        { bedrijf: null },
        { mail: null },
        { tel: null },
        { adresLever1: null },
        { adresLever2: null }

    ]
});
const printCustomer = () => {
    console.log(customer);
}
</script>

<template>


    <Button label="Ga naar bestellen" icon="pi pi-chevron-right" @click="openModal" />
    <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true">
        <h4>Sale</h4>
        <p>lorem text bevestig bestelling met gegevens</p>
        <div class="__userData">
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Voornaam</h5>
                    <InputText type="text" v-model="voornaam" />
                    <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
                </div>
                <div class="__inputText">
                    <h5>Achternaam</h5>
                    <InputText type="text" v-model="achternaam" />
                    <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Bedrijf*</h5>
                    <span class="p-float-label">
                        <InputText id="bedrijf" type="text" v-model="bedrijf" />
                        <label for="bedrijf">Optioneel</label>
                    </span>
                </div>
                <div class="__inputText">
                    <h5>E-mail adres</h5>
                    <span class="p-float-label">
                        <InputText id="mail" type="text" v-model="mail" />
                        <label for="mail">example@gmail.com</label>
                    </span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Telefoonnummer</h5>
                    <InputText type="text" v-model="tel" />
                    <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Lever adres 1</h5>
                    <span class="p-float-label">
                        <InputText id="adresLever1" type="text" v-model="adresLever1" />
                        <label for="adresLever1">straat naam</label>
                    </span>
                </div>
                <div class="__inputText">
                    <h5>Lever adres 2</h5>
                    <span class="p-float-label">
                        <InputText id="adresLever2" type="text" v-model="adresLever2" />
                        <label for="adresLever2">postcode + stad</label>
                    </span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Factuur adres 1</h5>
                    <span class="p-float-label">
                        <InputText id="factuurLever1" type="text" v-model="factuurLever1" />
                        <label for="factuurLever1">{{ adresLever1 }}</label>
                    </span>
                </div>
                <div class="__inputText">
                    <h5>Factuur adres 2</h5>
                    <span class="p-float-label">
                        <InputText id="factuurLever2" type="text" v-model="factuurLever2" />
                        <label for="factuurLever2">{{ adresLever2 }}</label>
                    </span>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
            <Button label="Bestel" icon="pi pi-check" @click="printCustomer" autofocus />
        </template>
    </Dialog>

</template>


<style scoped>
.__userData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
}

.__inputGroup {
    display: flex;
    flex-direction: row;

    margin: 1rem;
}

.__inputText {
    display: block;
    margin-left: 1rem;
}

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

.p-dialog-content {
    display: flex;
    justify-content: center;
}
</style>