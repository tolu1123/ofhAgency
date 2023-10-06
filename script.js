// setting the background of the header once it has moved to be greater than its own height
let header = document.querySelector('header');

document.addEventListener('scroll', ()=> {
    if (scrollY >= header.offsetHeight) {
        header.style.backgroundColor = '#000';
    }else {
            header.style.backgroundColor = 'transparent';
    }
})

let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0 ,0.25, 0.5, 0.75],
};

// setting the intersection observer api to automatically detect section elements as they enter
// the viewport

  
let sectionsObserver = new IntersectionObserver(sectionCallBack, options);
function sectionCallBack(entries) {
    entries.forEach(entry => {
        const scrollDistance = scrollY;
        const topDistance = entry.target.offsetTop - 160;
        const elementHeight = entry.target.offsetHeight;

        if(entry.isIntersecting && scrollDistance >= topDistance && scrollDistance < topDistance + elementHeight) {
            // remove the style that indicates that the links are active    
            removeActiveClass();

            // get the id of the of the entry
            let id = entry.target.getAttribute('id');

            //find the related links in the DOM
            let links = document.querySelectorAll(`a[href = '#${id}']`);
            links.forEach(link => {
                link.classList.add('text-teal-200');
            })
        }
    })
}
// function to remove the active class
// get the link elements
let navLinks = document.querySelectorAll('nav a');
function removeActiveClass() {
    navLinks.forEach(link => {
        link.classList.remove('text-teal-200');
    })
}

let sections = document.querySelectorAll('.section');
sections.forEach((ele) => {
    sectionsObserver.observe(ele);
})


// Setting the modal
let hamburger = document.querySelector('.hamburger');
let dropDown = document.querySelector('.dropDown');
let state = false;

// Adding the event listener
hamburger.addEventListener('click', () => {
    if(state) {
        // if state is true (meaning that the drop down is opened) we will close it
        hamburger.innerHTML = '<i class="fa-sharp fa-solid fa-bars"></i>';
        dropDown.classList.add('hidden');
        // change the state of the drop down
        state = !state;
    } else {
        // If state is false(meaning that the drop down is closed)
        hamburger.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
        dropDown.classList.remove('hidden');
        // change the state of the dropDown
        state = !state;
    }
})

// Setting the modal for the daylight or dark mode
let rootElement = document.querySelector('html');

let mode = document.querySelector('.mode');
let modeState = false;
let modeDropDown = document.querySelector('.modeDropDown');

let dayLightBtn = document.querySelector('.dayLightBtn');
let darkBtn = document.querySelector('.darkBtn');
 

// Adding the event listener
mode.addEventListener('focus', () => { 
    // if it is focused on 
    // we will open the modeDropdown
    modeDropDown.classList.remove('hidden');
});
 

document.addEventListener('click', (e) => {
    if(!mode.contains(e.target) && !modeDropDown.contains(e.target)) {
        modeDropDown.classList.add('hidden');
    }
})

dayLightBtn.addEventListener('click', () => { 
    // set the modeElement content to indicate dayLightMode is switched on
    mode.innerHTML = dayLightBtn.innerHTML;

    // close the dropdown
    modeDropDown.classList.add('hidden');

    // set the color indicator on the dayLight btn
    dayLightBtn.classList.add('text-teal-400');
    // remove the color indicator on the darkBtn
    darkBtn.classList.remove('text-teal-400');

    
    //Remove the dark mode on the root element
    rootElement.classList.remove('dark');
})

darkBtn.addEventListener('click', () => {
    // set the modeElement content to indicate darkMode is switched on
    mode.innerHTML = darkBtn.innerHTML;

    // close the dropdown
    modeDropDown.classList.add('hidden');

    // set the color indicator on the darkBtn
    darkBtn.classList.add('text-teal-400');
    // remove the color indicator on the dayLight Btn
    dayLightBtn.classList.remove('text-teal-400');

    // Add the dark mode on the root element
    rootElement.classList.add('dark');
})

 
