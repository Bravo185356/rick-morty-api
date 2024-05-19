<template>
    <input class="input" v-model="inputValue" :placeholder="placeholder" type="text" />
</template>

<script setup>
import './Input.scss';

const inputValue = defineModel()

const props = defineProps({
    placeholder: String
})
</script>