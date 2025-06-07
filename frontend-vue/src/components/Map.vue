<template>
  <div class="map-container">
    <GoogleMap
      :api-key="apiKey"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 100%;"
    >

    </GoogleMap>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { GoogleMap} from 'vue3-google-map'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const props = defineProps({
  center: Object,
  zoom: Number
})

const mapRef = ref(null)

// Event Listener:
// when the center has been updated, update the map center
// and zoom in
watch(() => props.center, (newCenter) => {
  if (mapRef.value?.mapObject) {
    mapRef.value.mapObject.panTo(newCenter)
    mapRef.value.mapObject.setZoom(7)
  }
})
</script>

<style>
.map-container {
  height: 675px;
  width: 1200px;
}
</style>
