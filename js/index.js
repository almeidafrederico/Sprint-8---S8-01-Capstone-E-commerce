function reloadCards(tag, product){
    let cards = document.getElementById("cards");
    cards.innerText = "";
    if(!product){
        product = "";
    }
    for(let i in data){
        if(tag===data[i].tag[0] || !tag || product.toLowerCase()===data[i].nameItem.toLowerCase()){
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
    let qtdCarrinho     = document.getElementById("qtdCarrinho");
    let priceCarrinho   = document.getElementById("priceCarrinho");

    qtdCarrinho.innerText = listShoppingCart.length;

    auxPrice = 0;    
    for(let i in listShoppingCart){
        let dataIndex = listShoppingCart[i].querySelector("button").value;
        auxPrice += data[dataIndex].value;
    }
    priceCarrinho.innerText = `R$ ${auxPrice.toFixed(2)}`
}

function reloadListShoppingCart() {
    shoppingCart.innerText = "";
    for(let i in listShoppingCart){
        let currentElement = listShoppingCart[i];
        currentElement.id = i;
        shoppingCart.appendChild(currentElement); 
    }
    reloadSummaryShoppingCart();
}

function removeShoppingCart(idCard, e){
    
    
    // console.log(listShoppingCart[1].getElementsByClassName("bodyCardCarrinho")[0]);
    // listShoppingCart.splice(idCard, 1);

    for(let i in listShoppingCart){
        // console.log(i);
        // console.log(aux.length);
        // console.log(listShoppingCart[i].getElementsByClassName("bodyCardCarrinho")[0]);
        // console.log(e.path[1]);        
        if(listShoppingCart[i].getElementsByClassName("bodyCardCarrinho")[0]==e.path[1]){
            // console.log("verdade")
            listShoppingCart.splice(i, 1);  
        }
        // console.log("-------------------------------------")
    }
    // listShoppingCart = listShoppingCart.filter((_, index) => index !== Number(e.path[1].id))
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
