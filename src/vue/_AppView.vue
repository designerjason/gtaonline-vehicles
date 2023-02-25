<script>
    export default {
        data() {
            return {
                db: null
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
                })
                .catch(e => console.error(e))
            }
        }
    }
</script>

<template>
    <div>
        {{ db }}
    </div>
</template>
