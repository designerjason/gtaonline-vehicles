<script>
import VehicleSelect from '../src/components/VehicleSelect.vue'
import VehicleItem from '../src/components/VehicleItem.vue'

export default {
        components: {
            VehicleSelect,
            VehicleItem
        },
        data() {
            return {
                db: null,
                favourites: [],
                filteredDb: null,
                currentFilter: null,
                vehicleTypes: [],
                currentVehicle: null
            }
        },
        mounted() {
            this.fetchDB()
        },
        watch: {
            favourites: {
                handler(arr) {
                    localStorage.setItem("gta5-fav-vehicles", JSON.stringify(arr))
                },
                deep: true
            }

        },
        methods: {
            fetchDB() {
                fetch('data/vehicleDB.json')
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
            getVehicleInfo(e) {
                this.currentVehicle = {...e}
                this.$refs.vehicleInfo.showModal()
            },
            closeModal() {
                this.$refs.vehicleInfo.close()
            },
            filter(event) {
                this.filteredDb = this.db.find(obj => Object.keys(obj)[0] === event.target.value)
                this.currentFilter = event.target.value
                const savedfavourites = localStorage.getItem('gta5-fav-vehicles')
                if(savedfavourites) {
                    this.favourites = JSON.parse(savedfavourites)
                }
            }
        }
    }
</script>

<template>
    <div>
        <VehicleSelect :vehicles="vehicleTypes" @filter="filter" />
        <dialog ref="vehicleInfo" class="vehicleInfo">
            <button @click="closeModal()">close</button>
            <div v-if="currentVehicle" class="vehicleInfo__details">
                <div>
                    <h2>{{ currentVehicle.Name }}</h2>
                    <strong>Type:</strong> {{ currentVehicle.Type }}
                    <strong>Seats:</strong> {{ currentVehicle.Seats }}
                </div>

                <div>
                    <h3>Stats (out of 100)</h3>
                    <strong>Speed:</strong> {{ Math.round(currentVehicle.Speed) }}<br>
                    <strong>Acceleration:</strong> {{ Math.round(currentVehicle.Acceleration) }}<br>
                    <strong>Braking:</strong> {{ Math.round(currentVehicle.Braking) }}<br>
                    <strong>Handling:</strong> {{ Math.round(currentVehicle.Handling) }}
                </div>
                
                <div>
                    <span v-if="currentVehicle.Personal">Personal</span>
                    <span v-if="currentVehicle.Premium">Premium</span>
                    <span v-if="currentVehicle.Moddable">Moddable</span>
                    <span v-if="currentVehicle.SuperModdable">Super Moddable</span>
                </div>

                <div v-if="currentVehicle.ForSale">
                    <strong>Purchaseable at:</strong><br> {{ currentVehicle.Website }}<br>
                    <strong>Cost:</strong> {{ currentVehicle.Cost }}<br>
                </div>
                
                <div v-if="currentVehicle.Sellable">
                    Can be sold for <strong>{{ currentVehicle.SellPrice }}</strong>
                </div>
            </div>
        </dialog>

        <div class="VehicleList">
            <VehicleItem
                v-if="currentFilter"
                v-for="vehicle in filteredDb[currentFilter]"
                :key="vehicle"
                :vehicle="vehicle"
                :favourites="favourites"
                @get-vehicle-info="getVehicleInfo"
            />
        </div>
    </div>
</template>
