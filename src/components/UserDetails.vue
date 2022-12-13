<script setup>
import { ref, onMounted, reactive, defineProps } from 'vue';

const displayModal = ref(false);
const openModal = () => {
            displayModal.value = true;
        };
        const closeModal = () => {
            displayModal.value = false;
        }
</script>

<template>

<h5>Modal</h5>
        <Button label="Show" icon="pi pi-external-link" @click="openModal" />
        <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
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