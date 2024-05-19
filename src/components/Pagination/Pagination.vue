<template>
    <div  class="pagination-wrapper">
        <div v-if="totalPages" class="pagination-controls">
            <button @click="changePage(1)" :disabled="currentPage === 1" class="pagination-button"><<</button>
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-button"><</button>
            <div class="pages">
                <div @click="changePage(page)" :class="{ 'current-page': currentPage === page }"
                    v-for="page in pageNums" class="page" :key="page">{{ page }}
                </div>
            </div>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="pagination-button">></button>
            <button @click="changePage(totalPages)" :disabled="currentPage === totalPages" class="pagination-button">>></button>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import './Pagination.scss';
import { computed, ref } from 'vue';

const emit = defineEmits(['updateCurrentPage'])

const route = useRoute()
const router = useRouter()

const props = defineProps({
    totalPages: Number,
    currentPage: Number
})

const maxPages = ref(5)

function changePage(page) {
    router.push({ path: '/', query: {...route.query, page }})
    emit('updateCurrentPage', page)
}

const pageNums = computed(() => {
    const pages = [];
    const numItemsLeftRightSide = Math.floor(maxPages.value / 2)
    // numItemsLeftRightSide - значение, которое указывает, сколько элементов находится с левой и правой сторон 
    // с помощью этого числа отсчёт страниц будет начинаться со страницы, которая перед currentPage
    // например, при maxPages = 5 и currentPage = 3 отрисовка начнётся со страницы 1, т.к. Math.floor(maxPages / 2) = 2, currentPage - 2 = 1
    if(props.totalPages <= maxPages.value) {
        for(let i = 1; i <= props.totalPages; i++) {
            pages.push(i)
        }
    } else {
       for (let i = numItemsLeftRightSide; pages.length < maxPages.value; i--) {
           if (props.totalPages - props.currentPage < numItemsLeftRightSide) {
                // Если количество итемов с правой стороны больше, чем оставшихся страниц, то вычисляем номер страницы с которой будет отрисовка
               const startNumber = props.totalPages - maxPages.value + pages.length + 1
               pages.push(startNumber)
           } else if (props.currentPage - i > 0) {
               // Отбрасываем все значения меньше 0
               pages.push(props.currentPage - i)
           }
       }
    }

    return pages
})
</script>