let responsiveBasketOpen = false;

function init(){
    renderAllProductCategories();
    renderBasketItems();
    handleViewportChange();
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
    checkIfBasketItemsListNotNull();
    
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
        rerenderBasketItem(indexBasketItem);
    }else{
        basketItems.push( {
            "name": products[kategorieProduct][indexProduct].name,
            "price": products[kategorieProduct][indexProduct].price,
            "amount": 1,
            "categorie": kategorieProduct,
        });
        renderLastAddedProductInBasket();
    }
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
            rerenderBasketItem(indexBasketItem);
            break;
        case 'minus':
            if(basketItems[indexBasketItem].amount <= 1){
                basketItems.splice(indexBasketItem, 1);
                renderBasketItems()
            }else{
                basketItems[indexBasketItem].amount -= 1;
                rerenderBasketItem(indexBasketItem);
            }
            break;
        default:
            basketItems.splice(indexBasketItem, 1);
            renderBasketItems()
    }
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

function sendOrder(){
    basketItems = [];

    renderBasketItems();
    renderPaymentSection();
    toggleOrderNotification('show');
}

function toggleOrderNotification(operator){
    if(operator == 'show'){
        document.getElementById('main-order_notification').style.display = 'flex';
    }else{
        document.getElementById('main-order_notification').style.display = 'none';
    }
}

function toggleResponsiveBasket(){
        document.getElementById('main-basket').classList.toggle('slide-in');
        document.body.classList.toggle('no-scroll');

        if(responsiveBasketOpen == false){
            responsiveBasketOpen = true;
        }else{
            responsiveBasketOpen = false;
        }
}

function handleViewportChange(){    
    window.matchMedia('(max-width: 655px)').addEventListener("change", (e) => {
        if(e.matches) {
            if(responsiveBasketOpen){
                document.body.classList.add('no-scroll');
            }else{
                document.body.classList.remove('no-scroll');
            }
        }else{
            document.body.classList.remove('no-scroll');
        }
    });
}
     
function rerenderBasketItem(indexBasketItem){
    document.getElementById('main-basket-item_amount-' + indexBasketItem).textContent = basketItems[indexBasketItem].amount + 'x';
    document.getElementById('main-basket-item_price-' + indexBasketItem).textContent = (basketItems[indexBasketItem].amount * basketItems[indexBasketItem].price).toFixed(2).replace('.', ',') + '€';
    renderPaymentSection();
}

function checkIfBasketItemsListNotNull(){
    if(basketItems.length != 0){
        document.getElementById('main-basket-placeholder_for_items').classList.add('d_none');
        document.getElementById('main-basket-payment').classList.remove('d_none');
        document.getElementById('main-basket-order_btn').disabled = false;
    }else{
        document.getElementById('main-basket-placeholder_for_items').classList.remove('d_none');
        document.getElementById('main-basket-payment').classList.add('d_none');
        document.getElementById('main-basket-order_btn').disabled = true;
    }
}

function renderLastAddedProductInBasket(){
    checkIfBasketItemsListNotNull();
    let refBaskte = document.getElementById('main-basket-items');
    refBaskte.insertAdjacentHTML('beforeend', renderOneBasketItem(basketItems.length - 1));
    renderPaymentSection();
}