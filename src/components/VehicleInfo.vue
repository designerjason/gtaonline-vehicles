<script setup>
import { ref, defineProps, watchEffect } from 'vue'
import IconClose from '../components/icons/IconClose.vue'
const props = defineProps(['currentVehicle', 'showModal'])
const vehicleInfo = ref(null)

// Create a ref to store the previous value of the prop
const previousValue = ref(props.showModal)

// Define a watcher to trigger a function when the prop value changes
watchEffect(() => {
  // Compare the previous value with the current value
  if (previousValue.value !== props.showModal) {
    // Call your function here

    if(props.showModal === true) {
        vehicleInfo.value.showModal()
    } else {
        vehicleInfo.value.close()
    }

    // Update the previous value with the new value
    previousValue.value = props.showModal;
  }
})
</script>
<template>
    <dialog ref="vehicleInfo" class="VehicleInfo">
        <div class="VehicleInfo__inner">
            <button class="VehicleInfo__close" @click="$emit('close-modal')">
                <span class="sr-only">Close dialog</span>
                <IconClose />
            </button>
            <div v-if="currentVehicle" class="VehicleInfo__details">
                <h2 class="VehicleInfo__name">{{ currentVehicle.Name }}</h2>
                <img class="VehicleInfo__image" :src=" `images/${currentVehicle.Url}.jpg`" :alt="currentVehicle.Name" />
                <div class="VehicleInfo__stats">
                    <div>
                        <strong class="VehicleInfo__type">{{ currentVehicle.Type }}</strong>
                        <strong>Seats:</strong> {{ currentVehicle.Seats }}
                    </div>

                    <div>
                        <table class="VehicleInfo__table">
                            <tr><th>Speed</th><td>{{ Math.round(currentVehicle.Speed) }}</td></tr>
                            <tr><th>Acceleration</th><td>{{ Math.round(currentVehicle.Acceleration) }}</td></tr>
                            <tr><th>Braking</th><td>{{ Math.round(currentVehicle.Braking) }}</td></tr>
                            <tr><th>Handling</th><td>{{ Math.round(currentVehicle.Handling) }}</td></tr>
                        </table>
                        <h4 class="VehicleInfo__table-text">( Stats out of 100 )</h4>
                    </div>
                    
                    <div class="VehicleInfo__tags">
                        <span class="VehicleInfo__tag" v-if="currentVehicle.Personal">Personal</span>
                        <span class="VehicleInfo__tag" v-if="currentVehicle.Premium">Premium</span>
                        <span class="VehicleInfo__tag" v-if="currentVehicle.Moddable">Moddable</span>
                        <span class="VehicleInfo__tag" v-if="currentVehicle.SuperModdable">Super Moddable</span>
                    </div>
                </div>

                <div v-if="currentVehicle.ForSale || currentVehicle.Sellable" class="VehicleInfo__pricing">
                    <div v-if="currentVehicle.ForSale">
                        <span>{{ currentVehicle.Website }}</span>
                        <div class="VehicleInfo__price"><strong>Purchase Price:</strong> {{ currentVehicle.Cost }}</div>
                    </div>
                    
                    <div v-if="currentVehicle.Sellable">
                        Can be sold for <strong>{{ currentVehicle.SellPrice }}</strong>
                    </div>
                </div>

            </div>
        </div>
    </dialog>
</template>

<style lang="scss">
    .VehicleInfo {
        background-color: transparent;
        border: 10px solid transparent;
        box-sizing: border-box;
        max-width: 550px;
        padding: 0;
        width: 100%;

        &::backdrop {
            background: rgb(46, 46, 46, 0.9);
        }
    }

    .VehicleInfo__inner {
        background-color: var(--col-white);
        position: relative;
    }

    .VehicleInfo__stats {
        padding: 16px;
    }

    .VehicleInfo__image {
        display: block;
        width: 100%
    }

    .VehicleInfo__name {
        background-color: var(--col-black);
        color: var(--col-white);
        line-height: 1.2;
        margin: 0;
        padding: 16px 60px 16px 16px;
    }

    .VehicleInfo__type {
        background-color: var(--col-greylight);
        border-radius: 3px;
        display: inline-block;
        margin-right: 5px;
        padding: 5px 8px;
    }

    .VehicleInfo__close {
        background-color: transparent;
        border: none;
        color: var(--col-white);
        padding: 0;
        position: absolute;
        right: 13px;
        top: 13px;

        &:hover {
            cursor: pointer;
        }

        .Icon {
            width: 30px;
        }
    }

    .VehicleInfo__pricing {
        background-color: var(--col-goldtransparent);
        padding: 16px;
    }

    .VehicleInfo__price {
        font-size: 20px;
        margin: 8px 0;
    }

    .VehicleInfo__tags {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }

    .VehicleInfo__tag {
        background-color: var(--col-greylight);
        border-radius: 3px;
        display: inline-block;
        font-size: 12px;
        font-weight: 700;
        padding: 3px 5px;
    }

    .VehicleInfo__table {
        margin-top: 16px;
        width: 100%;
    }

    .VehicleInfo__table-text {
        font-size: 13px;
        font-weight: 300;
        margin-bottom: 0;
        margin-top: 5px;
    }

    .VehicleInfo__table th, .VehicleInfo__table td {
        border-bottom: 1px solid var(--col-greylight);
        padding: 3px;
        text-align: left;
    }

    .VehicleInfo__table td {
        border-left: 1px solid var(--col-greylight);
        text-align: center;
    }
</style>