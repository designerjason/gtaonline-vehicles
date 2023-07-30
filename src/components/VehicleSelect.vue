<script setup>

defineProps({
    vehicles: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <select @change="$emit('filter', $event)">
        <option selected disabled>Select Vehicle Type</option>
        <option v-for="item in vehicles" :key="item" :value="item">
            {{ item }}
        </option>
    </select>
</template>