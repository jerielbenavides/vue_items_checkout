<template>
    <div class="row container">
        <h5>WELCOME, {{userData['firstname'].toUpperCase()}} {{userData['lastname'].toUpperCase()}}</h5>
        <div class="categories_container col s12 m12 l3">
            <div>
                <!-- <article id="viewLoans_tab" class="selectableItemCategory"><router-link to="/profile/loans">My Loans</router-link></article>
                <article id="viewProfile_tab" class="selectableItemCategory"><router-link to="/profile/edit">Edit Profile</router-link><div class="divider"></div></article>  -->
                <article id="viewLoans" class="selectableItemCategory"><a href="#" v-on:click="makeTabActive('viewLoans')"><h6 :class="isActiveTab('viewLoans')? `activeTab`:  ``">Your Loans</h6></a><div class="divider"></div></article> 
                <article id="viewProfile" class="selectableItemCategory"><a href="#" v-on:click="makeTabActive('viewProfile')"><h6 :class="isActiveTab('viewProfile')? `activeTab`:  ``">Your Info</h6></a><div class="divider"></div></article> 
                <article id="editProfile" class="selectableItemCategory"><a href="#" v-on:click="makeTabActive('editProfile')"><h6 :class="isActiveTab('editProfile')? `activeTab`:  ``">Edit Profile</h6></a><div class="divider"></div></article> 

            </div>
        </div>
        <div class="col s12 m12 l9 profilePage">
                <section id="loansTab" v-show="isActiveTab('viewLoans')">
                    <h5>Your Loans</h5>
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
                        <p>Firstname</p>
                        <p id="profile_firstname" class="itemName">{{userData['firstname']}}</p>
                        <p>Lastname</p>
                        <p id="profile_firstname" class="itemName">{{userData['lastname']}}</p>
                        <p>Student ID</p>
                        <p id="profile_firstname" class="itemName">{{userData['studentId']}}</p>
                        <p>DC Email</p>
                        <p id="profile_firstname" class="itemName">{{userData['dcemail']}}</p>
                        <p>Alternate Email</p>
                        <p id="profile_firstname" class="itemName">{{userData['alternateEmail']}}</p>
                        <p>Program of Study</p>
                        <p id="profile_firstname" class="itemName">{{userData['studyProgram']}}</p>
                </section>   
                <section id="profileEditTab" v-show="isActiveTab('editProfile')">
                    <h5>Edit Profile</h5>
                    <form class="" v-on:submit="updateProfile">
                        <div class="input-field">
                            <input id="edit_firstname" v-model="formData['firstname']" type="text">
                            <span v-if="this.formErrors['firstname']" class="errorSpan">{{ this.formErrors['firstname'] }}</span>
                            <label for="edit_firstname" class="active">Firstname</label>
                        </div>
                        <div class="input-field">
                            <input id="edit_lastname" type="text" v-model="formData['lastname']">
                            <span v-if="this.formErrors['lastname']" class="errorSpan">{{ this.formErrors['lastname'] }}</span>
                            <label for="edit_lastname" class="active">Lastname</label>
                        </div>
                        <!-- <div class="input-field">
                            <input id="edit_dcemail" type="text" class="active" :value="userData['dcemail']">
                            <label for="edit_dcemail">DC Email</label>
                        </div> -->
                        <div class="input-field">
                            <input id="edit_alternateEmail" type="text" v-model="formData['alternateEmail']">
                            <span v-if="this.formErrors['alternateEmail']" class="errorSpan">{{ this.formErrors['alternateEmail'] }}</span>
                            <label for="edit_alternateEmail" class="active">Alternate Email</label>
                        </div>
                        <!-- <div class="input-field">
                            <input id="studentId" type="text" class="active" :value="userData['studentId']">
                            <label for="studentId">Student ID</label>
                        </div> -->
                        <div class="input-field">
                            <input id="edit_Password" type="password" v-model="formData['password']">
                            <span v-if="this.formErrors['password']" class="errorSpan">{{ this.formErrors['password'] }}</span>
                            <label for="edit_Password">Password</label>
                        </div>
                        <div class="input-field">
                            <input id="edit_newPassword" type="password" v-model="formData['newPassword']">
                            <span v-if="this.formErrors['newPassword']" class="errorSpan">{{ this.formErrors['newPassword'] }}</span>
                            <label for="edit_newPassword">New Password (not required)</label>
                        </div>
                        <div class="input-field">
                            <input id="edit_confirmNewPassword" type="password" v-model="formData['confirmNewPassword']">
                            <span v-if="this.formErrors['confirmNewPassword']" class="errorSpan">{{ this.formErrors['confirmNewPassword'] }}</span>
                            <label for="edit_confirmNewPassword">Confirm New Password</label>
                        </div>
                    <button class="btn waves-effect waves-light" type="submit"  @click.prevent="updateProfile()" name="action">Submit</button>
                    </form>
                </section>            
        </div>
    </div>
</template>

<script>

export default {
    name: 'Profile',
    components: {

    },
    props: {
    isLoggedIn: {
        type: Boolean,
        }, 
    },
    data() {
    return {
        formErrors: {'firstname': '', 'lastname': '', 'alternateEmail': '', 'password': '', 'newPassword': '', 'confirmNewPassword':''},
        formData: {'firstname': '', 'lastname': '', 'alternateEmail': '', 'password': '', 'newPassword': '', 'confirmNewPassword':''},
        activeTab: 'viewLoans',
        userData: {firstname: 'Jeriel', lastname: 'Benavides', studentId: 100808730, dcemail: 'jeriel.benavides@dcmail.ca', alternateEmail: 'someEmail@fake.com', studyProgram: 'Contemporary Web Design', password: 'mypassword'},
        //TODO: Load this on mounted event from server.
        itemsLoaned: [{name: 'Canon HD Cam Recorder', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Microphone (some text here)', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Computer Camera', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'HD VIsion Webcam (with removable shoe)', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Camera Tripod', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},
                        {name: 'Nikkon Battery', barcode: 123456789, category:'Item Category', borrowedDate: '18 November 2021, 16:04', returnBy: '20 November 2021, 16:04'},]
    }
    },
    created() {
        if(!this.isLoggedIn){
            this.$router.push({ name: 'logout', params: {}});
        }
    },
    mounted() {
        this.formData['firstname']= this.userData['firstname'];
        this.formData['lastname']= this.userData['lastname'];
        this.formData['alternateEmail']= this.userData['alternateEmail'];
    },

    methods: {
        makeTabActive: function(val) {
            this.activeTab = val;
        },
        isActiveTab: function(val) {
            return this.activeTab === val;
        },
        updateProfile: function() {
            //Check errors here
            let errors = false;
            //clear binded variables
            this.formErrors['firstname'] = !this.formData['firstname'] ? 'You must complete this field.': '';
            this.formErrors['lastname'] = !this.formData['lastname'] ? 'You must complete this field.': '';
            this.formErrors['alternateEmail'] = !this.formData['alternateEmail'] ? 'You must complete this field.': '';
            this.formErrors['password'] = !this.formData['password'] ? 'You must complete this field.': '';
            errors = (!this.formData['firstname'] || !this.formData['lastname'] || !this.formData['alternateEmail'] || !this.formData['password']) ? true : false;
            if (this.formData['newPassword'] || this.formData['confirmNewPassword']){
                if (this.formData['newPassword'] === this.formData['confirmNewPassword']){
                    this.formErrors['confirmNewPassword'] = '';
                }
                else{
                    //Passwords do not match
                    this.formErrors['confirmNewPassword'] = 'Passwords do not match.';
                    errors = true;
                    return;
                }
            }
            if (!errors){
            //TODO: Validate password.
            if (this.formData['password']){ //Only do this if password is valid
                this.userData['firstname']= this.formData['firstname'];
                this.userData['lastname']= this.formData['lastname'];
                this.userData['alternateEmail']= this.formData['alternateEmail'];
                this.userData['password']= this.formData['password'];
                if (this.formData['newPassword'] || this.formData['confirmNewPassword']){
                    if (this.formData['newPassword'] === this.formData['confirmNewPassword']){
                        this.formErrors['confirmNewPassword'] = '';
                        this.userData['password']= this.formData['password']; //Change password in object
                    }
                    else{
                        //Passwords do not match
                        this.formErrors['confirmNewPassword'] = 'Passwords do not match.';
                        errors = true;
                        return;
                    }
                }
                //TODO: Update on server
                if (!errors){
                    //Notify user
                    this.$swal.fire({
                        title: '<strong>DONE</strong>',
                        icon: 'none',
                        html:
                            `<div id="modalDiv"> 
                                <h5>Your profile has been updated:</h5>
                            </div>`,
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText:'CONTINUE',
                        customClass: {
                            container: 'alertContentContainer',
                            popup: '...',
                            header: '...',
                            title: 'alertTitle',
                            actions: 'alertActionButtons',
                            confirmButton: 'alertConfirm',
                            denyButton: 'alertDeny',
                            cancelButton: 'alertCancel',
                            footer: 'alertFooter',
                            }
                    });
                    //Clear password fields
                    this.formData['password'] = '';
                    this.formData['confirmNewPassword'] = '';
                    this.formData['newPassword'] = '';
                    this.formErrors['confirmNewPassword'] = '';
                }
            }
            }
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
.profilePage{
    margin-bottom: 50px;
}
</style>
