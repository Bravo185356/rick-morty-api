<template>
    <div class="wrapper">
        <FilterBlock @update-list="updateCharacterList" @reset-filter="currentPage = 1" />
        <div class="content">
            <Pagination @update-current-page="changePage" :totalPages="totalPages" :currentPage="currentPage" />
            <CharactersList :characterList="characterList" :totalPages="totalPages" />
        </div>
    </div>
</template>
<script setup>
import CharactersList from '@/components/CharactersList/CharactersList.vue';
import FilterBlock from '@/components/FilterBlock/FilterBlock.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import { onMounted, ref, watch } from 'vue';
import { Api } from '@/api/api.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const characterList = ref([])
const totalPages = ref(null)
const currentPage = ref(1)
const showEmptyListMessage = ref(false)

async function getCharacterList() {
    let queryString = getQueryString();
    
    const characters = await Api.getCharacters(queryString)

    if(characters.error) {
        totalPages.value = null
        currentPage.value = 1
        showEmptyListMessage.value = true
        characterList.value = []
        return
    }

    showEmptyListMessage.value = false
    totalPages.value = characters.info.pages
    characterList.value = characters.results
}

function getQueryString() {
    let queryString = ''

    for (const key in route.query) {
       queryString += `${key}=${route.query[key]}&`
    }

    queryString = queryString.slice(0, -1)
    return queryString
}

function changePage(newPage) {
    currentPage.value = newPage
}

function updateCharacterList() {
    currentPage.value = 1
}

watch(() => route.query, () => {
    getCharacterList()
})

onMounted(() => {
    router.push({ path: '/', query: { page: 1 }})
    getCharacterList({ page: 1 })
})
</script>
