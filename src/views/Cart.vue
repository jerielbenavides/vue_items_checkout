<template>
    <div class="row container cart_container">
        <div class="col s12 m12 l8">
            <h5>YOUR CART</h5>
            <div class="items_container">
                <div v-for="(item, index) in studentCartItems" :key="index">
                        <article class="categoryItems" :id="index">
                            <div class="item row">
                                <i :id="`deleteCart-${index}`" @click="removeFromCart(index)" class="material-icons col s1 m1 l1 deleteFromCart">delete</i>
                                <label class="col s11 m11 l11">
                                    <span>
                                        <p class="itemName">{{ studentCartItems[index]['asset_description'] }}</p>
                                        <!-- TODO: Replace with current date and time -->
                                        <!-- Note: This is not really needed IMO -->
                                        <p> Sign Out Date: {{getTodaysDate()}}</p>
                                        <p> Return Date: {{getReturnsDate()}}</p>
                                    </span>
                                </label>
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                </div>
            </div>
            
            <button v-if="this.studentCartItems.length>0" id="checkOutBttn" class="btn waves-effect waves-light" type="submit"  @click.prevent="checkOut()" name="Continue">Checkout</button>
            <p v-else>Your cart is empty</p>
        </div>
        <div class="col l4 hide-on-med-and-down">
            <div id="cart_img">
                <img src="../assets/camera-tall.jpg">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Cart',
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
        studentCartItems: this.cartItems ? this.cartItems : []
    //     // TODO: The text date here is an example. Make a parse date method and parse the date object coming from db/api
    //     cartItems: [{name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'},
    //     {name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'},
    //     {name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'},
    //     {name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'}]
    // 
    }
    },
    created() {
        if(!this.isLoggedIn){
            this.$router.push({ name: 'logout', params: {}});
        }
    },
    mounted() {
        // console.log(this.studentCartItems);
    },
    methods: {
        getTodaysDate: function() {
            let time = new Date();
            return time.toLocaleString('en-CA', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}); 
        },
        getReturnsDate: function() {
            let time = new Date();
            time.setHours(time.getHours()+72); 
            let returnDate = time.toLocaleString('en-CA', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}); 
            return returnDate;
        },
        checkOut: function(){
            //Show popup
            //build list element
            let itemsList = '';
            //Pick up time
            let time = new Date();
            time.setMinutes(time.getMinutes()+20); 
            let pickUpTime = `${time.getHours()}:${time.getMinutes()}`;
            for(let i = 0; i < this.studentCartItems.length; i++){
                itemsList += `<p> ${this.studentCartItems[i]['asset_description']}</p>`;
            }
            this.$swal.fire({
                title: '<strong>Are you sure?</strong>',
                icon: 'question',
                html:
                    `<div id="modalDiv"> 
                        <h5>You are about to reserve the following items:</h5>
                        <div class="reservedItems">
                            ${itemsList}
                        </div>
                    </div>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:'YES',
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
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        let asset_list = "";
                        this.studentCartItems.forEach(function (item) {
                            if (asset_list == "") {
                            asset_list = item.asset_description;
                            } else {
                            asset_list += "|" + item.asset_description;
                            }
                        });
                        const options = {
                            url: "https://portfolio.jerielbenavides.com/signout/services/add_assets_logged_out.php",
                            method: "POST",
                            data: {
                            student_id: this.borrower.student_id,
                            assets: asset_list,
                            },
                        };

                        this.$axios(options)
                            .then((res) => {
                            switch (res.data.error.id) {
                                case 0:
                                    this.$swal.fire({
                                        title: '<strong>DONE</strong>',
                                        icon: 'none',
                                        html:
                                            `<div id="modalDiv"> 
                                                <h5>You have reserved the following items:</h5>
                                                <div class="reservedItems">
                                                    ${itemsList}
                                                </div>
                                            </div>`,
                                        footer: `<footer>
                                                    <p>Please go to room L142 before ${pickUpTime}</p>
                                                    <p>Bring your student ID</p>
                                                </footer>`,
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
                                        })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                this.$router.push({ name: 'profile', params: {isLoggedIn: this.isLoggedIn, borrower: this.borrower }});
                                            }
                                        });

                                    //Clear local variables.
                                    this.studentCartItems = [];
                                    this.$emit("itemSelected", this.studentCartItems);
                                    break;
                                /* add other responses here */
                                default:
                                alert("Something went wrong with reserving your items.");
                                break;
                            }
                            })
                            .catch((err) => {
                            console.error("Get Assets Failed." + err);
                            });
                    }
                });
        },
        removeFromCart: function(index){
            this.studentCartItems.splice(index, 1);
            this.$emit("itemSelected", this.studentCartItems);
        }
    }
}
</script>

<style scoped>
.cart_container{
    overflow: hidden;
}
#cart_img{
    position: absolute;
    width: 35vw;
}
#cart_img img{
    width: 100%;
    min-height: 100vh;
    aspect-ratio: 1;
    /* width: calc(100% + 11vw);
    height: 100vh; */
}
.items_container{
    /* padding: 100px; */
    margin-top: 1em;
    max-height: 65vh;
    overflow-y: auto;
}
.item{
    display: flex;
    place-items: center;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
}
.itemName{
    font-size: 1.5em;
    color: black;
}
#checkOutBttn{
    margin-top: 1em;
}
.deleteFromCart:hover{
    color: red;
    cursor: pointer;
}
.items_container div{
    width: 100%;
}


</style>
