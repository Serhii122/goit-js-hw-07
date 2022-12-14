import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

class Gallery {
    #imgs;
    #lightbox; 

    constructor(galleryItems) {
        const galleryElem = document.querySelector(".gallery");
        this.imgs = [];
        this.instance = null;
        this.keyListener = (event) => {
            event.preventDefault();
            if(event.code === "Escape" && this.instance){
                this.instance.close();
            }
        };

        galleryItems.forEach((element) => {
            const img = document.createElement("IMG");
            const linkElem = document.createElement("A");
            
            linkElem.classList.add('gallery__item');
            linkElem.setAttribute("href", element.original)
        
            img.classList.add("gallery__image");
            img.setAttribute('src', element.preview);
            img.setAttribute('alt', element.description);
            
            linkElem.append(img);
            this.imgs.push(linkElem);
        });
        
        galleryElem.append(...this.imgs);

        this.lightbox = new SimpleLightbox('.gallery__item', { 
            captions: true,
            captionSelector: 'img',
            captionType: 'attr',
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250
         });
        
    }
};

new Gallery(galleryItems);