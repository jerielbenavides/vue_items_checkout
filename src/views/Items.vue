<template>
    <div class="row container">
        <h5>CLICK ITEM TO ADD TO SHOPPING CART</h5>
        <div class="items_container col s12 m12 l3">
            <div v-for="(category, index) in itemCategories" :key="index">
                    <article :id="category"><h6>{{ itemCategories[index] }}</h6><div class="divider"></div></article> 
            </div>
        </div>
        <div class="col s12 m12 l9">
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'Items',
    components: {

    },
    data() {
    return {
        itemCategories: ['DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods', 'DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods', 'DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods', 'DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods']
    }
},
}
</script>

<style scoped>

.items_container{
    /* padding: 100px; */
    margin-top: 1em;
    max-height: 70vh;
    overflow-y: scroll;
}
</style>
