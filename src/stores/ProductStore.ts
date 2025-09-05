import { defineStore } from "pinia";
import { mainSliderCollection, categoriesSliderCollection } from '@/utils/slides';
import type { MainSliderType, CategoriesSliderType } from '@/utils/slides';
import axios from "axios";
import type { ProductType, ProductsApiResponse, OrderingsAndSortings, SelectedCategories } from "@/types/interfaces";

export const useProductStore = defineStore("ProductStore", {
    state: () => ({
        products: [] as Array<ProductType>,
        filteredProducts: [] as Array<ProductType>,
        orderingsAndSortings: {} as OrderingsAndSortings,
        homeBest: {
            products: [] as Array<ProductType>,
            nextPage: null as string | null
        },
        dailyProduct: null as ProductType | null,

        isLoading: false,
        error: null as string | null,

        mainSlides: mainSliderCollection as MainSliderType,
        categoriesSlides: categoriesSliderCollection as CategoriesSliderType,

        currentFilter: "",
        currentCategories: { types: [], brands: [], subtypes: {} } as SelectedCategories,

        nextPage: null as string | null
    }),

    actions: {
        async fetchProducts(url?: string): Promise<void> {
            this.isLoading = true;
            this.error = null;
            try {
                const res = await axios.get<ProductsApiResponse>(url ?? `/api/products/`);
                if (res.status === 200) {
                    if (!url)
                        this.products = res.data.results;
                    else
                        this.products.push(...res.data.results);

                    this.nextPage = res.data.next ? res.data.next.substring(res.data.next.indexOf("api/")) : null;
                }
                else throw new Error("Некорректный ответ с сервера при запросе списка товаров!");
            }
            catch (error: any) {
                this.error = error.message || "Ошибка загрузки списка товаров!";
            }
            finally {
                this.isLoading = false;
            }
        },

        async fetchNextPage(homeFetchPage?: string): Promise<void> {
            if (homeFetchPage && this.homeBest.nextPage) {
                await this.fetchHomeProducts(this.homeBest.nextPage);
                return;
            }

            if (!this.nextPage) return;
            
            if (this.currentFilter) {
                if (this.checkCategoriesEmpty(this.currentCategories))
                    await this.fetchFiltered(this.currentFilter, {types: [], brands: [], subtypes: {}}, this.nextPage);
                else
                    await this.fetchFiltered(this.currentFilter, this.currentCategories, this.nextPage);
            }
            else
                if (this.checkCategoriesEmpty(this.currentCategories))
                    await this.fetchProducts(this.nextPage);
                else
                    await this.fetchFiltered("", this.currentCategories, this.nextPage);
        },

        async fetchFiltered(filter: string | "", categories: SelectedCategories, nextPage?: string): Promise<Array<ProductType>> {
            this.isLoading = true;
            this.error = null;

            const allowed = ['price', '-price', 'created_at', '-rating', '-views'];
            let results = [] as Array<ProductType>;
            let nextPageNumber = nextPage?.match(/\d+/g);
            const url = nextPage ? `/api/products/?ordering=${filter}&page=${nextPageNumber}` : `/api/products/?ordering=${filter}`;

            try {
                if (!allowed.includes(filter)) throw new Error("Некорректный запрос на фильтрацию!");

                const res = await axios.get<ProductsApiResponse>(url);
                if (res.status === 200) {
                    results = res.data.results;
                    this.currentFilter = filter;

                    this.filteredProducts.length ? this.filteredProducts.push(...res.data.results) : this.filteredProducts = res.data.results;
                    this.nextPage = res.data.next ? res.data.next.substring(res.data.next.indexOf("api/")) : null;

                    return results;
                }

                else throw new Error("Некорректный ответ с сервера при запросе списка фильтрованных товаров!");
            }
            catch (error: any) {
                this.error = error.message || "Ошибка загрузки списка фильтрованных товаров!";
                return [];
            }
            finally {
                this.isLoading = false;
            }
        },

        async fetchHomeProducts(nextPage?: string): Promise<void> {
            this.isLoading = true;
            this.error = null;

            let nextPageNumber = this.homeBest.nextPage?.match(/\d+/g);
            const url = this.homeBest.nextPage ? `/api/products/?ordering=-rating&page=${nextPageNumber}` : `/api/products/?ordering=-rating`;

            try {
                const res = await axios.get<ProductsApiResponse>(url);
                if (res.status === 200) {
                    if (!nextPage) 
                        this.homeBest.products = res.data.results;
                    else
                        this.homeBest.products.push(...res.data.results);
                    this.homeBest.nextPage = res.data.next ? res.data.next.substring(res.data.next.indexOf("api/")) : null;                
                }

                else throw new Error("Некорректный ответ с сервера при запросе списка фильтрованных товаров!");
            }
            catch (error: any) {
                this.error = error.message || "Ошибка загрузки списка фильтрованных товаров!";
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
            catch (error: any) {
                this.error = error.message || "Ошибка получения товара дня!";
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
                    this.orderingsAndSortings.brands = res.data.brands;
                    this.orderingsAndSortings.orderings = res.data.orderings;
                    this.orderingsAndSortings.types = res.data.types;
                }
                else throw new Error("Некорректный ответ с сервера при запросе фильтров и категорий!");

            }
            catch (error: any) {
                this.error = error.message || "Ошибка получения фильтров и категорий!";
            }
            finally {
                this.isLoading = false;
            }
        },

        async init(): Promise<void> {
            await this.fetchProducts();
            await this.fetchFiltersAndCategories();
            [this.currentFilter, this.currentCategories] = ["", { types: [], brands: [], subtypes: {} }];
        },

        async initDailyProduct(): Promise<void> {
            const daily = await this.fetchDailyProduct();
            this.dailyProduct = daily;

            if (daily && !this.products.some(product => product.slug === daily.slug))
                this.products.push(daily);
        },

        async applyFiltersAndCategories(filter: string, categories: SelectedCategories)
        : Promise<void> {
            let baseProducts = [] as Array<ProductType>;

            if (filter && !this.checkCategoriesEmpty(categories)) {
                baseProducts = await this.fetchFiltered(filter, categories);
            }
            else if (filter && this.checkCategoriesEmpty(categories)) {
                baseProducts = await this.fetchFiltered(filter, {types: [], brands: [], subtypes: {}});
            }
            else if (!filter && !this.checkCategoriesEmpty(categories)) {
                baseProducts = await this.fetchFiltered(this.currentFilter, categories);
            }
            else {
                return;
            }
            
            this.filteredProducts = baseProducts;
            this.currentFilter = filter;
            this.currentCategories = categories;
            console.log(this.nextPage);
        },

        checkCategoriesEmpty(categories: SelectedCategories): boolean {
            if (categories.brands.length === 0 &&
                categories.types.length === 0 &&
                !Object.entries(categories.subtypes).some(arr => arr[0].length > 0 || arr[1].length > 0)
            ) return true;
            else return false;
        },

        getProductBySlug(slug: string): ProductType | null {
            return this.products.find(item => item.slug === slug) 
            || this.filteredProducts.find(item => item.slug === slug) 
            || this.homeBest.products.find(item => item.slug === slug)
            || null;
        }
    },
    
    getters: {
        categoriesString: (state) => {
            const brandsString = state.currentCategories.brands.join(",");
            const typesString = state.currentCategories.types.join(",");
            const subtypesObject = state.currentCategories.subtypes;
            console.log(subtypesObject);
            if (Object.values(subtypesObject).length < 0) {
                return typesString.concat(brandsString);
            }
            else {
                let fullSubtypesString = "";
                for (const type in Object.keys(subtypesObject)) {
                    let subtypesString = "";
                    if (subtypesObject[type]) {
                        subtypesString = subtypesObject[type].join(",");
                    }
                    fullSubtypesString.concat(subtypesString);
                }
                return fullSubtypesString.concat(brandsString);
            }
        },
        getMappedProducts: (state) => new Map(state.products.map(prod => [prod.slug, prod]))
    }
});