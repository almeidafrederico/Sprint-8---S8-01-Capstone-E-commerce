function createCards(){
    let cards = document.getElementById("cards");
    for(let i in data){
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

createCards();

let shoppingCart        = document.getElementById("shoppingCart");
let listShoppingCart = [];

function reloadListShoppingCart() {
    shoppingCart.innerText = "";
    for(let i in listShoppingCart){
        let currentElement = listShoppingCart[i];
        currentElement.id = i;
        shoppingCart.appendChild(currentElement); 
    }

}

function removeShoppingCart(idCard, e){
    
    
    // console.log(listShoppingCart[1].getElementsByClassName("bodyCardCarrinho")[0]);
    // listShoppingCart.splice(idCard, 1);
    let aux = listShoppingCart;
    console.log(aux.length);
    for(let i = 0; i<aux.length; i++){
        console.log(i);
        console.log(aux.length);
        console.log(listShoppingCart[i].getElementsByClassName("bodyCardCarrinho")[0]);
        console.log(e.path[1]);        
        if(listShoppingCart[i].getElementsByClassName("bodyCardCarrinho")[0]==e.path[1]){
            console.log("verdade")
            listShoppingCart.splice(i, 1);  
        }
        console.log("-------------------------------------")
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
    // buttonBodyCardCarrinho.value = listShoppingCart.length;

    buttonBodyCardCarrinho.addEventListener("click", function(){
        removeShoppingCart(buttonBodyCardCarrinho.value, event);
    });

    divBodyCardCarrinho.append(h3BodyCardCarrinho, pBodyCardCarrinho, buttonBodyCardCarrinho);
    cardCarrinho.append(divImg, divBodyCardCarrinho);
    listShoppingCart.push(cardCarrinho);
    reloadListShoppingCart();
}

