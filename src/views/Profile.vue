<template>
    <div v-if="!isFetching" class="row container">
        <h5>WELCOME, {{userData['firstName'].toUpperCase()}} {{userData['lastName'].toUpperCase()}}</h5>
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
                    <h5 v-if="(this.bin && this.bin.length>0)">Ready to Pick Up</h5>
                    <div class="profileContentArea">
                        <div v-for="(item, index) in  bin" :key="index">
                        <article :id="item">
                            <div class="item">
                                <label>
                                    <span>
                                        <p class="itemName">{{  bin[index]['asset_description'] }}</p>
                                        <p> Reservation Date: {{ bin[index]['date'] }}</p>
                                        <p> Pick Up By: {{ getReturnsDate(bin[index]['start_date']) }}</p>                                                                                                                                                             
                                    </span>
                                </label>
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                        </div>
                    </div>
                    <h5 v-if="(this.itemsLoaned && this.itemsLoaned.length>0)">Your Loans</h5>
                    <div class="profileContentArea">
                        <div v-for="(item, index) in  itemsLoaned" :key="index">
                        <article :id="item">
                            <div class="item">
                                <label>
                                    <span>
                                        <p class="itemName">{{  itemsLoaned[index]['description'] }}</p>
                                        <p> Barcode: {{ itemsLoaned[index]['barcode'] }}</p>
                                        <p> Serial Number: {{ itemsLoaned[index]['serial_number'] }}</p>
                                        <p> Category: {{ itemsLoaned[index]['category'] }}</p>
                                        <p> Borrowed: {{ itemsLoaned[index]['out_time'] }}</p>
                                        <p> Return By: {{ itemsLoaned[index]['due_time'] }}</p>                                                                                                                                                               
                                    </span>
                                </label>
                                
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                        </div>
                    </div>
                    <div class="empty"></div>

                </section>
                <section id="profileViewTab" v-show="isActiveTab('viewProfile')">
                    <h5>Your Info</h5>
                        <p>First Name</p>
                        <p id="profile_firstName" class="itemName">{{userData['firstName']}}</p>
                        <p>Last Name</p>
                        <p id="profile_lastame" class="itemName">{{userData['lastName']}}</p>
                        <p>Student ID</p>
                        <p id="profile_id" class="itemName">{{userData['student_id']}}</p>
                        <p>DC Email</p>
                        <p id="profile_dcemail" class="itemName">{{userData['dc_email']}}</p>
                        <p>Alternate Email</p>
                        <p id="profile_otheremail" class="itemName">{{userData['other_email']}}</p>
                        <p>Program of Study</p>
                        <p id="profile_program" class="itemName">{{userData['program_name']}}</p>
                </section>   
                <section id="profileEditTab" v-show="isActiveTab('editProfile')">
                    <h5>Edit Profile</h5>
                    <form class="" v-on:submit="updateProfile">
                        <span v-if="this.formErrors['general']" class="errorSpan">{{ this.formErrors['general'] }}</span>
                        <div class="input-field">
                            <input id="edit_firstName" v-model="formData['firstName']" type="text">
                            <span v-if="this.formErrors['firstName']" class="errorSpan">{{ this.formErrors['firstName'] }}</span>
                            <label for="edit_firstName" class="active">firstName</label>
                        </div>
                        <div class="input-field">
                            <input id="edit_lastName" type="text" v-model="formData['lastName']">
                            <span v-if="this.formErrors['lastName']" class="errorSpan">{{ this.formErrors['lastName'] }}</span>
                            <label for="edit_lastName" class="active">lastName</label>
                        </div>
                        <!-- <div class="input-field">
                            <input id="edit_dc_email" type="text" class="active" :value="userData['dc_email']">
                            <label for="edit_dc_email">DC Email</label>
                        </div> -->
                        <div class="input-field">
                            <input id="edit_other_email" type="text" v-model="formData['other_email']">
                            <span v-if="this.formErrors['other_email']" class="errorSpan">{{ this.formErrors['other_email'] }}</span>
                            <label for="edit_other_email" class="active">Alternate Email</label>
                        </div>
                        <!-- <div class="input-field">
                            <input id="student_id" type="text" class="active" :value="userData['student_id']">
                            <label for="student_id">Student ID</label>
                        </div> -->
                        <div class="input-field">
                            <input id="edit_Password" type="password" v-model="formData['password']">
                            <span v-if="this.formErrors['password']" class="errorSpan">{{ this.formErrors['password'] }}</span>
                            <label for="edit_Password">Password (Required only if changing)</label>
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
        borrower: {
            type: Object
        },
    },
    data() {
    return {
        isFetching: true,
        formErrors: {'firstName': '', 'lastName': '', 'other_email': '', 'password': '', 'newPassword': '', 'confirmNewPassword':'', 'general': ''},
        formData: {'firstName': '', 'lastName': '', 'other_email': '', 'password': '', 'newPassword': '', 'confirmNewPassword':''},
        activeTab: 'viewLoans',
        userData: this.borrower,
        itemsLoaned: [],
        bin: [],
        // userData: {firstName: 'Jeriel', lastName: 'Benavides', student_id: 100808730, dc_email: 'jeriel.benavides@dcmail.ca', other_email: 'someEmail@fake.com', program_name: 'Contemporary Web Design'},
        }
    },
    created() {
        this.isFetching= true;
        if(!this.isLoggedIn){
            this.$router.push({ name: 'logout', params: {}});
        }
        else{
            //Get assets for student
            const options = {
                url: "https://dca.durhamcollege.ca/~benavidesjeriel/signout/dynamic-site/services/get_assets_logged_out.php",
                method: "POST",
                data: {
                student_id: this.borrower.student_id,
                },
            };

            this.$axios(options)
                .then((res) => {
                switch (res.data.error.id) {
                    case 0:
                        this.itemsLoaned = res.data.assets;
                        this.bin = res.data.bin;
                    break;
                    /* add other responses here */
                    default:
                    this.formErrors['general'] = "Something went wrong please try again.";
                    break;
                }
                })
                .catch((err) => {
                console.error("Get Assets Failed." + err);
                });
            this.isFetching = false;
        }
        
    },
    mounted() {
        if(this.isLoggedIn){
            this.formData['firstName']= this.userData['firstName'];
            this.formData['lastName']= this.userData['lastName'];
            this.formData['other_email']= this.userData['other_email'];
        }
    },

    methods: {
        makeTabActive: function(val) {
            this.activeTab = val;
        },
        isActiveTab: function(val) {
            return this.activeTab === val;
        },
        getReturnsDate: function(phpDate) {
            let time = new Date(phpDate*1000)
            time.setMinutes(time.getMinutes()+20); 
            let returnDate = time.toLocaleString('en-CA', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}); 
            return returnDate;
        },
        updateProfile: function() {
            //Check errors here
            let errors = false;
            //clear binded variables
            this.formErrors['firstName'] = !this.formData['firstName'] ? 'You must complete this field.': '';
            this.formErrors['lastName'] = !this.formData['lastName'] ? 'You must complete this field.': '';
            this.formErrors['other_email'] = !this.formData['other_email'] ? 'You must complete this field.': '';
            this.formErrors['password'] = '';
            this.formErrors['general'] = '';
            // this.formErrors['password'] = !this.formData['password'] ? 'You must complete this field.': '';
            errors = (!this.formData['firstName'] || !this.formData['lastName'] || !this.formData['other_email']) ? true : false;
            if (this.formData['newPassword'] || this.formData['confirmNewPassword'] ){
                if(!this.formData['password']){
                    this.formErrors['password'] = 'You must enter your old password if you want to change it.';    
                    errors = true;
                }
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
            //Validate password, again...
            const options = {
                url: "https://dca.durhamcollege.ca/~benavidesjeriel/signout/dynamic-site/services/update_borrower.php",
                method: "POST",
                data: {
                    name_last : this.formData['lastName'],
                    name_first : this.formData['firstName'],
                    student_id : this.borrower.student_id,
                    email_other : this.formData['other_email'],
                    password_old : this.formData['password'],
                    password_new : this.formData['newPassword'],
                },
            };

            this.$axios(options)
                .then((res) => {
                switch (res.data.error.id) {
                    case 0:
                        //All went good. Update local variables
                        this.userData['firstName']= this.formData['firstName'];
                        this.userData['lastName']= this.formData['lastName'];
                        this.userData['other_email']= this.formData['other_email'];
                        this.userData['password']= this.formData['password'];
                        // if (this.formData['newPassword'] || this.formData['confirmNewPassword']){
                        //     if (this.formData['newPassword'] === this.formData['confirmNewPassword']){
                        //         this.formErrors['confirmNewPassword'] = '';
                        //         this.userData['password']= this.formData['password']; //Change password in object
                        //     }
                        //     else{
                        //         //Passwords do not match
                        //         this.formErrors['confirmNewPassword'] = 'Passwords do not match.';
                        //         errors = true;
                        //         return;
                        //     }
                        // }
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
                        break;
                    default:
                        this.formErrors['general']= res.data.error.message;
                        break;
                }
                })
                .catch((err) => {
                console.error("Login failed." + err);
                });
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
.empty{
    min-height: 50px;
}
</style>
