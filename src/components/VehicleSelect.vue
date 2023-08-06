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

<style lang="scss">
.VehicleSelect {
    align-items: center;
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    max-width: 350px;
}

.VehicleSelect__dropdown {
    background-color: var(--col-white);
    border: none;
    flex-grow: 1;
    padding: 8px;
}
</style>