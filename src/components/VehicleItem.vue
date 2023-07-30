<script setup>
import { ref, defineProps } from 'vue';

// Define the props explicitly using defineProps
const props = defineProps(['vehicle', 'favourites']);

// Create a reactive variable to track whether the vehicle is in the favourites list
const isFavourite = ref(props.favourites.includes(props.vehicle.Url));

// Function to toggle the vehicle's favourite status
const toggleFavourite = () => {
  // If the vehicle is already a favourite, remove it from the list
  if (isFavourite.value) {
    const index = props.favourites.indexOf(props.vehicle.Url);
    if (index !== -1) {
      props.favourites.splice(index, 1);
    }
  } else {
    // If the vehicle is not a favourite, add it to the list
    props.favourites.push(props.vehicle.Url);
  }

  // Update the local isFavourite state to reflect the new status
  isFavourite.value = !isFavourite.value;
};
</script>

<template>
    <div class="Vehicle">
        <span v-if="vehicle.Website">BUY</span>
        <button @click="$emit('get-vehicle-info', vehicle)">info</button>
        <input type="checkbox" :value="vehicle.Url" :checked="isFavourite" @change="toggleFavourite" />
        <img class="Vehicle__image" :src="`images/${vehicle.Url}.jpg`" :alt="vehicle.Name" />
        <h2 class="Vehicle__name">{{ vehicle.Name }}</h2>
    </div>
</template>
