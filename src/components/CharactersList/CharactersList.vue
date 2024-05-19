<template>
    <div v-if="characterList.length" class="cards">
        <CharacterItem v-for="character in characterList" :key="character.id" :character="character" />
    </div>
    <div v-else class="empty-message">Ничего не найдено</div>
    
</template>

<script setup>
import './CharactersList.scss';
import CharacterItem from '@/components/CharacterItem/CharacterItem.vue';

const props = defineProps({
    characterList: Array,
})
</script>