<template>
    <article class="card">
        <div class="image-wrapper">
            <img class="card-image" :src="character.image" />
        </div>
        <div class="card-info">
            <div class="card-name">
                <a class="link" :href="character.url">{{ character.name }}</a>
            </div>
            <div class="card-status-species">
                <span :class="character.status"></span>
                {{ character.status }} - {{ character.species }}
            </div>
            <div class="info-section">
                <span>Last known location:</span>
                <a class="link link-gray" v-if="character.location.url" :href="character.location.url">{{ character.location.name }}</a>
                <span v-else>{{ character.location.name }}</span>
            </div>
            <div class="info-section">
                <span>First seen in:</span>
                <a class="link link-gray" :href="character.episode[0]">Эпизод {{ getEpisodeNum(character.episode[0])}}</a>
            </div>
        </div>
    </article>
</template>

<script setup>
import './CharacterItem.scss';

const props = defineProps({
    character: Object
})

function getEpisodeNum(url) {
    const splitedUrl = url.split('/')
    return splitedUrl[splitedUrl.length - 1]
}
</script>