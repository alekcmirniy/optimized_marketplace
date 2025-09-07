import { defineStore } from "pinia";
import axios from "axios";
import { mainSliderCollection, categoriesSliderCollection } from '@/utils/slides';
import { createURLFromParameters, checkCategoriesEmpty, extractPageNumber } from "@/utils/reusable_functions";
import type { MainSliderType, CategoriesSliderType } from '@/utils/slides';
import type { ProductType, ProductsApiResponse, OrderingsAndSortings, SelectedCategories, PossibleQueryParams } from "@/types/interfaces";

export const useProductStore = defineStore("ProductStore", {
    state: () => ({
        products: [] as Array<ProductType>,
        orderingsAndSortings: {} as OrderingsAndSortings,

        homeBest: {
            products: [] as Array<ProductType>,
            nextPage: null as string | null
        },

        dailyProduct: null as ProductType | null,
        mainSlides: mainSliderCollection as MainSliderType,
        categoriesSlides: categoriesSliderCollection as CategoriesSliderType,

        currentFilter: "",
        currentCategories: { types: [], brands: [], subtypes: {} } as SelectedCategories,

        isLoading: false,
        error: null as string | null,
        nextPage: null as string | null
    }),
    actions: {
        async fetchProducts(filter: string, categories: SelectedCategories, nextPage?: string): Promise<void> {
            this.isLoading = true;
            this.error = null;

            const nextPageNumber = extractPageNumber(nextPage);
            const queries = {
                ordering: filter,
                brand: categories.brands,
                type: categories.types,
                subtype: Array.from(Object.values(categories.subtypes)).flat(Infinity),
                page: nextPageNumber
            } as PossibleQueryParams;

            const url = createURLFromParameters(queries);

            try {
                if (filter && !this.orderingsAndSortings.orderings.map(ordering => ordering.name).includes(filter))
                    throw new Error("Некорректный фильтр!");

                const res = await axios.get<ProductsApiResponse>(url);
                if (res.status === 200) {
                    if (nextPage?.length) {
                        this.products.push(...res.data.results)
                    }
                    else {
                        this.products = res.data.results;
                    }
                    this.nextPage = res.data.next ? res.data.next.substring(res.data.next.indexOf("api/")) : null;
                }
                else throw new Error("Некорректный ответ с сервера при запросе списка товаров!");
            }
            catch (error: unknown) {
                if (error instanceof Error)
                    this.error = error.message || "Ошибка загрузки списка товаров!";
                else 
                    this.error = "Неизвестная ошибка!";
            }
            finally {
                this.isLoading = false;
            }
        },

        async fetchNextPage(fromHome?: string): Promise<void> {
            if (fromHome && this.homeBest.nextPage && !this.isLoading) {
                await this.fetchHomeProducts(this.homeBest.nextPage);
                return;
            }
            if (!this.nextPage || this.isLoading) return;

            await this.fetchProducts(this.currentFilter, this.currentCategories, this.nextPage);
        },

        async fetchHomeProducts(nextPage?: string): Promise<void> {
            this.isLoading = true;
            this.error = null;

            const nextPageNumber = extractPageNumber(nextPage);

            const queries = {
                ordering: "-rating",
                page: nextPageNumber
            } as PossibleQueryParams;

            const url = createURLFromParameters(queries);

            try {
                const res = await axios.get<ProductsApiResponse>(url);
                if (res.status === 200) {
                    if (!nextPage) 
                        this.homeBest.products = res.data.results;
                    else
                        this.homeBest.products.push(...res.data.results);
                    this.homeBest.nextPage = res.data.next ? res.data.next.substring(res.data.next.indexOf("api/")) : null;                
                }
                else throw new Error("Некорректный ответ с сервера при запросе списка товаров домашней страницы!");
            }
            catch (error: unknown) {
                if (error instanceof Error)
                    this.error = error.message || "Ошибка загрузки списка товаров домашней страницы!";
                else
                    this.error = "Неизвестная ошибка!";
            }
            finally {
                this.isLoading = false;
            }
        },
        
        async fetchDailyProduct(): Promise<ProductType | null> {
            this.isLoading = true;
            this.error = null;
            let dailyProduct = null as ProductType | null;
            try {
                const res = await axios.get<ProductType>(`/api/products/random`);
                if (res.status === 200) {
                    dailyProduct = res.data;
                }
                else throw new Error("Некорректный ответ с сервера при запросе товара дня!");
            }
            catch (error: unknown) {
                if (error instanceof Error)
                    this.error = error.message || "Ошибка получения товара дня!";
                else
                    this.error = "Неизвестная ошибка!";
                dailyProduct = null;
            }
            finally {
                this.isLoading = false;
                return dailyProduct;
            }
        },
        
        async fetchFiltersAndCategories(): Promise<void> {
            this.isLoading = true;
            this.error = null;
            try {
                const res = await axios.get<OrderingsAndSortings>(`/api/product-filters`);
                if (res.status === 200) {
                    Object.assign(this.orderingsAndSortings, res.data);
                }
                else throw new Error("Некорректный ответ с сервера при запросе фильтров и категорий!");
            }
            catch (error: unknown) {
                if (error instanceof Error)
                    this.error = error.message || "Ошибка получения фильтров и категорий!";
                else
                    this.error = "Неизвестная ошибка!";
            }
            finally {
                this.isLoading = false;
            }
        },

        async init(): Promise<void> {
            this.currentFilter = "";
            this.currentCategories = { types: [], brands: [], subtypes: {} };
            await Promise.all([
                this.applyFiltersAndCategories(this.currentFilter, this.currentCategories),
                this.fetchFiltersAndCategories()
            ])
        },

        async initDailyProduct(): Promise<void> {
            const daily = await this.fetchDailyProduct();

            if (daily && !this.products.some(product => product.slug === daily.slug))
                this.products.push(daily);
            this.dailyProduct = daily;
        },

        async applyFiltersAndCategories(filter: string, categories: SelectedCategories): Promise<void> {
            this.nextPage = null;
            const cats = checkCategoriesEmpty(categories) ? { types: [], brands: [], subtypes: {} } : categories;
            await this.fetchProducts(filter, cats);
            this.currentFilter = filter;
            this.currentCategories = categories;
        },

        getProductBySlug(slug: string): ProductType | null {
            return this.products.find(item => item.slug === slug) 
            || this.homeBest.products.find(item => item.slug === slug)
            || null;
        }
    },
    
    getters: {
        categoriesString: (state) => {
            const { brands, types, subtypes } = state.currentCategories;
            const parts = [] as Array<string>

            brands.length ? parts.push(brands.join(",")) : null;
            types.length ? parts.push(types.join(",")) : null;
            const subtypesArray = Array.from(Object.values(subtypes));
            subtypesArray.length ? parts.push(subtypesArray.join(",")) : null;          //TODO надо сделать фулл отображение при наведении или раскрывании

            return parts.join(",");
        },
        getMappedProducts: (state) => new Map(state.products.map(prod => [prod.slug, prod]))   //TODO новое поле mappedProducts и метод, который обновляет его при пагинации
    }
});