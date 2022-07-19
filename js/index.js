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
        divBodyCard.append(pTagCard, h3TitleCard, pDescCard, pPriceCard, addCarrinho);

        card.append(divImg, divBodyCard);
        cards.appendChild(card);

    }
}

createCards();