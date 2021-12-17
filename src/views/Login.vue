<template>
    <div class="row container login_container">
        <div class="login_form col s12 m12 l3">
            <h5>EQUIPMENT SIGN OUT</h5>
            <span v-if="this.formErrors['general']" class="errorSpan">{{ this.formErrors['general'] }}</span>
            <p></p>
            <p id="login_errors"></p>
            <form class="" @submit.prevent="submitLoginForm()">
                    <div class="input-field">
                        <input id="studentId" type="text" v-model="formData['id']" class="validate">
                        <span v-if="this.formErrors['id']" class="errorSpan">{{ this.formErrors['id'] }}</span>
                        <label for="studentId">Student ID</label>
                    </div>
                    <div class="input-field">
                        <input id="password" password="Password" type="password" v-model="formData['password']" class="validate">
                        <span v-if="this.formErrors['password']" class="errorSpan">{{ this.formErrors['password'] }}</span>
                        <label for="password">Password</label>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Sign In</button>
            </form>
            <div id="login_links">
                <a href="/passwordreset" class="">Forgot Password?</a>
                <a href="/register" class="">Create Account</a>
            </div>
        </div>
        <div class="col l9 hide-on-med-and-down">
            <div id="login_img">
                <img src="../assets/logo_wall.jpg">
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Login',
    components: {
    // HelloWorld
    },
    data() {
        return {
            isLoggedIn: false,
            borrower: {
                firstName: "",
                lastName: "",
                borrower_id: "",
                dc_email: "",
                other_email: "",
                student_id: "",
                program_name: "",
                program_year: "",
            },
            formData: {'id': '', 'password': ''},
            formErrors: {'id': '', 'password': '', 'general': ''},
        }
    },
    mounted() {
        //Convert cartItems to studentCartItems
        this.isLoggedIn = false
    },
    methods: {
        submitLoginForm: function(){
            //Check errors 
            let errors = false;
            if (!this.formData['id']){
                this.formErrors['id']= 'Please complete this field';
                errors = true;
            }
            else{
                this.formErrors['id']= '';
            }
            if (!this.formData['password']){
                this.formErrors['password']= 'Please complete this field';
                errors = true;
            }
            else{
                //TODO: Validate Password?
                // this.formErrors['password']= '';
            }
            if(!errors){
                let student_id = this.formData['id'];
                let password = this.formData['password'];
                const options = {
                    url: "https://dca.durhamcollege.ca/~benavidesjeriel/signout/dynamic-site/services/login.php",
                    method: "POST",
                    data: {
                    student_id: student_id,
                    password: password,
                    },
                };

                this.$axios(options)
                    .then((res) => {
                    this.borrowers = res.data;
                    switch (res.data.error.id) {
                        case 0:
                            this.borrower.firstName = res.data.borrower.first_name;
                            this.borrower.lastName = res.data.borrower.last_name;
                            this.borrower.borrower_id = res.data.borrower.borrower_id;
                            this.borrower.dc_email = res.data.borrower.dc_email;
                            this.borrower.other_email  = res.data.borrower.other_email;
                            this.borrower.student_id  = res.data.borrower.student_id;
                            this.borrower.program_name  = res.data.borrower. program_name;
                            this.borrower.program_year  = res.data.borrower.program_year;                         
                            this.isLoggedIn = true;
                            this.$emit("submitLoginForm", this.isLoggedIn, this.borrower);
                            this.$router.push({ name: 'loan', params: {isLoggedIn: this.isLoggedIn, borrower: this.borrower }});
                            break;
                        case 1:
                            this.formErrors['general']= "No Student ID or Password were entered.";
                            break;
                        case 2:
                            this.formErrors['general']= 'Incorrect ID or Password.';
                            break;
                        default:
                            this.formErrors['general']= "Something went wrong please try again.";
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
.login_container{
    overflow: hidden;
}
.input-field input{
    /* border: 1px solid !important; */
}
.exaggerated_padding{
    padding: 5em !important;
}
.login_form{
    /* padding: 100px; */
    margin-top: 1em;
}
#login_img{
    position: absolute;
    width: 70vw;
    padding-left: 10vw;
}
#login_img img{
    width: 100%;
    min-height: 100vh;
    aspect-ratio: 1;
    /* width: calc(100% + 11vw);
    height: 100vh; */
}
#login_links{
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
}
#login_links a{
    text-decoration: none;
    color: #414042;
}
</style>
