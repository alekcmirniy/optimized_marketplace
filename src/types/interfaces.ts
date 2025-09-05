export interface ProductType {
    name: string,
    description: string,
    price: string,
    created_at: string,
    rating: number,
    views: number,
    brand: number,
    type: string,
    slug: string,
    images: Array<ProductImage>,
    sizes: Array<ProductSize>,
    subtypes: Array<ProductSubtypes>,
    attributes: Array<ProductAttributes>
}
interface ProductImage {
    image: string,
    is_preview: boolean
}
interface ProductSize {
    size: string,
    quantity: number
}
interface ProductSubtypes {
    name: string
}
interface ProductAttributes {
    name: string,
    value: string,
    unit: string
}
export interface Category {
    name: string,
    subtypes: Array<ProductSubtypes>
}
export interface Brand {
    name: string
}
interface Ordering {
    name: string
}
export interface SelectedCategories {
    types: Array<string>,
    brands: Array<string>,
    subtypes: Record<string, Array<string>>
}
export interface ProductsApiResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<ProductType>
}
export interface OrderingsAndSortings {
    types: Array<Category>,
    brands: Array<Brand>,
    orderings: Array<Ordering>
}