document.addEventListener('DOMContentLoaded', function() {
    fixedNavegation()
    createGalery()
    highlightLinks()
    scrollNav()
})

function fixedNavegation() {
    const header = document.querySelector('.header')
    const about_festival = document.querySelector('.about-festival')

    document.addEventListener('scroll', function() {
        if(about_festival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function createGalery() {

    const quantity_images = 16
    const gallery = document.querySelector('.gallery-image')

    for(let i = 1; i <= quantity_images; i++) {
        const image = document.createElement('IMG')
        image.src = `src/img/gallery/full/${i}.jpg`
        image.alt = 'Imagen Galería'
        
        // Event Handler
        image.onclick = function() {
            showImage(i)
        }

        gallery.appendChild(image)
    }
}

function showImage(i){
    const image = document.createElement('IMG')
    image.src = `src/img/gallery/full/${i}.jpg`
    image.alt = 'Imagen Galería'

    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = closeModal

    const closeModalBtn = document.createElement('BUTTON')
    closeModalBtn.textContent = 'X'
    closeModalBtn.classList.add('btn-close')
    closeModalBtn.onclick = closeModal

    modal.appendChild(image)
    modal.appendChild(closeModalBtn)

    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function closeModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 300);
}

function highlightLinks() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const nav_links = document.querySelectorAll('.main-navegation a')

        let actual = '';
        sections.forEach( section => {
            const section_top = section.offsetTop
            const section_height = section.clientHeight

            if(window.scrollY >= (section_top - section_height / 3)){
                actual = section.id
            }
        })

        nav_links.forEach( link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' +  actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const nav_links = document.querySelectorAll('.main-navegation a')

    nav_links.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            const section_scroll = e.target.getAttribute('href')
            const section = document.querySelector(section_scroll)

            section.scrollIntoView({ behavior: 'smooth' })
        })
    })
}