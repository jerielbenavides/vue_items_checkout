<template>
    <div class="row container cart_container">
        <div class="col s12 m12 l8">
            <h5>YOUR CART</h5>
            <div class="items_container">
                <div v-for="(item, index) in cartItems" :key="index">
                        <article class="categoryItems" :id="item">
                            <div class="item row">
                                <i :id="`deleteCart-${item}`" class="material-icons col s1 m1 l1 deleteFromCart">delete</i>
                                <label class="col s11 m11 l11">
                                    <span>
                                        <p class="itemName">{{ cartItems[index]['name'] }}</p>
                                        <!-- TODO: Replace with current date and time -->
                                        <!-- Note: This is not really needed IMO -->
                                        <p> Sign Out Date: 18 November 2021, 08:12</p>
                                        <p> Return Date: {{ cartItems[index]['returnDate'] }}</p>
                                    </span>
                                </label>
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                </div>
            </div>
            
            <button id="checkOutBttn" class="btn waves-effect waves-light" type="submit"  @click.prevent="checkOut()" name="Continue">Checkout</button>
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
    components: {
    },
    data() {
    return {
        // TODO: The text date here is an example. Make a parse date method and parse the date object coming from db/api
        cartItems: [{name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'},
        {name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'},
        {name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'},
        {name: 'Canon HD Cam Recorder', returnDate: '20 November 2021, 08:20'}, {name: 'Camera Tripod', returnDate: '20 November 2021, 08:20'}, {name: 'Microphone', returnDate: '20 November 2021, 08:20'}]
    }
    },
    methods: {
        checkOut: function(){
            console.log('Cool! Reserving your stuff...')
            //Clear cart.
            //Show popup
            //build list element
            let itemsList = '';
            for(let i = 0; i < this.cartItems.length; i++){
                itemsList += `<p> ${this.cartItems[i]['name']}</p>`;
            }
                        for(let i = 0; i < this.cartItems.length; i++){
                itemsList += `<p> ${this.cartItems[i]['name']}</p>`;
            }
                        for(let i = 0; i < this.cartItems.length; i++){
                itemsList += `<p> ${this.cartItems[i]['name']}</p>`;
            }
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
                            <p>Please go to room L142 before 13:43</p>
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
