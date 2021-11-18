<template>
    <div class="row container">
        <h5>CLICK ITEM TO ADD TO SHOPPING CART</h5>
        <div class="categories_container col s12 m12 l3">
            <div v-for="(category, index) in itemCategories" :key="index">
                    <article :id="category"><h6>{{ itemCategories[index] }}</h6><div class="divider"></div></article> 
            </div>
        </div>
        <div class="col s12 m12 l9">
            <h5>Items Category goes here</h5>
            <div class="items_container">
                <div v-for="(item, index) in exampleCategory" :key="index">
                        <article class="categoryItems" :id="item">
                            <div class="item">
                                <label>
                                    <input type="checkbox" :id="`category-${item}`" />
                                    <span>
                                        <p class="itemName">{{ exampleCategory[index]['name'] }}</p>
                                        <!-- TODO: Substract 1 from total when checking checkbox -->
                                        <p> Available: {{ exampleCategory[index]['available'] }}</p>
                                    </span>
                                </label>
                                
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                </div>
            </div>
            
            <button id="addtoCartbttn" class="btn waves-effect waves-light" type="submit" name="Continue">Continue</button>
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
        itemCategories: ['DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods', 'DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods', 'DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods', 'DLSRs', 'Camera Tripods', 'Cameras', 'Video Tripods', 'Microphone Tripods'],
        exampleCategory: [{name: 'Cannon HD Cam Recorder', available: 3}, {name: 'Camera Tripod', available: 1}, {name: 'Microphone', available: 0}, {name: 'Cannon HD Cam Recorder', available: 3}, {name: 'Camera Tripod', available: 1}, {name: 'Microphone', available: 0}, {name: 'Cannon HD Cam Recorder', available: 3}, {name: 'Camera Tripod', available: 1}, {name: 'Microphone', available: 0}, {name: 'Cannon HD Cam Recorder', available: 3}, {name: 'Camera Tripod', available: 1}, {name: 'Microphone', available: 0}, {name: 'Cannon HD Cam Recorder', available: 3}, {name: 'Camera Tripod', available: 1}, {name: 'Microphone', available: 0}]
    }
},
}
</script>

<style scoped>

.categories_container{
    margin-top: 1em;
    max-height: 75vh;
    overflow-y: scroll;
}
.items_container{
    /* padding: 100px; */
    margin-top: 1em;
    max-height: 65vh;
    overflow-y: scroll;
}
.itemName{
    font-size: 1.5em;
    color: black;
}
#addtoCartbttn{
    margin-top: 1em;
}
</style>
