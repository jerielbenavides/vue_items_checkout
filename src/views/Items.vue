<template>
    <div class="row container">
        <h5>CLICK ITEM TO ADD TO SHOPPING CART</h5>
        <div class="categories_container col s12 m12 l3">
            <div v-for="(value, propertyName, index) in itemCategories['categories']" :key="index">
                    <article :id="'categoryTab_' + value['id']" class="selectableItemCategory"><h6 v-on:click="makeTabActive(value['name'], value['id'])" :class="isActiveTab(value['id'])? `activeTab`:  ``">{{ value['name'] }}</h6><div class="divider"></div></article> 
            </div>
        </div>
        <div class="col s12 m12 l9">
            <h5>{{categoryName}}</h5>
            <div class="items_container">
                <div v-for="(item, index) in itemsList" :key="index">
                    <article class="categoryItems" :id="index">
                        <div class="item">
                            <label>
                                <input v-if="parseInt(itemsList[index]['assets_count_available']) > 0" type="checkbox" v-model="checkedItems" :id="`item#-${categoryId}-${index}`" :value="`${categoryId}item#${index}`" :checked="true"/>
                                <input v-else type="checkbox" v-model="checkedItems" :id="`item#-${categoryId}-${index}`" :value="`${categoryId}item#${index}`" :checked="true" disabled/>
                                <!-- <input v-show="parseInt(exampleCategory[index]['available']) > 0" type="checkbox" :id="`item#-${index}`"/>
                                <input v-show="parseInt(exampleCategory[index]['available']) <= 0" type="checkbox" :id="`item#-${index}`" disabled="disabled" /> -->
                                <span v-bind:class="{ isDisabled:  parseInt(itemsList[index]['assets_count_available']) == 0}">
                                    <p class="itemName">{{ itemsList[index]['asset_description'] }}</p>
                                    <!-- TODO: Substract 1 from total when checking checkbox -->
                                    <p> Available: {{ itemsList[index]['assets_count_available'] }}</p>
                                </span>
                            </label>
                            
                        </div>
                    
                        <div class="divider"></div>
                    </article> 
                </div>
            </div>
            
            <button id="addtoCartbttn" class="btn waves-effect waves-light" type="submit" name="Continue" @click="addCart()">Continue</button>
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
            activeTab: '',
            categoryName: '',
            checkedItems: [],
            categoryId: 0,
            itemsList: [],
            itemCategories:   { 'categories': {
                                    '1': {'id':'1', 'name': 'DLSRs', 'assets': [{'asset_description':'Canon Digital Rebel T3', "assets_count": "16","assets_count_available": 0}, {'asset_description':'Microphone', "assets_count": "16","assets_count_available": 6}]},
                                    '2': {'id':'2', 'name': 'Laptops', 'assets': [{'asset_description':'Powerful laptop', "assets_count": "9","assets_count_available": 2}, {'asset_description':'Weak Laptop', "assets_count": "12","assets_count_available": 0}]}
                                    }
                                }
        }
    },
    methods: {
        addCart: function(){
            this.$router.push({path: '/cart'});
        },
        makeTabActive: function(catName,id) {
            this.activeTab = `categoryTab_${id}`;
            //Get list of items in category
            this.itemsList = this.itemCategories['categories'][id]['assets'];
            this.categoryName = catName;
            this.categoryId = id;
        },
        isActiveTab: function(id) {
            return this.activeTab === `categoryTab_${id}`;
        }
    }
}
</script>

<style scoped>

.categories_container{
    margin-top: 1em;
    max-height: 75vh;
    overflow-y: auto;
}
.items_container{
    /* padding: 100px; */
    margin-top: 1em;
    max-height: 65vh;
    overflow-y: auto;
    padding: 5px;
}
.itemName{
    font-size: 1.5em;
    color: black;
}
.selectableItemCategory:hover{
    color: #0B8261;
    cursor: pointer;
}
#addtoCartbttn{
    margin-top: 1em;
}
</style>
