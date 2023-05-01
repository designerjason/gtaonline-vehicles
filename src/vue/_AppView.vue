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
            filter(event) {
                this.filteredDb = this.db.find(obj => Object.keys(obj)[0] === event.target.value)
                this.currentFilter = event.target.value
            }
        }
    }
</script>

<template>
    <div>
        <select v-if="vehicleTypes" @change="filter($event)">
            <option selected disabled>Select Vehicle Type</option>
            <option v-for="item in vehicleTypes" :key="item" :value="item">
                {{ item }}
            </option>
        </select><br>

        <div class="VehicleList">
            <!-- return filtered list -->
            <div class="Vehicle" v-if="currentFilter" v-for="vehicle in filteredDb[currentFilter]" :key="vehicle">
                <img class="Vehicle__image" :src="`/images/${vehicle.Url}.png`" width="200" height="200" :alt="vehicle.Name">
                <h2 class="Vehicle__name">{{ vehicle.Name }}</h2>
                <!--
                    vehicle.Type
                    vehicle.Speed
                    vehicle.Acceleration
                    vehicle.Braking
                    vehicle.Handling
                    vehicle.TopSpeed
                    vehicle.TopAcceleration
                    vehicle.TopBraking
                    vehicle.TopHandling
                    vehicle.ForSale
                    vehicle.Website
                    vehicle.Cost
                    vehicle.Seats
                    vehicle.Personal
                    vehicle.Premium
                    vehicle.Moddable
                    vehicle.SuperModdable
                    vehicle.Sellable
                    vehicle.SellPrice
                -->
            </div>
        </div>
    </div>
</template>
