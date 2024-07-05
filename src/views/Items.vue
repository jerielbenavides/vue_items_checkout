<template>
    <div class="row container">
        <h5>CLICK ITEM TO ADD TO SHOPPING CART</h5>
        <span v-if="this.formErrors['general']" class="errorSpan">{{ this.formErrors['general'] }}</span>
        <div v-if="!isFetching" class="categories_container col s12 m12 l3">
            <div v-for="(value, propertyName, index) in itemCategories['categories']" :key="index">
                    <article :id="'categoryTab_' + value['id']" class="selectableItemCategory"><h6 v-on:click="makeTabActive(value['name'], value['id'])" :class="isActiveTab(value['id'])? `activeTab`:  ``">{{ value['name'] }}</h6><div class="divider"></div></article> 
            </div>
        </div>
        <div class="col s12 m12 l9">
            <h5>{{categoryName}}</h5>
            <div v-if="!isFetching" class="items_container">
                <div v-for="(item, index) in itemsList" :key="index">
                    <article class="categoryItems" :id="index">
                        <div class="item">
                            <label>
                                <!-- TODO: Replace input id with asset id from table once we connect services -->
                                <input v-if="parseInt(itemsList[index]['assets_count_available']) > 0" type="checkbox" v-model="checkedItems" :id="`item#-${categoryId}-${index}`" :value="`${categoryId}item#${index}`" @change="itemChecked()"/>
                                <input v-else type="checkbox" v-model="checkedItems" :id="`item#-${categoryId}-${index}`" :value="`${categoryId}item#${index}`" @change="itemChecked()" disabled/>
                                <!-- <input v-show="parseInt(exampleCategory[index]['available']) > 0" type="checkbox" :id="`item#-${index}`"/>
                                <input v-show="parseInt(exampleCategory[index]['available']) <= 0" type="checkbox" :id="`item#-${index}`" disabled="disabled" /> -->
                                <span v-bind:class="{ isDisabled:  parseInt(itemsList[index]['assets_count_available']) == 0}">
                                    <p class="itemName">{{ itemsList[index]['asset_description'] }}</p>
                                    <p> Available: {{ itemsList[index]['assets_count_available'] }}</p>
                                </span>
                            </label>
                            
                        </div>
                    
                        <div class="divider"></div>
                    </article> 
                </div>
            </div>
            
            <button id="addtoCartbttn" class="btn waves-effect waves-light" type="submit" name="Continue" @click="continueToCart()">Continue</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Items',
    props: {
        cartItems: {
            type: Array
        },  
        isLoggedIn: {
            type: Boolean,
        },  
        borrower: {
            type: Object
        },  
    },
    components: {

    },
    data() {
        return {
            isFetching: true,
            activeTab: '',
            categoryName: '',
            checkedItems: [],
            studentCartItems: [],
            formErrors: {'general': ''},
            categoryId: 0,
            itemsList: [],
            itemCategories : {"categories": {     "1": {       "id": "1",       "name": "DSLR",       "assets": [         {           "asset_description": "Canon Digital Rebel T3",           "assets_count": "16",           "assets_reserve": "1",           "assets_bin": "0",           "signed_out": 15,           "assets_count_available": 0,           "categories_id": "1",           "categories_name": "DSLR",           "notes": "Canon EOS Rebel T3 18-55 IS Kit: contains Acumem Class 6 8GB SD card + Lowepro Topload Zoom bag + plus USB cable and Canon battery."         } ] } } },
        }
    },
    created() {
        this.isFetching= true;
        if(!this.isLoggedIn){
            this.$router.push({ name: 'logout', params: {}});
        }
        else{
                const options = {
                url: "https://portfolio.jerielbenavides.com/signout/services/get_assets.php",
                method: "POST",
                data: {
                    student_id: this.borrower.student_id,
                },
            };

            this.$axios(options)
                .then((res) => {
                switch (res.data.error.id) {
                    case 0:
                    this.itemCategories['categories'] = res.data.categories;
                    //Make first tab active.
                    this.activeTab = `categoryTab_1`;
                    this.makeTabActive(this.itemCategories['categories'][Object.keys(this.itemCategories['categories'])[0]]['name'], this.itemCategories['categories'][Object.keys(this.itemCategories['categories'])[0]]['id']);
                    break;
                    /* add other responses here */
                    default:
                    this.formErrors['general'] = "Something went wrong please try again.";
                    break;
                }
                this.isFetching = false;
                })
                .catch((err) => {
                console.error("Get Assets Failed." + err);
                });
        }

    },
    mounted() {
       //Convert cartItems to studentCartItems
       //NOTE: This is a workaround for the lack of specific item id on the response. Probably not ideal.
        this.studentCartItems = this.cartItems
       //Convert cartItems to checkedItems
        if (this.cartItems){
            this.cartItems.forEach((item) => {
            let text = `${item['categories_id']}item#${item['assetId']}`;
            this.checkedItems.push(text);
        })
        }
    },
    methods: {
        continueToCart: function(){
            this.$router.push({ name: 'cart', params: {cartItems: this.studentCartItems, isLoggedIn: this.isLoggedIn, borrower: this.borrower }});
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
        },
        itemChecked: function(){
            this.studentCartItems = [];
            this.checkedItems.forEach(element => {
                let category = element.split("item#")[0];
                let id = element.split("item#")[1];
                let item = this.itemCategories['categories'][category]['assets'][id];
                item.assetId = id;
                this.studentCartItems.push(item);
            })
            
            this.$emit("itemSelected", this.studentCartItems);
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
