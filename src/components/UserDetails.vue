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
let checked = ref(true);

let customer = reactive({
    voornaam: '',
    achternaam: '',
    bedrijf: '',
    mail: '',
    tel: '',
    adresLever1: '',
    adresLever2: '',
    factuurLever1: '',
    factuurLever2: ''
});

const setFactuurAdres = () => {
    if (checked.value) {
        customer.factuurLever1 = customer.adresLever1;
        customer.factuurLever2 = customer.adresLever2;
    } else {
        customer.factuurLever1 = '';
        customer.factuurLever2 = '';
    }
}
const printCustomer = () => {
    if(checked.value){
        customer.factuurLever1 = customer.adresLever1;
        customer.factuurLever2 = customer.adresLever2;
    }
    console.log(customer);
}
onMounted(() => {
    setFactuurAdres();
});
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
                    <InputText type="text" v-model="customer.voornaam" />
                    <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
                </div>
                <div class="__inputText">
                    <h5>Achternaam</h5>
                    <InputText type="text" v-model="customer.achternaam" />
                    <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Bedrijf*</h5>
                    <span class="p-float-label">
                        <InputText id="bedrijf" type="text" v-model="customer.bedrijf" />
                        <label for="bedrijf">Optioneel</label>
                    </span>
                </div>
                <div class="__inputText">
                    <h5>E-mail adres</h5>
                    <span class="p-float-label">
                        <InputText id="mail" type="text" v-model="customer.mail" />
                        <label for="mail">example@gmail.com</label>
                    </span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Telefoonnummer</h5>
                    <InputText type="text" v-model="customer.tel" />
                    <span :style="{ marginLeft: '.5em' }">{{ value1 }}</span>
                </div>
            </div>
            <div class="__inputGroup">
                <div class="__inputText">
                    <h5>Lever adres 1</h5>
                    <span class="p-float-label">
                        <InputText id="adresLever1" type="text" v-model="customer.adresLever1" />
                        <label for="adresLever1">straat naam</label>
                    </span>
                </div>
                <div class="__inputText">
                    <h5>Lever adres 2</h5>
                    <span class="p-float-label">
                        <InputText id="adresLever2" type="text" v-model="customer.adresLever2" />
                        <label for="adresLever2">postcode + stad</label>
                    </span>
                </div>
            </div>
            <h5>Zelfde als lever adres</h5>
                    <InputSwitch v-model="checked" @change="setFactuurAdres" />
                    
            <div class="__inputGroup" v-if="!checked">
               
                <div class="__inputText">
                    <h5>Factuur adres 1</h5>
                    <span class="p-float-label">
                        <InputText id="factuurLever1" type="text" v-model="customer.factuurLever1" />
                        <label for="factuurLever1">{{ adresLever1 }}</label>
                    </span>
                </div>
                <div class="__inputText">
                    <h5>Factuur adres 2</h5>
                    <span class="p-float-label">
                        <InputText id="factuurLever2" type="text" v-model="customer.factuurLever2" />
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