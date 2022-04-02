const shirtColor = document.getElementsByClassName("main-image-img")
const FavListStar = document.getElementsByClassName("fav-star-img");
const cardList = document.getElementsByClassName("dynamic_card")
const allCards = document.getElementsByClassName("food-card");
const colors = document.getElementsByClassName("shop-color")
const priceSlider = document.getElementById('priceRange'); 
const test = document.getElementById("shop-color-list");
const shop = document.getElementById("superShop")

const cardHolder = document.getElementById("shoppingCardHolder")
const listHolder = document.getElementById("shopCardListHolder")

var currentShirt = 1
var preColor = 0

var toggleShop = true

var FavList = []
var shoppingCardList = []

if (sessionStorage.getItem('card')) {
    shoppingCardList = sessionStorage.getItem('card').split(",")
}
if (sessionStorage.getItem('favList')) {
    FavList = sessionStorage.getItem('favList').split(",")
    FavList = FavList.map(item => parseInt(item))

    for (let i = 0; i < FavListStar.length; i++) {
        const element = FavListStar[i];
        if (FavList.includes(parseInt(element.dataset.id))) {
            element.src = "img/WatchListCheck.png"
            element.alt = "star yellow"
        }
        
    }
}


const shopFullPage = (item) => {
    cardHolder.style.display = "none"
    listHolder.innerHTML = ""
    toggleShop = true

    const cent = shop.querySelector('.shop-price-small')
    const price = shop.querySelector('.shop-price-text')
    const image = shop.querySelector('.main-image-img')
    const title = shop.querySelector('.top-bar-name')
    const addToFav = shop.querySelector(".stop-fav")

    currentShirt = item
    shop.style.display = "block"
    const dataset = allCards[item - 1].dataset


    image.src = "img/shop/shirt" + item + ".0.png"
    price.innerHTML = dataset.price.split(".")[0]
    cent.innerHTML = "." + dataset.price.split(".")[1]
    title.innerHTML = dataset.title

    if (shoppingCardList.includes(dataset.title)) {
        document.getElementsByClassName("shop-button-text")[0].style.color = "#E85D04"
    } else {
        document.getElementsByClassName("shop-button-text")[0].style.color = "white"
    }

    for (let i = 0; i < FavListStar.length; i++) {
        if (FavList.includes(item)) 
            addToFav.style.color = "#E85D04"
         else 
            addToFav.style.color = "#ffffff"
    }
}

const hideShop = () => {
    shop.style.display = "none"
    preColor = 0
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.border = "#1C2035 2px solid"
    }
    colors[0].style.border = "yellow 2px solid"

}

test.addEventListener("mouseover", (e) => {
    const color = e.target.dataset.color
    if (color) {
        shirtColor[0].src = "img/shop/shirt" + currentShirt + "." + color + ".png"
    }
})

test.addEventListener("mouseleave", (e) => {
    shirtColor[0].src = "img/shop/shirt" + currentShirt + "." + preColor + ".png"
})

const setColor = (color) => {
    preColor = color
    for (let i = 0; i < colors.length; i++) {
        if (i == parseInt(color)) {
            colors[i].style.border = "yellow 2px solid"
        } else {
            colors[i].style.border = "#1C2035 2px solid"
        }
    }
}


const onUpdateFilters = () => {
    let priceValue = priceSlider.value

    if (priceSlider.value < 10) 
        document.getElementById("priceLabel").innerHTML = "&nbsp; " + priceValue
    else 
        document.getElementById("priceLabel").innerHTML = priceValue

    for (let i = 0; i < allCards.length; i++) {
        const element = allCards[i];
        let data = element.dataset

        if (parseFloat(data.price) < priceValue) {
            element.classList.remove("hidePrice")
        } else {
            if (!element.classList.contains("spread_card")){
                element.classList.add("hidePrice")
            }
        }
    }
}
priceSlider.addEventListener("input", onUpdateFilters, false); 

const favText = document.getElementById("favText")
var toggleFav = true
const onUpdateFav = () => {
    for (let i = 0; i < cardList.length; i++) {
        const element = cardList[i];
        const postID = FavListStar[i]
        let cardDataset = postID.dataset

        if (toggleFav) {
            favText.style.color = "#E85D04"
            if (FavList.includes(parseInt(cardDataset.id))) 
                element.classList.remove("hideFav")
            else 
                element.classList.add("hideFav")
        } else {
            favText.style.color = "white"
            element.classList.remove("hideFav")
        }
    }
    toggleFav ^= true
}


const addToFav = (id) => {
    if (!id) id = currentShirt
    if (!FavList.includes(id)){
        FavList.push(id)

        for (let i = 0; i < FavListStar.length; i++) {
            const element = FavListStar[i];
            let data = element.dataset
            if (parseInt(data.id) == id) {
                document.getElementsByClassName("stop-fav")[0].style.color = "#E85D04"
                element.src = "img/WatchListCheck.png"
                element.alt = "star yellow"
            }
        }
    } else {
        FavList.pop(id)

        for (let i = 0; i < FavListStar.length; i++) {
            const element = FavListStar[i];
            let data = element.dataset
            if (parseInt(data.id) == id) {
                document.getElementsByClassName("stop-fav")[0].style.color = "white"
                element.src = "img/addToWatchList.png"
                element.alt = "star black"
            }
        }
    }

    sessionStorage.setItem("favList", FavList);
}


const shoppingCard = () => {
    if (shoppingCardList.length == 0) {
        const liII = document.createElement("li")
        liII.classList.add("card-item")
        liII.innerHTML = "No items in shopping card"
        listHolder.appendChild(liII)
    }

    if (toggleShop) {
        cardHolder.style.display = "block"
        for (let i = 0; i < shoppingCardList.length; i++) {
            const element = shoppingCardList[i];
            const liII = document.createElement("li")
            liII.classList.add("card-item")
            liII.innerHTML = element
            listHolder.appendChild(liII)
        }
    } else {
        cardHolder.style.display = "none"
        listHolder.innerHTML = ""
    }
    toggleShop ^= true
}


const addToShoppingCard = () => {
    const title = document.getElementById("shop-title").innerText
    if (shoppingCardList.includes(title)) {
        document.getElementsByClassName("shop-button-text")[0].style.color = "white"
        shoppingCardList = shoppingCardList.filter(item => item !== title)
    } else {
        document.getElementsByClassName("shop-button-text")[0].style.color = "#E85D04"
        shoppingCardList.push(title)
    }  
    sessionStorage.setItem("card", shoppingCardList);
}

const emptyCard = () => {
    shoppingCardList = []
    cardHolder.style.display = "none"
    listHolder.innerHTML = ""
    toggleShop ^= true
}

const goToCheckout = () => {
    window.location = 'checkout.html';
    sessionStorage.setItem("card", shoppingCardList);
}