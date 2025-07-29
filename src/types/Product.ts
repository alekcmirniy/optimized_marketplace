export interface ProductType {
    name: string,
    description: string,
    price: string,
    created_at: string,
    brand: number,
    type: number,
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