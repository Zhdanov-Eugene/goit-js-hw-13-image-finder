const KEY = '21789749-6de12aa5ab416fe119ffd7e9c';

export default class ImagesApi {
    constructor() {
        this.query = '';
        this.page = 1;
    }

    async fatchImages() {
        console.log('Запрос: ', this)
        const response = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${KEY}`);
        const parsedResponse = await response.json();
        const images = await parsedResponse.hits;
        this.incrementPage();
        return images;
    }

    incrementPage() {
        console.log('После запроса если все ок: ', this)
        this.page += 1;
    }

    resetPage() {
        console.log('Начальное значение до запроса или сброс: ', this)
        this.page = 1;
    }
}