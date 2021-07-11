import images from "./galleryItems.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightBoxOverlay = document.querySelector(".lightbox__overlay");
const lightBoxImg = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

let imgIndex = 0;

const addImagesMarkup = (images) => {
  return images
    .map(({ preview, original, description }, idx) => {
      return `
<li class = "gallery__item">
<a 
class = "gallery__link" 
href="${original}"
>
 <img 
class ="gallery__image" 
data-index="${idx}" 
src="${preview}" 
data-source="${original}"
alt="${description}"
/>
</a>
 </li>`;
    })
    .join("");
};


function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  imgIndex = Number(event.target.dataset.index);

  const sourceEl = event.target.dataset.source;
  const altEl = event.target.alt;

  window.addEventListener("keydown",handleSwipe)
  window.addEventListener("keydown", onEscKeyPress);
  lightbox.classList.add("is-open");
  replaceAttribute(sourceEl, altEl);
};

function closeModal() {
window.removeEventListener("keydown", handleSwipe);
window.removeEventListener("keydown", onEscKeyPress);
  lightbox.classList.remove("is-open");
  replaceAttribute("", "");
};

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
};

function onEscKeyPress(event) {
  const isEscKey = event.code === "Escape";
  if (isEscKey) {
    closeModal();
  }
};

function replaceAttribute(src, alt) {
  lightBoxImg.src = src;
  lightBoxImg.alt = alt;
};

const increment = () => {
    if (imgIndex === images.length - 1){
        imgIndex = 0;
        return;
    }
    imgIndex++;
}

const decrement = () => {
    if (imgIndex === 0){
       imgIndex = images.length - 1;
       return ;
    }
    imgIndex--;
}

const handleSwipe = (e) => {
e.code === "ArrowLeft" && decrement();
e.code === "ArrowRight" && increment();
const curImg = images[imgIndex];
replaceAttribute(curImg.original, curImg.description);
}

const imageMarkup = addImagesMarkup(images);
gallery.insertAdjacentHTML("beforeend", imageMarkup);

gallery.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
lightBoxOverlay.addEventListener("click", onOverlayClick);



// const gallery = document.querySelector(".js-gallery");
// const modal = document.querySelector(".js-lightbox");
// const lightBoxOverlay = document.querySelector(".lightbox__overlay");
// const img = document.querySelector(".lightbox__image");
// const btn = document.querySelector('[data-action="close-lightbox"]');

// const items = []

// // galleryItems.forEach(item => {
// // const preview = item.preview;
// // const original = item.original;
// // const description = item.description;
// // let index = "";
// //   item = `
// // <li class="gallery__item">
// // <a href="#" class="gallery__link">
// // <img
// // data-index ="${index}"
// // src="${preview}"
// // data-source="${original}"
// // class="gallery__image"
// // alt="${description}">
// // </a>
// // </li>`
// //   items.push(item)
// // });

// // window.addEventListener("keydown", closeModalUseEsc);

// const imageMarkup = addImagesMarkup(galleryItems);
// function addImagesMarkup(images) {
//   return images
//   .map(({ preview, original, description}, index) => {
//       return `<li class = "gallery__item">
//       <a class = "gallery__link" href="${original}">
//       <img
//       class ="gallery__image"
//       data-index="${index}"
//       src="${preview}"
//       data-source="${description}"/>
//       </a>
//       </li>`;
//     })
//     .join("");
// };
// // function onImgClick(e) {
// //   const targetImg = e.target;
// //   console.log("event target: ", targetImg);
// //   modal.classList.toggle("is-open");
// //   img.src = targetImg.dataset.source;
// // };

// // function onCloseModal(e) {
// //   const targetCloseBtn = e.target;
// //   modal.classList.toggle("is-open")
// //     img.src = ""
// // };

// let Imgindex = 0;

// function onImgClick(e) {
//   e.preventDefault();
//   if (e.target.nodeName === "IMG") {
//     openModal();
//     Imgindex = +e.target.dataset.index;
//   }
//   assignCurrentSrcForLightboxImg(e);
// };

// function openModal(){
// modal.classList.add("is-open");
// modal.addEventListener('click', closeModalByBtnAndOverlay);
// window.addEventListener('keydown', closeModalUseEsc);
// };

// function closeModal() {
//   window.removeEventListener('keydown', closeModalUseEsc);
//   modal.classList.remove("is-open");
// };

// function onOverlayClick(event) {
//   if (event.currentTarget === event.target){
//     closeModal();
//   }
// }

// function closeModalByBtnAndOverlay(e) {
//   if (e.target.nodeName === "BUTTON" || e.target.nodeName === "DIV") {
//     closeModal();
//     changeSrcForLightboxImg("","");
//   }
// };

// function closeModalUseEsc(e) {
//   if (e.target.nodeName === "Escape") {
//     closeModal();
//     changeSrcForLightboxImg("","");
//   }
// };

// function assignCurrentSrcForLightboxImg(e) {
//   const currentImgLink = e.target.dataset.source;
//   const currentImgAlt = e.target.alt;
//   changeSrcForLightboxImg(currentImgLink, currentImgAlt);
// };

// function changeSrcForLightboxImg(src, alt){
//   img.src = src;
//   img.alt = alt;
// };

// // window.addEventListener("keydown", slick);
// // const galleryLength = gallery.length -1;

// // function slick(e) {
// //   if(e.code === "ArrowLeft"){
// //     indexImg -=1;
// //     if (indexImg < 0) indexImg = galleryLength;
// //   }
// //   if (e.code === "ArrowRight"){
// //     indexImg +=1;
// //     if(indexImg > galleryLength) indexImg = 0;
// //   }
// //   const item = gallery[indexImg];
// //   changeSrcForLightboxImg(item.original, item.description);
// // };

// const increment = () => {
//   imgIndex++;
// }
// const decrement = () => {
//   imgIndex--;
// }

// // gallery.insertAdjacentHTML('afterbegin', items.join(" "))
// gallery.insertAdjacentHTML('afterbegin', addImagesMarkup)
// gallery.addEventListener("click", onImgClick);
// btn.addEventListener("click", closeModal);
// lightBoxOverlay.addEventListener("click", onOverlayClick);
