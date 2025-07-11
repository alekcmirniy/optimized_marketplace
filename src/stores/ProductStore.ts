import { defineStore } from "pinia";
import { productDatabase, Product, type Slide, dailyProduct, bestSlidesData, dailySlidesData, sortCatalogBy, applyFiltersAndCategories } from "@/backend/database";

export const useProductStore = defineStore("ProductStore", {
    state: () => ({ 
        products: productDatabase as Array<Product>,
        dailyProduct: dailyProduct as Product,
        bestSlides: bestSlidesData as Array<Slide>,
        dailySlides: dailySlidesData as Array<Slide>,
        filteredProducts: [] as Array<Product>,
        currentFilter: "",
        currentCategories: [] as Array<Array<string>>
    }),

    actions: {
        async loadBestRating(): Promise<void> {
            return sortCatalogBy(this.products as Array<Product>, "best-rating").then(sorted => {
                this.products = sorted;
            });
        },  
        
        async applyFilters(filter: string, categories: Array<Array<string>>): Promise<void> {
            this.currentFilter = filter;
            this.currentCategories = categories;
            return applyFiltersAndCategories({
                products: this.products as Array<Product>,
                activeFilter: filter,
                selectedCategories: categories
            }).then(filtered => {
                this.filteredProducts = filtered;
            });
        },

        getProductById(id: number): Product | null {
            return this.products.find(product => product.id === id) as Product || null;
        }
    },
    
    getters: {
        categoriesString: (state) => state.currentCategories.flat().join(", ")
    }
});