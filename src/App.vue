<script>
import VehicleSelect from '../src/components/VehicleSelect.vue'
import VehicleInfo from '../src/components/VehicleInfo.vue'
import VehicleItem from '../src/components/VehicleItem.vue'
import IconClose from '../src/components/icons/IconClose.vue'

export default {
    components: {
        VehicleSelect,
        VehicleInfo,
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
            currentVehicle: null,
            showModal: false
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
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
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
        <VehicleSelect 
            :vehicles="vehicleTypes" 
            @filter="filter" 
        />
        
        <VehicleInfo
            :current-vehicle="currentVehicle"
            :show-modal="showModal"
            @close-modal="closeModal"
        />

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
