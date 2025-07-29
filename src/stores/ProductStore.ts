import { defineStore } from "pinia";
import { productDatabase, Product, type Slide, dailyProduct, bestSlidesData, dailySlidesData, sortCatalogBy, applyFiltersAndCategories } from "@/backend/database";
import axios from "axios";

import type { ProductType } from '@/types/Product.ts';

interface ApiResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<ProductType>
}

export const useProductStore = defineStore("ProductStore", {
    state: () => ({
        //api products
        products: [] as Array<ProductType>,        //потом заменим на интерфейс Product[]
        productsCount: 0,
        isLoading: false,
        error: null as string | null,

        productsStructure: new Map<number, Product>(),
        dailyProduct: dailyProduct as Product,
        bestSlides: bestSlidesData as Array<Slide>,
        dailySlides: dailySlidesData as Array<Slide>,
        filteredProducts: [] as Array<Product>,
        currentFilter: "",
        currentCategories: [] as Array<Array<string>>
    }),

    actions: {

        //api
        async fetchProducts() {
            this.isLoading = true;
            this.error = null;
            try {
                const res = await axios.get<ApiResponse>('/api/products/');
                if (res.status === 200) {
                    this.products = res.data.results;
                    this.productsCount = res.data.count;
                }
                else throw new Error("Некорректный ответ с сервера");
            }
            catch (error: any) {
                this.error = error.message || 'Ошибка загрузки товара';
            }
            finally {
                this.isLoading = false;
            }
        },

        async initializeProductStructure() :Promise<void> {
            this.productsStructure = new Map(productDatabase.map((prod) => [prod.id, prod]));
        },

        async loadBestRating(): Promise<void> {
            return sortCatalogBy(this.allProducts, "best-rating").then(sorted => {
                this.filteredProducts = sorted;
            });
        },

        async applyFilters(filter: string, categories: Array<Array<string>>): Promise<void> {
            this.currentFilter = filter;
            this.currentCategories = categories;
            return applyFiltersAndCategories({
                products: this.allProducts,
                activeFilter: filter,
                selectedCategories: categories
            }).then(filtered => {
                this.filteredProducts = filtered;
            });
        },

        getProductById(id: number): Product | null {
            return this.productsStructure.get(id) as Product || null;
        }
    },
    
    getters: {
        categoriesString: (state) => state.currentCategories.flat().join(", "),
        allProducts: (state) => Array.from(state.productsStructure.values()) as Array<Product>
    },
});