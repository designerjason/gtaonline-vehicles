<script>
import VehicleSelect from '../src/components/VehicleSelect.vue'
import VehicleItem from '../src/components/VehicleItem.vue'
import IconClose from '../src/components/icons/IconClose.vue'

export default {
        components: {
            VehicleSelect,
            VehicleItem,
            IconClose
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
        
        <dialog ref="vehicleInfo" class="VehicleInfo">
            <div class="VehicleInfo__inner">
                <button class="VehicleInfo__close" @click="closeModal()">
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
