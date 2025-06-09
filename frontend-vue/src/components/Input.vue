<template>
    <a-auto-complete v-model:value="inputText" :options="stateOptionsBoldedChars" placeholder="Go to..."
        style="width: 300px" @select="handleSelect" @search="onSearch">
        <template #option="{ value, label }">
            <div v-html="label" />
        </template>
    </a-auto-complete>
</template>

<script setup>
import { ref, computed } from 'vue'


const inputText = ref('')
const stateOptions = ref([])
const emit = defineEmits(['area-selected'])

// send graphQL query to Apollo Server
// get stateOptions: containing statename, latitude, longitude
const onSearch = async (keyword) => {
    if (!keyword) {
        stateOptions.value = []
        return
    }

    const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
          query($filter: String) {
            states(filter: $filter) {
              name
              lat
              lng
            }
          }
        `,
            variables: { filter: keyword }
        })
    })

    const result = await res.json()
    stateOptions.value = result.data.states
}

// fill the options in the dropdown
// bold the matched characters in the input textbox
const stateOptionsBoldedChars = computed(() => {
    if (!inputText.value) return []
    const safeKeyword = inputText.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(safeKeyword, 'gi')

    return stateOptions.value.map((s) => ({
        value: s.name,
        label: s.name.replace(regex, (match) => `<b>${match}</b>`)
    }))
})

// when user selected an option
// emit the 'area-selected' event to the Input component
// updateCenter will help to update the new center and zoom in
function handleSelect(stateName) {
    const selected = stateOptions.value.find((s) => s.name === stateName)
    if (selected) {
        emit('area-selected', { lat: selected.lat, lng: selected.lng })
    }
}
</script>

<style>
a-auto-complete {
    height: 64px;
}

b {
    font-weight: bold;
}
</style>