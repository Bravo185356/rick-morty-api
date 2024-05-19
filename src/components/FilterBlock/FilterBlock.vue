<template>
    <aside class="filter">
        <form class="filter-form">
            <h3 class="filter-title">Фильтр</h3>
            <div class="filter-block">
                <Input v-model="nameInput" placeholder="Введите имя" />
            </div>
            <div class="filter-block">
            </div>
            <div class="filter-block radio-block">
                <div class="radio">
                    <input id="alive" v-model="statusInput" name="status" type="radio" value="Alive"  />
                    <label for="alive">Alive</label>
                </div>
                <div class="radio">
                    <input id="dead" v-model="statusInput" name="status" type="radio" value="Dead" />
                    <label for="dead">Dead</label>
                </div>
                <div class="radio">
                    <input id="unknown" v-model="statusInput" name="status" type="radio" value="Unknown" />
                    <label for="unknown">Unknown</label>
                </div>
            </div>
            <button @click.prevent="getFilteredList" type="submit" class="button">Применить</button>
            <button @click="resetFilter" v-if="filterApplies" class="button reset-filter">Сбросить</button>
        </form>
    </aside>
</template>

<script setup>
    import { ref } from 'vue';
    import './FilterBlock.scss';
    import Input from '@/UI/Input/Input.vue';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter()

    const emit = defineEmits(['updateList', 'resetFilter'])

    const nameInput = ref('')
    const statusInput = ref('')
    const filterApplies = ref(false)

    function resetFilter() {
        nameInput.value = ''
        statusInput.value = ''
        emit('resetFilter')
        filterApplies.value = false
        router.push({ path: '/', query: { page: 1 }})
    }

    async function getFilteredList() {
        if (!nameInput.value && !statusInput.value) {
            emit('resetFilter')
            filterApplies.value = false
            return
        }

        const filterParams = {
            page: 1,
        }

        if(nameInput.value) {
            filterParams.name = nameInput.value
        }
        if(statusInput.value) {
            filterParams.status = statusInput.value
        }

        router.push({ path: '/', query: filterParams })
        filterApplies.value = true
        emit('updateList', filterParams)
    }
</script>