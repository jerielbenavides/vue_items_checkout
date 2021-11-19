<template>
    <div class="row container">
        <h5>WELCOME, YOUR GOES NAME HERE</h5>
        <div class="categories_container col s12 m12 l3">
            <div>
                <!-- <article id="viewLoans_tab" class="selectableItemCategory"><router-link to="/profile/loans">My Loans</router-link></article>
                <article id="viewProfile_tab" class="selectableItemCategory"><router-link to="/profile/edit">Edit Profile</router-link><div class="divider"></div></article>  -->
                <article id="viewLoans" class="selectableItemCategory"><a href="#" v-on:click="makeTabActive('viewLoans')"><h6>My Loans</h6></a><div class="divider"></div></article> 
                <article id="viewProfile" class="selectableItemCategory"><a href="#" v-on:click="makeTabActive('viewProfile')"><h6>My Info</h6></a><div class="divider"></div></article> 
                <article id="editProfile" class="selectableItemCategory"><a href="#" v-on:click="makeTabActive('editProfile')"><h6>Edit Profile</h6></a><div class="divider"></div></article> 

            </div>
        </div>
        <div class="col s12 m12 l9">
                <section id="loansTab" v-show="isActiveTab('viewLoans')">
                    <h5>My Loans</h5>
                    <div class="profileContentArea">
                        <div v-for="(item, index) in  itemsLoaned" :key="index">
                        <article :id="item">
                            <div class="item">
                                <label>
                                    <span>
                                        <p class="itemName">{{  itemsLoaned[index]['name'] }}</p>
                                        <p> Barcode: {{ itemsLoaned[index]['barcode'] }}</p>
                                        <p> Category: {{ itemsLoaned[index]['category'] }}</p>
                                        <p> Borrowed: {{ itemsLoaned[index]['borrowedDate'] }}</p>
                                        <p> Return By: {{ itemsLoaned[index]['returnBy'] }}</p>                                                                                                                                                               
                                    </span>
                                </label>
                                
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                </div>
                    </div>

                </section>
                <section id="profileViewTab" v-show="isActiveTab('viewProfile')">
                    <h5>Your Info</h5>
                </section>   
                <section id="profileEditTab" v-show="isActiveTab('editProfile')">
                    <h5>Edit Profile</h5>
                    <button id="addtoCartbttn" class="btn waves-effect waves-light" type="submit" name="Continue">Continue</button>
                </section>            
        </div>
    </div>
</template>

<script>

export default {
    name: 'Profile',
    components: {

    },
    data() {
    return {
        activeTab: 'viewLoans',
        itemsLoaned: [{name: 'Canon HD Cam Recorder', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Microphone (some text here)', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Computer Camera', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'HD VIsion Webcam (with removable shoe)', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Camera Tripod', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Nikkon Battery', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},]
    }
    },
    methods: {
        makeTabActive: function(val) {
            this.activeTab = val;
        },
        isActiveTab: function(val) {
            return this.activeTab === val;
        }
    }
}
</script>

<style scoped>

.profileContentArea{
    /* padding: 100px; */
    margin-top: 1em;
    max-height: 65vh;
    overflow-y: auto;
}
.itemName{
    font-size: 1.5em;
    color: black;
}
.selectableItemCategory a{
    color: #2c3e50;
    text-decoration: none;
}
.selectableItemCategory a:hover{
    color: #0B8261;
    cursor: pointer;
}
#addtoCartbttn{
    margin-top: 1em;
}
</style>
