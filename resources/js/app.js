import axios from 'axios'
import Noty from 'noty'

console.log(`hello from app js file`)

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

addToCart.forEach( btn => {
    btn.addEventListener('click', e => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza)
    })
})

function updateCart(pizza){
    axios.post('/update-cart',pizza)
        .then(res => {
            // console.log(res)
            cartCounter.innerHTML = res.data.totalQty
            new Noty({
                type : 'success',
                timeout: 1000,
                progressBar: false,
                text : 'Item added to cart'
            }).show()
        })
        .catch(err => {
            console.log('error in post request of add cart',err)
            new Noty({
                type : 'error',
                timeout: 1000,
                progressBar: false,
                text : 'Something went wrong'
            }).show()
        })
}