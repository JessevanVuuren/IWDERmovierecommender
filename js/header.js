const hamburger = document.getElementById("hamb-id")

window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 600px)").matches) {
        hamburger.classList.add("hidehamb")  
    }
})

const openHamburger = () => {

    if (hamburger.classList.contains("hidehamb")) {
        hamburger.classList.remove("hidehamb")
    } else {
        hamburger.classList.add("hidehamb")        
    }
}