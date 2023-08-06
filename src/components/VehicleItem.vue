<script setup>
import { ref, defineProps } from 'vue'
import IconFav from './icons/IconFav.vue'
import IconInfo from './icons/IconInfo.vue'
import IconLoading from './icons/IconLoading.vue'
import IconMoney from './icons/IconMoney.vue'

// Define the props explicitly using defineProps
const props = defineProps(['vehicle', 'favourites'])

// Create a reactive variable to track whether the vehicle is in the favourites list
const isFavourite = ref(props.favourites.includes(props.vehicle.Url))

// Function to toggle the vehicle's favourite status
const toggleFavourite = () => {
  // If the vehicle is already a favourite, remove it from the list
  if (isFavourite.value) {
    const index = props.favourites.indexOf(props.vehicle.Url)
    if (index !== -1) {
      props.favourites.splice(index, 1)
    }
  } else {
    // If the vehicle is not a favourite, add it to the list
    props.favourites.push(props.vehicle.Url)
  }

  // Update the local isFavourite state to reflect the new status
  isFavourite.value = !isFavourite.value
}
</script>

<template>
    <div class="Vehicle">
      <div class="Vehicle__inner">
        <div class="Vehicle__icongroup">
          <button class="Vehicle__icon" @click="$emit('get-vehicle-info', vehicle)">
            <IconInfo/>
          </button>
          <label :class="`Vehicle__icon Vehicle__icon--fav ${isFavourite? 'Vehicle__icon--fav-selected' : ''}`">
            <input class="sr-only" type="checkbox" :value="vehicle.Url" :checked="isFavourite" @change="toggleFavourite" />
            <IconFav/>
          </label>
          <span class="Vehicle__icon Vehicle__icon--buy" v-if="vehicle.Website">
            <IconMoney/>
          </span>
        </div>
        <img class="Vehicle__image" :src="`images/${vehicle.Url}.jpg`" :alt="vehicle.Name" />
        <h2 class="Vehicle__name">{{ vehicle.Name }}</h2>
      </div>
      <IconLoading />
    </div>
</template>

<style lang="scss">
  .Vehicle {
      aspect-ratio: 200/113;
      background-color: var(--col-greylight);
      border-radius: 3px;
      overflow: hidden;
      position: relative;
  }

  .Vehicle__inner {
      aspect-ratio: 200/113;
      position: relative;
      z-index: 2;
  }

  .Vehicle__image {
      display: block;
      height: auto;
      width: 100%;
  }

  .Vehicle__icongroup {
      align-items: center;
      display: flex;
      gap: 6px;
      left: 0;
      padding: 5px;
      position: absolute;
      top: 0;
      width: 100%;
  }

  .Vehicle__icon {
      background-color: rgba(255,255,255, .8);
      border: 0;
      border-radius: 50%;
      box-shadow: 1px 1px 2px var(--col-black);
      box-sizing: border-box;
      display: inline-block;
      height: 30px;
      padding: 5px;
      width: 30px;

      &:hover {
          cursor: pointer;
      }
  }

  .Vehicle__icon--buy {
      align-self: flex-end;
      background-color: var(--col-goldtransparent);

      &:hover {
          cursor: default
      }
  }

  .Vehicle__icon--fav-selected {
      background-color: var(--col-hotpink);

      .Icon__fav {
          color: var(--col-white);
      }
  }

  .Vehicle__name {
      background-image: linear-gradient(to top, rgba(0,0,0,0.6) 30% , rgba(0,0,0,0) 100%);
      bottom: 0;
      color: var(--col-white);
      display: block;
      font-size: 14px;
      left: 0;
      margin: 0;
      padding: 20px 8px 8px 8px;
      position: absolute;
      right: 0;
      text-shadow: 1px 1px 1px rgba(0,0,0, 0.8);
  }
</style>