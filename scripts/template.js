function renderOneProductItem(kategorieProduct, indexProduct){
    return /*html*/`<div class="main-content-categorie_item" onclick="addToBasket('${kategorieProduct}', ${indexProduct})">
                        <h4>${products[kategorieProduct][indexProduct].name}</h4>
                        <p>${products[kategorieProduct][indexProduct].description}</p>
                        <p>${products[kategorieProduct][indexProduct].price.toFixed(2).replace('.', ',')}€</p>
                        <div class="main-content-categorie_plus">
                            <img src="./assets/icons/plus-solid.svg" alt="">
                        </div>
                    </div>`
}

function renderOneBasketItem(indexBasketItem){
    return /*html*/`<div>
                        <h5>${basketItems[indexBasketItem].name}</h5>
                        <div class="main-basket-items-structure">
                            <div onclick="updateBasketItem('minus', ${indexBasketItem})"><img src="./assets/icons/minus-solid.svg" alt=""></div>
                            <p>${basketItems[indexBasketItem].amount}x</p>
                            <div onclick="updateBasketItem('plus', ${indexBasketItem})"><img src="./assets/icons/plus-solid.svg" alt=""></div>
                            <p>${(basketItems[indexBasketItem].price*basketItems[indexBasketItem].amount).toFixed(2).replace('.', ',')}€</p>
                            <div onclick="updateBasketItem('delete', ${indexBasketItem})"><img src="./assets/icons/trash-solid.svg" alt=""></div>
                        </div>
                    </div>
                    `
}

function renderPayment(paySum){
    return /*html*/`<div class="main-basket-content-separator"></div>
                    <div class="main-basket-payment-amounts">
                        <div class="space-between grey-text">
                            <span>Zwischensumme</span>
                            <span>${paySum.toFixed(2).replace(".", ",")}€</span>
                        </div>
                        <div class="space-between grey-text">
                            <span>Lieferkosten</span>
                            <span>5,00€</span>
                        </div>
                        <div class="space-between">
                            <span><b>Gesamt</b></span>
                            <span><b>${(paySum + 5).toFixed(2).replace(".", ",")}€</b></span>
                        </div> 
                    </div>
                    `
}