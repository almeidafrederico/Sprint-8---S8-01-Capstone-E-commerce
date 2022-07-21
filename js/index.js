function reloadCards(tag, product){
    let cards = document.getElementById("cards");
    cards.innerText = "";
    if(!product){
        product = "";
    }
    for(let i in data){
        let spl = data[i].nameItem.split(" ");
        let auxFilter = spl.filter((churros) => product.toLowerCase()==churros.toLowerCase())
        if(tag===data[i].tag[0] || !tag || auxFilter[0]){
            let card            = document.createElement("li");
            card.classList.add("card");

            let divImg          = document.createElement("div");
            divImg.classList.add("img");
            let divBodyCard     = document.createElement("div");
            divBodyCard.classList.add("bodyCard");

            let img             = document.createElement("img");
            img.src = data[i].img;
            img.alt = data[i].nameItem;
            divImg.appendChild(img);

            let pTagCard        = document.createElement("p");
            let h3TitleCard     = document.createElement("h3");
            let pDescCard       = document.createElement("p");
            let pPriceCard      = document.createElement("p");
            let addCarrinho     = document.createElement("button");

            pTagCard.classList.add("tagCard");
            h3TitleCard.classList.add("titleCard");
            pDescCard.classList.add("descCard");
            pPriceCard.classList.add("priceCard");

            pTagCard.innerText = data[i].tag;
            h3TitleCard.innerText = data[i].nameItem;
            pDescCard.innerText = data[i].description;
            pPriceCard.innerText = `R$ ${data[i].value.toFixed(2)}`;
            addCarrinho.innerText = "Adicionar ao carrinho";
            addCarrinho.value = i;

            addCarrinho.addEventListener("click", function(){
                addShoppingCart(addCarrinho.value);
            });

            divBodyCard.append(pTagCard, h3TitleCard, pDescCard, pPriceCard, addCarrinho);

            card.append(divImg, divBodyCard);
            cards.appendChild(card);
        }
    }
}

reloadCards();

let shoppingCart        = document.getElementById("shoppingCart");
let listShoppingCart = [];

function reloadSummaryShoppingCart(){

    let resumoCarrinhoDeCompras     = document.getElementById("resumoCarrinhoDeCompras");
    resumoCarrinhoDeCompras.innerText = "";
    if(!listShoppingCart.length){
        resumoCarrinhoDeCompras.classList = "";
    }else{
        resumoCarrinhoDeCompras.classList = "resumoCarrinhoDeCompras";    
        let div1                        = document.createElement("div");
        let div2                        = document.createElement("div");

        h4Div1                          = document.createElement("h4");
        h4Div1.innerText                = "Quantidade:";
        pDiv1                           = document.createElement("p");
        pDiv1.innerText                 = listShoppingCart.length;
        pDiv1.id                      = "qtdCarrinho";
        div1.append(h4Div1,pDiv1);

        auxPrice = 0;    
        for(let i in listShoppingCart){
            let dataIndex = listShoppingCart[i].querySelector("button").value;
            auxPrice += data[dataIndex].value;
        }

        h4Div2                          = document.createElement("h4");
        h4Div2.innerText                = "Total:";
        pDiv2                           = document.createElement("p");
        pDiv2.id                        = "priceCarrinho";
        pDiv2.innerText         = `R$ ${auxPrice.toFixed(2)}`
        div2.append(h4Div2,pDiv2);

        resumoCarrinhoDeCompras.append(div1,div2);
    }

}

function emptyShoppingCart(){
    let livazio = document.createElement("li");
    livazio.classList.add("emptyShoppingCart");
    let h1vazio = document.createElement("h3");
    let pvazio  = document.createElement("p"); 
    h1vazio.innerText   = "Carrinho vázio"
    pvazio.innerText    = "Adicione itens"
    livazio.append(h1vazio, pvazio)
    shoppingCart.appendChild(livazio)
}

function reloadListShoppingCart() {
    shoppingCart.innerText = "";
    if(!listShoppingCart.length){
        emptyShoppingCart();
    }
    for(let i in listShoppingCart){
        let currentElement = listShoppingCart[i];
        currentElement.id = i;
        shoppingCart.appendChild(currentElement); 
    }
    reloadSummaryShoppingCart();
}

reloadListShoppingCart();

function removeShoppingCart(idCard, e){
    listShoppingCart = listShoppingCart.filter((product) => e.path[1] !== product.getElementsByClassName("bodyCardCarrinho")[0])
    reloadListShoppingCart();
}


function addShoppingCart(idCard){
    let cardCarrinho        = document.createElement("li");
    cardCarrinho.classList.add("cardCarrinho");

    let divImg              = document.createElement("div");
    divImg.classList.add("img");
    let img                 = document.createElement("img");
    img.src = data[idCard].img;
    img.alt = data[idCard].nameItem;
    divImg.appendChild(img);

    let divBodyCardCarrinho = document.createElement("div");
    divBodyCardCarrinho.classList.add("bodyCardCarrinho");
    let h3BodyCardCarrinho      = document.createElement("h3");
    let pBodyCardCarrinho       = document.createElement("p");
    let buttonBodyCardCarrinho  = document.createElement("button");

    h3BodyCardCarrinho.innerText = data[idCard].nameItem
    pBodyCardCarrinho.innerText = `R$ ${data[idCard].value.toFixed(2)}`
    buttonBodyCardCarrinho.innerText = "Remover do carrinho";
    buttonBodyCardCarrinho.value = idCard;

    buttonBodyCardCarrinho.addEventListener("click", function(){
        removeShoppingCart(buttonBodyCardCarrinho.value, event);
    });

    divBodyCardCarrinho.append(h3BodyCardCarrinho, pBodyCardCarrinho, buttonBodyCardCarrinho);
    cardCarrinho.append(divImg, divBodyCardCarrinho);
    listShoppingCart.push(cardCarrinho);
    reloadListShoppingCart();
}


function addEventListenerNav (){
    let todosSearch = document.getElementById("todosSearch");
    let accesSearch = document.getElementById("accesSearch");
    let shoesSearch = document.getElementById("shoesSearch");
    let shirtSearch = document.getElementById("shirtSearch");

    todosSearch.addEventListener("click", function(){
        reloadCards();
    });
    accesSearch.addEventListener("click", function(){
        reloadCards("Acessórios");
    });
    shoesSearch.addEventListener("click", function(){
        reloadCards("Calçados");
    });
    shirtSearch.addEventListener("click", function(){
        reloadCards("Camisetas");
    });
}
addEventListenerNav();

function addSearchNameItem (){
    let search              = document.getElementById("search");
    let searchName          = document.getElementById("searchName");

    search.addEventListener("click", function(){
        if(!searchName.value){
            reloadCards();
        }else{
            reloadCards("#", searchName.value)
        }
    });
}
addSearchNameItem();
