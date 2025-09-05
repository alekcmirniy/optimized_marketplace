<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />

        <ToTopButton :showButton="userPositionCheck" />

        <CategoriesSection :currentCategories="currentCategories" 
        @categories-section-open="openCategoriesSection" 
        @reset-categories="useModal('reset-categories')" />

        <CategoriesModal v-if="categoriesIsOpen" @close="categoriesIsOpen = false" @use-categories="useCategories" />
        
        <FilterSection :activeFilter="currentFilter"
        @use-filters="useFilters"
        @filter-section-open="openFilterSection" 
        @reset-filters="useModal('reset-filters')" />

        <FilterModal v-if="filtersIsOpen" @close="filtersIsOpen = false" @use-filters="useFilters" />
        
        <QuestionModal @close="changeQuestionModalVisibility"
        @confirm-reset-categories="confirmResetCategories"
        @confirm-reset-filters="confirmResetFilters"
        @cancel="cancelReset"
        v-if="questionModal.visible" :content="questionModal.content" />

        <ul class="card-catalog">
            <li v-for="(product, index) in catalog" :key="index">
                <ProductCard :product="product" />
            </li>
        </ul>
        
        <Observer @intersect="intersected" />
    </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import CategoriesSection from '@/components/CategoriesSection.vue';
import FilterSection from '@/components/FilterSection.vue';
import FilterModal from '@/components/FilterModal.vue';
import CategoriesModal from '@/components/CategoriesModal.vue';
import { defineComponent, nextTick } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import QuestionModal from '@/components/QuestionModal.vue';
import type { ProductType, SelectedCategories } from '@/types/interfaces';
import Observer from '@/components/Observer.vue';
import ToTopButton from '@/components/ToTopButton.vue';

export default defineComponent({
    name: "StoreView",
    components: { MainHeader, ProductCard, CategoriesSection, FilterSection, FilterModal, CategoriesModal, QuestionModal, Observer, ToTopButton },
    data() {
        return {
            headerData: {
                headerText: "Каталог",
                searchRequired: true,
                notificationsRequired: true,
            },

            filtersIsOpen: false,
            categoriesIsOpen: false,
            productStore: useProductStore(),
            questionModal: {
                visible: false,
                content: ""
            },

            scrollY: 0
        }
    },
    computed: {
        currentCategories(): string {
            return this.productStore.categoriesString;
        },
        currentFilter(): string {
            return this.productStore.currentFilter;
        },
        catalog(): Array<ProductType> {
            return this.productStore.filteredProducts.length ? this.productStore.filteredProducts : this.productStore.products;
        },
        userPositionCheck(): boolean {
            return this.scrollY > 500;
        }
    },
    methods: {
        openFilterSection(): void {
            this.filtersIsOpen = true;
        },
        openCategoriesSection(): void {
            this.categoriesIsOpen = true;
        },
        async useFilters(selectedFilter: string): Promise<void> {
            this.filtersIsOpen = false;
            await this.productStore.applyFiltersAndCategories(selectedFilter, this.productStore.currentCategories);
        },
        async useCategories(selectedCategories: SelectedCategories): Promise<void> {
            this.categoriesIsOpen = false;
            await this.productStore.applyFiltersAndCategories(this.currentFilter, selectedCategories);
        },
        changeQuestionModalVisibility(): void {
            this.questionModal.visible = !this.questionModal.visible;
        },
        cancelReset(): void {
            this.changeQuestionModalVisibility();
            this.questionModal.content = "";
        },
        async confirmResetCategories(): Promise<void> {
            this.productStore.filteredProducts = [];
            this.productStore.currentCategories = { types: [], brands: [], subtypes: {} };
            //await this.productStore.fetchProducts();                          тут будет запрос по фильтрам
            this.changeQuestionModalVisibility();
            await nextTick();
            await this.productStore.fetchProducts();
        },
        async confirmResetFilters(): Promise<void> {
            this.productStore.filteredProducts = [];
            this.productStore.currentFilter = "";
            //await this.productStore.fetch                                     тут будет запрос по категориям
            this.changeQuestionModalVisibility();
            await nextTick();
            await this.productStore.fetchProducts();
        },
        useModal(value: string): void {
            if (value === 'reset-categories')
                this.questionModal.content = "resetCategories";
            else if (value === 'reset-filters')
                this.questionModal.content = "resetFilters";
            this.changeQuestionModalVisibility();
        },
        async intersected(): Promise<void> {
            await this.productStore.fetchNextPage();
        },
        handleScroll(): void {
            this.scrollY = window.scrollY;                                  //оптимизировать скролл!
        }
    },
    mounted() {
        addEventListener("scroll", this.handleScroll);
    },
    unmounted() {
        removeEventListener("scroll", this.handleScroll);
    }
});
</script>

<style scoped lang="scss">
@use '@/assets/_variables.scss' as vars;
.wrapper {
    width: 100%;
}
.card-catalog {
    display: grid;
    grid-template-columns: 45% 45%;
    gap: 20px;
    list-style-type: none;
    padding-bottom: vars.$nav-bar-height;
}
@media screen and (min-width: 769px) {
    .card-catalog {
        gap: 8px;
        grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
    }
}
</style>