<script>
    export default {
        data() {
            return {
                db: null,
                filteredDb: null,
                currentFilter: null,
                vehicleTypes: null
            }
        },
        mounted() {
            this.fetchDB()
        },
        methods: {
            fetchDB() {
                fetch('js/vehicleDB.json')
                .then(response => response.json())
                .then(data => {
                    this.db = data
                    this.getVehicleTypes()
                })
                .catch(e => console.error(e))
            },
            getVehicleTypes() {
                this.vehicleTypes = this.db.map(obj => Object.keys(obj)[0])
            },
            filter(type) {
                this.filteredDb = this.db.find(obj => Object.keys(obj)[0] === type)
                this.currentFilter = type
            }
        }
    }
</script>

<template>
    <div>
        <ul v-if="vehicleTypes">
            <li v-for="item in vehicleTypes" :key="item">
                <button @click="filter(item)">{{ item }}</button>
            </li>
        </ul>

        <!-- return filtered list -->
        <div v-if="currentFilter" v-for="vehicle in filteredDb[currentFilter]" :key="vehicle">
            <img :src="`/images/${vehicle.Url}.png`" :alt="vehicle.Name">
            {{ vehicle.Name }}
            <!--
                Type
                Speed
                Acceleration
                Braking
                Handling
                TopSpeed
                TopAcceleration
                TopBraking
                TopHandling
                ForSale
                Website
                Cost
                Seats
                Personal
                Premium
                Moddable
                SuperModdable
                Sellable
                SellPrice
            -->
        </div>
    </div>
</template>
