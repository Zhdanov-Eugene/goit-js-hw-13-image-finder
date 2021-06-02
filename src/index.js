import ImagesApi from './apiService';

import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import "../node_modules/@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import cardTamplate from './tamplates/card-markup';
import './sass/main.scss';

const formRef = document.querySelector('#search-form');
const loadBtnRef = document.querySelector('.load-button');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', onSearchBtn);
loadBtnRef.addEventListener('click', onLoadBtnClick);
galleryRef.addEventListener('click', onImageClick);

const imagesApi = new ImagesApi();

function onSearchBtn(e) {
    e.preventDefault();

    imagesApi.query = e.currentTarget.elements.query.value;

    imagesApi.resetPage();
    clearMarkup();
    getImages();

    loadBtnRef.disabled = false;
}

function onLoadBtnClick() {
    getImages();

    galleryRef.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}


async function getImages() {

    try {
        const imagesArray = await imagesApi.fatchImages();
        console.log(imagesArray);

        if (!imagesArray.length) {
            alert({
                text: 'Nothing on your request!',
                delay: 2000,
            });
        }

        createCardMarkup(imagesArray);
    } catch (error) {
        console.log(error);
    }
}

function createCardMarkup(images) {
    galleryRef.insertAdjacentHTML('beforeend', cardTamplate(images));
}

function clearMarkup() {
    galleryRef.innerHTML = '';
}

function onImageClick(event) {
    const isImage = event.target.classList.contains('gallery-image');

    if (!isImage) {
        return;
    }

    const largeImageSrc = event.target.getAttribute('data-original');
    const instance = basicLightbox.create(`
        <img src="${largeImageSrc}" width="800" height="600">
    `)
    instance.show()
}