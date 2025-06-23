function init(){
    renderAllProductCategories();
    renderBasketItems();
}

function renderAllProductCategories(){
    renderOneProductCategory('main_courses');
    renderOneProductCategory('side_dishes');
    renderOneProductCategory('drinks');
}

function renderOneProductCategory(categorieId){
    let refMainCourses = document.getElementById(categorieId);

    for (let i = 0; i < products[categorieId].length; i++) {
        refMainCourses.innerHTML += renderOneProductItem(categorieId, i)
    }
}

function renderBasketItems(){
    if(basketItems.length != 0){
        document.getElementById('main-basket-placeholder_for_items').classList.add('d_none');
        document.getElementById('main-basket-payment').classList.remove('d_none');
    }else{
        document.getElementById('main-basket-placeholder_for_items').classList.remove('d_none');
        document.getElementById('main-basket-payment').classList.add('d_none');
    }
    
    let refBaskte = document.getElementById('main-basket-items');
    refBaskte.innerHTML = "";
    for (let j = 0; j < basketItems.length; j++) {
        refBaskte.innerHTML += renderOneBasketItem(j);  
    }

    renderPaymentSection();
}

function addToBasket(kategorieProduct, indexProduct){
    let [checkResult, indexBasketItem] = checkIfAlreadyInBasket(kategorieProduct, indexProduct);
    if(checkResult){
        basketItems[indexBasketItem].amount += 1;
    }else{
        basketItems.push( {
            "name": products[kategorieProduct][indexProduct].name,
            "price": products[kategorieProduct][indexProduct].price,
            "amount": 1,
            "categorie": kategorieProduct,
        });
    }
    renderBasketItems();
}

function checkIfAlreadyInBasket(kategorieProduct, indexProduct){
    for (let i = 0; i < basketItems.length; i++) {
        if(basketItems[i].name == products[kategorieProduct][indexProduct].name && basketItems[i].categorie == kategorieProduct){
            return [true, i]
        }  
    }
    return [false, -1]
}

function updateBasketItem(operation, indexBasketItem){
    switch (operation) {
        case 'plus':
            basketItems[indexBasketItem].amount += 1;
            break;
        case 'minus':
            if(basketItems[indexBasketItem].amount <= 1){
                basketItems.splice(indexBasketItem, 1);
            }else{
                basketItems[indexBasketItem].amount -= 1;
            }
            break;
        default:
            basketItems.splice(indexBasketItem, 1);
    }
    renderBasketItems();
}

function renderPaymentSection(){
    let paySum = 0;
    for (let i = 0; i < basketItems.length; i++) {
        let itemSum = basketItems[i].price * basketItems[i].amount;
        paySum += itemSum;
    }

    let refPayment = document.getElementById('main-basket-payment');
    refPayment.innerHTML = renderPayment(paySum);
}
