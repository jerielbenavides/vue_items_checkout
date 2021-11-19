<template>
    <div class="row container cart_container">
        <div class="col s12 m12 l4">
            <h5>YOUR CART</h5>
            <div class="items_container">
                <div v-for="(item, index) in cartItems" :key="index">
                        <article class="categoryItems" :id="item">
                            <div class="item">
                                <label>
                                    <span>
                                        <p class="itemName">{{ cartItems[index]['name'] }}</p>
                                        <!-- TODO: Replace with current date and time -->
                                        <!-- Note: This is not really needed IMO -->
                                        <p> Sign Out Date: 18 November 2021, 08:12</p>
                                        <p> Return Date: {{ cartItems[index]['returnDate'] }}</p>
                                    </span>
                                    <i :id="`deleteCart-${item}`" class="material-icons deleteFromCart">delete</i>
                                </label>
                                
                            </div>
                        
                            <div class="divider"></div>
                        </article> 
                </div>
            </div>
            
            <button id="addtoCartbttn" class="btn waves-effect waves-light" type="submit" name="Continue">Checkout</button>
        </div>
        <div class="col l8 hide-on-med-and-down">
            <div id="cart_img">
                <img src="../assets/camera.jpg">
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
}
}
</script>

<style scoped>
.cart_container{
    overflow: hidden;
}
#cart_img{
    position: absolute;
    width: 62.5vw;
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
.itemName{
    font-size: 1.5em;
    color: black;
}
#addtoCartbttn{
    margin-top: 1em;
}
.deleteFromCart:hover{
    color: red;
    cursor: pointer;
}
</style>
