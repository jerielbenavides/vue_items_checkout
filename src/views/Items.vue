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
    },
    components: {

    },
    data() {
        return {
            activeTab: '',
            categoryName: '',
            checkedItems: [],
            studentCartItems: [],
            categoryId: 0,
            itemsList: [],
            itemCategories: {   "categories": {     "1": {       "id": "1",       "name": "DSLR",       "assets": [         {           "asset_description": "Canon Digital Rebel T3",           "assets_count": "16",           "assets_reserve": "1",           "assets_bin": "0",           "signed_out": 15,           "assets_count_available": 0,           "categories_id": "1",           "categories_name": "DSLR",           "notes": "Canon EOS Rebel T3 18-55 IS Kit: contains Acumem Class 6 8GB SD card + Lowepro Topload Zoom bag + plus USB cable and Canon battery."         },         {           "asset_description": "Canon Digital Rebel T4i",           "assets_count": "17",           "assets_reserve": "1",           "assets_bin": "0",           "signed_out": 16,           "assets_count_available": 0,           "categories_id": "1",           "categories_name": "DSLR",           "notes": "Canon EOS Rebel T4i 18-55 IS Kit: contains Acumem Class 6 8GB SD card + Lowepro Topload Zoom bag + plus USB cable and Canon battery."         },         {           "asset_description": "Canon Digital Rebel XS",           "assets_count": "23",           "assets_reserve": "0",           "assets_bin": "1",           "signed_out": 22,           "assets_count_available": 0,           "categories_id": "1",           "categories_name": "DSLR",           "notes": "Canon EOS Rebel XS 18-55 IS Kit: contains SanDisk Ultra II Class 4 2GB SD card + Lowe Pro Topload Zoom bag + plus USB cable and Canon battery."         },         {           "asset_description": "Canon Digital Rebel XTi",           "assets_count": "57",           "assets_reserve": "10",           "assets_bin": "4",           "signed_out": 36,           "assets_count_available": 7,           "categories_id": "1",           "categories_name": "DSLR",           "notes": "Canon EOS Digital Rebel XTi Kit: contains 1GB CF card + Lowe Pro Topload Zoom bag + plus USB cable and Canon battery. Lens Serial no. 3550609432."         }       ]     },     "2": {       "id": "2",       "name": "Video Camera",       "assets": [         {           "asset_description": "Canon HD Camcorder",           "assets_count": "31",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 3,           "assets_count_available": 28,           "categories_id": "2",           "categories_name": "Video Camera",           "notes": "Canon Vixia HF200 camcorder. USB connectivity only. Requires compatible editing software."         },         {           "asset_description": "Canon HD Touch Screen Camcorder",           "assets_count": "9",           "assets_reserve": "0",           "assets_bin": "1",           "signed_out": 1,           "assets_count_available": 7,           "categories_id": "2",           "categories_name": "Video Camera",           "notes": "Canon VIXIA HFM300 camcorder. USB connectivity only. Requires compatible editing software."         }       ]     },     "3": {       "id": "3",       "name": "Camera Tripod",       "assets": [         {           "asset_description": "Standard Photo Tripod",           "assets_count": "19",           "assets_reserve": "8",           "assets_bin": "0",           "signed_out": 7,           "assets_count_available": 4,           "categories_id": "3",           "categories_name": "Camera Tripod",           "notes": "Manfrotto Tripod"         },         {           "asset_description": "Standard Photo Tripod (with removable shoe)",           "assets_count": "5",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 4,           "assets_count_available": 1,           "categories_id": "3",           "categories_name": "Camera Tripod",           "notes": "Manfrotto 755B w/804RC2 photo head"         }       ]     },     "4": {       "id": "4",       "name": "Video Tripod",       "assets": [         {           "asset_description": "Standard Video Tripod",           "assets_count": "17",           "assets_reserve": "2",           "assets_bin": "0",           "signed_out": 8,           "assets_count_available": 7,           "categories_id": "4",           "categories_name": "Video Tripod",           "notes": "E-Image EI-7050-AA Small DV Video Tripod includes fluid head and soft case."         }       ]     },     "5": {       "id": "5",       "name": "Lighting",       "assets": [         {           "asset_description": "Lighting Kit - Lowel DV Creator Kit 1",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 1,           "categories_id": "5",           "categories_name": "Lighting",           "notes": "With LB30 Soft Case. Includes umbrella only, no gels."         },         {           "asset_description": "Lighting Kit 1",           "assets_count": "1",           "assets_reserve": 0,           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 0,           "categories_id": "5",           "categories_name": "Lighting",           "notes": "Lowel Elemental Kit - includes 2 Omni-lights + 1 Tota-light + 4 light filters with frame. Umbrella included. No gels."         },         {           "asset_description": "Lighting Kit 2",           "assets_count": "1",           "assets_reserve": 0,           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 0,           "categories_id": "5",           "categories_name": "Lighting",           "notes": "Lowel Elemental Kit - includes 2 Omni-lights + 1 Tota-light + and umbrella. This does not contain light filters."         },         {           "asset_description": "Reflector - Cameron 40-in",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 0,           "categories_id": "5",           "categories_name": "Lighting",           "notes": ""         },         {           "asset_description": "Reflector - Lastolite",           "assets_count": "1",           "assets_reserve": 0,           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 1,           "categories_id": "5",           "categories_name": "Lighting",           "notes": ""         }       ]     },     "6": {       "id": "6",       "name": "Digital Still Camera",       "assets": null     },     "7": {       "id": "7",       "name": "Accessories",       "assets": [         {           "asset_description": "BeachTek XLR adapter",           "assets_count": "3",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 2,           "assets_count_available": 1,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "DXA-4P"         },         {           "asset_description": "Canon Speedlight FLASH",           "assets_count": "20",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 2,           "assets_count_available": 18,           "categories_id": "7",           "categories_name": "Accessories",           "notes": ""         },         {           "asset_description": "Canon Telephoto Zoom 75-300 f/4-5.6 III USM",           "assets_count": "7",           "assets_reserve": "2",           "assets_bin": "0",           "signed_out": 3,           "assets_count_available": 2,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Canon EF 75-300 mm F4-5.6 III USM"         },         {           "asset_description": "Drawing TABLET",           "assets_count": "31",           "assets_reserve": "8",           "assets_bin": "0",           "signed_out": 10,           "assets_count_available": 13,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Wacom Intuos 3 Tablet 6x8 includes stylus and bag."         },         {           "asset_description": "KEY - B114 Video Studio",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 1,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Due back IMMEDIATELY after use and before L120 closes."         },         {           "asset_description": "KEY - C113A Audio Suite",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 1,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Studio to be used ONLY for academic purposes + ONLY by qualified users. Due back IMMEDIATELY after use and before L120 closes."         },         {           "asset_description": "KEY - C128 Work Studio",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 1,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "DUE BACK IMMEDIATELY AFTER USE."         },         {           "asset_description": "KEY - C134 Photo Studio",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 0,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Due back IMMEDIATELY after use and before L120 closes."         },         {           "asset_description": "Nikon ED 70-300mm",           "assets_count": "1",           "assets_reserve": 0,           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 1,           "categories_id": "7",           "categories_name": "Accessories",           "notes": ""         },         {           "asset_description": "Spyder 3 Pro Display Calibrator",           "assets_count": "5",           "assets_reserve": "5",           "assets_bin": "0",           "signed_out": 0,           "assets_count_available": 0,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Includes software disc + stand"         },         {           "asset_description": "Wacom Cintiq 12WX Tablet",           "assets_count": "5",           "assets_reserve": "1",           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 3,           "categories_id": "7",           "categories_name": "Accessories",           "notes": "Package includes: USB cable + DVI-I to VGA cable + DVI cable + converter unit + grip pen + pen stand + power supply and power cable + installation guide + driver disc."         },         {           "asset_description": "XLR cable 25ft",           "assets_count": "15",           "assets_reserve": "9",           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 5,           "categories_id": "7",           "categories_name": "Accessories",           "notes": ""         },         {           "asset_description": "XLR cable 5ft",           "assets_count": "3",           "assets_reserve": "0",           "assets_bin": "1",           "signed_out": 0,           "assets_count_available": 2,           "categories_id": "7",           "categories_name": "Accessories",           "notes": ""         },         {           "asset_description": "XLR cable 6.5ft",           "assets_count": "1",           "assets_reserve": 0,           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 0,           "categories_id": "7",           "categories_name": "Accessories",           "notes": ""         }       ]     },     "8": {       "id": "8",       "name": "Microphones",       "assets": [         {           "asset_description": "Rode NTG-2 Shotgun Mic",           "assets_count": "4",           "assets_reserve": "0",           "assets_bin": "1",           "signed_out": 1,           "assets_count_available": 2,           "categories_id": "8",           "categories_name": "Microphones",           "notes": "Directional condenser mic for location recording. Requires one AA battery and an XLR cable."         },         {           "asset_description": "Sennheiser wireless mic set",           "assets_count": "1",           "assets_reserve": "0",           "assets_bin": "0",           "signed_out": 1,           "assets_count_available": 0,           "categories_id": "8",           "categories_name": "Microphones",           "notes": "Includes transmitter and receiver plus clip-on lavalier mic.\n"         }       ]     }   },   "query": "SELECT assets.asset_description, assets.notes\n        FROM assets, groups_reserve, groups\n        WHERE (assets.asset_description = groups_reserve.assets_description\n        AND groups_reserve.groups_id = groups.id\n        AND groups.programs_id = '37'\n        AND groups.year = '3'\n        AND assets.actions_id = '1') \n        OR\n        (assets.asset_description = groups_reserve.assets_description\n        AND groups_reserve.groups_id = groups.id\n        AND groups.id = '1'\n        AND assets.actions_id = '1') \n        GROUP BY assets.asset_description\n        ORDER BY assets.asset_description ",   "error": {     "id": 0,     "message": ""   } }
        }
    },
    created() {
        if(!this.isLoggedIn){
            this.$router.push({ name: 'logout', params: {}});
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
        //Make first tab active.
        this.activeTab = `categoryTab_1`;
        this.makeTabActive(this.itemCategories['categories'][Object.keys(this.itemCategories['categories'])[0]]['name'], this.itemCategories['categories'][Object.keys(this.itemCategories['categories'])[0]]['id'])

    },
    methods: {
        continueToCart: function(){
            this.$router.push({ name: 'cart', params: {cartItems: this.studentCartItems, isLoggedIn: this.isLoggedIn }});
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
            console.log('Updating cart');
            this.studentCartItems = [];
            this.checkedItems.forEach(element => {
                let category = element.split("item#")[0];
                let id = element.split("item#")[1];
                let item = this.itemCategories['categories'][category]['assets'][id];
                item.assetId = id;
                this.studentCartItems.push(item);
            })
            
            // TODO: Make this actually work
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
