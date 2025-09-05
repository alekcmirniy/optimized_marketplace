import SlideIcon1 from '@/utils/slides/Slide1.png';
import SlideIcon2 from '@/utils/slides/Slide2.png';
import SlideIcon3 from '@/utils/slides/Slide3.png';
import SlideIcon4 from '@/utils/slides/Slide4.png';

type Slide = {
    src: string;
    alt: string;
    filter?: string
    categories?: string
}
type MainSliderType = {
    saleSlide: Slide,
    newsSlide: Slide,
    bestPriceSlide: Slide
}
type CategoriesSliderType = {
    shoesSlide: Slide
}

const saleSlide: Slide = { src: SlideIcon1, alt: "Слайд распродажа", categories: "sale"};
const newsSlide: Slide = { src: SlideIcon2, alt: "Слайд новинки", filter: "created_at"};
const bestPriceSlide: Slide = { src: SlideIcon3, alt: "Слайд лучшая цена", filter: "price"};

const shoesSlide: Slide = { src: SlideIcon4, alt: "Слайд обувь", categories: "shoes"};

const mainSliderCollection: MainSliderType = {
    saleSlide: saleSlide,
    newsSlide: newsSlide,
    bestPriceSlide: bestPriceSlide,
};

const categoriesSliderCollection: CategoriesSliderType = {
    shoesSlide: shoesSlide
}

export { mainSliderCollection, categoriesSliderCollection };
export type { Slide, MainSliderType, CategoriesSliderType };