const castList = document.getElementsByClassName("scroll-view")



const cardTemplate = (name, character) => {
    return `
            <img class="cast-img" src="./img/cast/${name}.jpg" alt="${name}">
            <h4 class="highlight cast-name">${name}</h4>
            <p class="text cast-char">${character}</p>
    `
}

const castData = [
    {
        "name": "Bradley Cooper",
        "character": "Eddie Morra",
    },
    {
        "name": "Robert De Niro",
        "character": "Carl Van Loon",
    },
    {
        "name": "Abbie Cornish",
        "character": "Lindy",
    },
    {
        "name": "Andrew Howard",
        "character": "Gennady",
    },
    {
        "name": "Anna Friel",
        "character": "Melissa",
    },
    {
        "name": "Johnny Whitworth",
        "character": "Vernon",
    },
    {
        "name": "Tomas Arana",
        "character": "Man in Tan Coat",
    },
    {
        "name": "Robert John",
        "character": "Pierce",
    },
    {
        "name": "Darren Goldstein",
        "character": "Kevin Doyle",
    },
    {
        "name": "Ned Eisenberg",
        "character": "Morris Brandt",
    },
    {
        "name": "T.V. Carpio",
        "character": "Valerie",
    },
    {
        "name": "Richard Bekins",
        "character": "Hank Atwood",
    },
    {
        "name": "Patricia Kalember",
        "character": "Mrs. Atwood",
    },
    {
        "name": "Cindy Katz",
        "character": "Marla Sutton",
    },
    {
        "name": "Brian Wilson",
        "character": "Detective",
    },
    {
        "name": "Rebecca Dayan",
        "character": "Rebecca Dayan",
    },
    {
        "name": "Nina Hodoruk",
        "character": "Realtor",
    },
    {
        "name": "Daniel Breaker",
        "character": "Campaign Manager",
    },
    {
        "name": "Dave Droxler",
        "character": "Technician",
    },
    {
        "name": "Simon MacLean",
        "character": "Father Skater",
    },
    {
        "name": "Caroline Winberg",
        "character": "Maria Winberg",
    },
    {
        "name": "Damaris Lewis",
        "character": "Beautiful Woman",
    },
    {
        "name": "Ann Talman",
        "character": "Loon's Assistant",
    },
    {
        "name": "Eddie J. Fernand",
        "character": "Gennady Thug",
    }
]


const castScroll = document.querySelector('.scroll-view');

let castMouseDown = false;
let castStartX, castScrollLeft;

const startDragging = (e) => {
  castMouseDown = true;
  castStartX = e.pageX - castScroll.offsetLeft;
  castScrollLeft = castScroll.scrollLeft;
};

const stopDragging = (e) => {
  castMouseDown = false;
};

const moveMouse = (e) => {
    e.preventDefault();
    if(!castMouseDown) { return; }
    const x = e.pageX - castScroll.offsetLeft;
    const scroll = x - castStartX;
    castScroll.scrollLeft = castScrollLeft - scroll;
}

castScroll.addEventListener('mousemove', moveMouse);
castScroll.addEventListener('mousedown', startDragging, false)
castScroll.addEventListener('mouseup', stopDragging, false)
castScroll.addEventListener('mouseleave', stopDragging, false)


const videoScroll = document.querySelector('.video-row');

let videoMouseDown = false;
let videoStartX, videoScrollLeft;

const videoStartDragging = (e) => {
    videoMouseDown = true;
    videoStartX = e.pageX - videoScroll.offsetLeft;
    videoScrollLeft = videoScroll.scrollLeft;
};

const videoStopDragging = (e) => {
    videoMouseDown = false;
};

const videoMove = (e) => {
    e.preventDefault();
    if(!videoMouseDown) { return; }
    const x = e.pageX - videoScroll.offsetLeft;
    const scroll = x - videoStartX;
    videoScroll.scrollLeft = videoScrollLeft - scroll;
}

videoScroll.addEventListener('mousemove', videoMove);
videoScroll.addEventListener('mousedown', videoStartDragging, false)
videoScroll.addEventListener('mouseup', videoStopDragging, false)
videoScroll.addEventListener('mouseleave', videoStopDragging, false)


let loadCast = false
let loadVideo = false


const scrollAnimation = (e) => {
    let castHeight = castScroll.getBoundingClientRect().top
    let video = videoScroll.getBoundingClientRect().top
    
    let screenHeight = window.innerHeight
    let animationSleep = 0;

    if (castHeight < screenHeight && !loadCast) {
        loadCast = true
        castData.map(e => {
            const castCard = document.createElement("section")
            castCard.className = "cast-member"
            castCard.style.cssText = "animation-delay:" + animationSleep + "s;"
            castCard.innerHTML = cardTemplate(e.name, e.character)
            castList[0].appendChild(castCard)
            animationSleep += 0.15
        })
    }


    if (video < screenHeight && !loadVideo) {
        loadVideo = true
        videoScroll.style.cssText = "animation:fadeIn 2s;"
    }
}
window.addEventListener("scroll", scrollAnimation)