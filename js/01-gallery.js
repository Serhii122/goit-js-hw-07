import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

class Gallery {
    #imgs;
    #instance ;
    #keyListener;

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
            const divElem = document.createElement("DIV");
            
            divElem.classList.add('gallery__item');
            
            linkElem.classList.add('gallery__link');
            linkElem.setAttribute("href", element.original)
        
            img.classList.add("gallery__image");
            img.setAttribute('src', element.preview);
            img.setAttribute('data-src', element.original);
            img.setAttribute('alt', element.description);
            
            linkElem.append(img);
            divElem.append(linkElem);
            this.imgs.push(divElem);
        });
        
        galleryElem.append(...this.imgs);
        
        galleryElem.addEventListener("click", (event) => {
            event.preventDefault();
            if(!event.target.dataset.src){
                return; 
            }
            this.instance = basicLightbox.create(
                `<img 
                src="${event.target.dataset.src}" 
                alt="${event.target.getAttribute("alt")}" 
                />`,
            {
                onShow: () => {
                    document.addEventListener("keydown", this.keyListener);
                },
                onClose: () => {
                    document.removeEventListener("keydown", this.keyListener);
                }
            });
            this.instance.show();
        });
    }
};

new Gallery(galleryItems);