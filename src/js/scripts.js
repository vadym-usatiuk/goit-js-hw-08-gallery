import galleryItems from "./gallery-items.js";

const refs = {
  ul: document.querySelector(".gallery"),
  div: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightbox: document.querySelector(".lightbox"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxContent: document.querySelector(".lightbox__content")
};

const galleryOverplay = galleryItems.reduce((value, item) => {
  const itemOverplay = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
  </li>`;

  value += itemOverplay;

  return value;
}, "");

refs.ul.insertAdjacentHTML("beforeend", galleryOverplay);
refs.ul.addEventListener("click", handleImgClick);

function handleImgClick(ele) {
  ele.preventDefault();
  if (ele.target === ele.currentTarget) {
    return;
  }
  refs.lightboxImg.src = ele.target.dataset.source;
  refs.lightboxImg.alt = ele.target.getAttribute("alt");
  refs.div.classList.add("is-open");
  window.addEventListener("keydown", handleKeyPress);
}

refs.closeModalBtn.addEventListener("click", closeModal);
refs.lightboxContent.addEventListener("click", handleOverlayClick);

function closeModal() {
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  window.removeEventListener("keydown", handleKeyPress);
}

function handleOverlayClick(occasion) {
  if (occasion.target !== occasion.currentTarget) {
    return;
  }
  closeModal();
}

function handleKeyPress(occasion) {
  if (occasion.code !== "Escape") {
    return;
  }
  closeModal();
}
