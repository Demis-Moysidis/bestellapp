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