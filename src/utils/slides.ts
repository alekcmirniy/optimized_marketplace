import type { SelectedCategories } from '@/types/interfaces';
import SlideIcon1 from '@/utils/slides/1.svg';
import SlideIcon2 from '@/utils/slides/2.svg';
import SlideIcon3 from '@/utils/slides/3.svg';
import SlideIcon4 from '@/utils/slides/4.svg';
import SlideIcon5 from '@/utils/slides/5.svg';
import SlideIcon6 from '@/utils/slides/6.svg';

type Slide = {
    id: number,
    src: string,
    alt: string,
    loading?: "lazy",
    filter?: string,
    categories?: SelectedCategories
}
type MainSliderType = {
    saleSlide: Slide,
    newsSlide: Slide,
    bestPriceSlide: Slide,
}
type CategoriesSliderType = {
    shoesSlide: Slide
    clothesSlide: Slide,
    accessoriesSlide: Slide
}
const saleSlide: Slide = {id: 1, src: SlideIcon2, alt: "Слайд распродажа", categories: { types: ['Sale'], brands: [], subtypes: {} }};
const newsSlide: Slide = {id: 2, src: SlideIcon1, alt: "Слайд новинки", filter: "created_at"};
const bestPriceSlide: Slide = {id: 3, src: SlideIcon4, alt: "Слайд лучшая цена", filter: "price"};

const shoesSlide: Slide = {id: 4, src: SlideIcon3, alt: "Слайд обувь", loading: "lazy", categories: { types: ['Boots', 'Sneakers', 'Sandals'], brands: [], subtypes: {} }};
const clothesSlide: Slide = {id: 5, src: SlideIcon5, alt: "Слайд обувь", loading: "lazy", categories: { types: ['Jackets'], brands: [], subtypes: {} }};
const accessoriesSlide: Slide = {id: 6, src: SlideIcon6, alt: "Слайд обувь", loading: "lazy", categories: { types: ['Bags'], brands: [], subtypes: {} }};

const mainSliderCollection: MainSliderType = {
    saleSlide,
    newsSlide,
    bestPriceSlide
};

const categoriesSliderCollection: CategoriesSliderType = {
    shoesSlide,
    clothesSlide,
    accessoriesSlide
}

export { mainSliderCollection, categoriesSliderCollection };
export type { Slide, MainSliderType, CategoriesSliderType };