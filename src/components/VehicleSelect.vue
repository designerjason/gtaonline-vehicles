<script setup>

defineProps({
    vehicles: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <label class="VehicleSelect">
        <strong>Vehicle Type: </strong>
        <select @change="$emit('filter', $event)" class="VehicleSelect__dropdown">
            <option selected disabled>Select Vehicle Type</option>
            <option v-for="item in vehicles" :key="item" :value="item">
                {{ item }}
            </option>
        </select>
    </label> 
</template>