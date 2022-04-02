const checkoutList = document.getElementById("checkoutList")

var shoppingCardList = []

if (sessionStorage.getItem('card')) {
    shoppingCardList = sessionStorage.getItem('card').split(",")
}

priceList = [
    {name:"Classic Poster", price: "12.50"},
    {name:"New Mind", price: "50.23"},
    {name:"Dynamic Poster", price: "72.23"},
    {name:"Deep Vision", price: "25.54"},
    {name:"Simple Truth", price: "66.77"},
    {name:"Static Vision", price: "43.21"}
]

const cardItem = (name, price) => `
    <h1 class="item-name">${name}</h1>
    <h1 class="item-name">€ ${price}</h1>
`


if (shoppingCardList.length > 0) {
    var Total = 0
    for (let i = 0; i < shoppingCardList.length; i++) {
        const element = shoppingCardList[i];
        const price = priceList.filter(e => e.name == element)[0].price
        const item = document.createElement("section")
        item.classList.add("card-item")
        item.innerHTML = cardItem(element, price)
        checkoutList.appendChild(item)
        Total += parseFloat(price)
    }
    const item = document.createElement("section")
    item.classList.add("card-item")
    item.innerHTML = cardItem("Total", Total.toFixed(2))
    checkoutList.appendChild(item)
} else  {
    const item = document.createElement("section")
    item.classList.add("card-item")
    item.innerHTML = `<h1 class="item-name">No items in shopping cart</h1>`
    checkoutList.appendChild(item)
}

const form  = document.getElementById('checkoutForm');

form.addEventListener('submit', (event) => {
    event.preventDefault()
    alert('U zou nu naar de betaal pagina gebracht worden')
});