<template>
  <div class="whole-page">
    <header>
      <h1>Location Selector</h1>
    </header>

    <main>
      <Input @area-selected="updateCenter" />
      <Map :center="center" :zoom="zoom"/>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Map from './components/Map.vue'
import Input from './components/Input.vue'

const center = ref({ lat: 37, lng: -95 }) 
const zoom = ref(4) 

function updateCenter(newLocation) {
  center.value = newLocation
  zoom.value = 7
}
</script>

<style>
.whole-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header {
  padding: 1rem;
  text-align: center;
}

main {
  padding: 1rem;
  height: calc(100vh - 100px);
}
</style>