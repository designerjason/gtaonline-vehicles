<script>
import VehicleSelect from '@/components/VehicleSelect.vue'
import VehicleInfo from '@/components/VehicleInfo.vue'
import VehicleItem from '@/components/VehicleItem.vue'
import IconClose from '@/components/icons/IconClose.vue'
import buildVer from '../public/data/buildVer.js'

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
            buildVer,
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
        },
        showModal: {
            handler(state) {
                document.body.classList[state? 'add': 'remove']('overflow-hidden')
            }
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
        },
        formatTimeStamp(timestamp) {
            const date = new Date(timestamp)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }
}
</script>

<template>
    <h1 class="app-title">
        <img class="app-title-image" src="/images/gtaonlinevehicles.png" alt="gta online vehicles" width="225" height="74" />
        <span class="sr-only">
            GTA Online Vehicles
        </span>
    </h1>
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
    <div class="margin-top">
        <small>GTA Online Build Version (Steam): <a href="https://api.steamcmd.net/v1/info/271590"><strong>{{ buildVer.build }}</strong></a> | Last Synced: <strong>{{ formatTimeStamp(buildVer.timestamp) }}</strong></small>
    </div>
</template>
