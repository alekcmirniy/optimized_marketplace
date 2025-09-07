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
            <li v-for="product in catalog" :key="product.slug">
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
import { checkCategoriesEmpty } from '@/utils/reusable_functions';

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
            return this.productStore.products;
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
            this.changeQuestionModalVisibility();
            this.productStore.currentCategories = { types: [], brands: [], subtypes: {} };
            
            this.productStore.currentFilter
            ? await this.productStore.applyFiltersAndCategories(this.productStore.currentFilter, { types: [], brands: [], subtypes: {} })
            : await this.productStore.applyFiltersAndCategories("", { types: [], brands: [], subtypes: {} });
        },
        async confirmResetFilters(): Promise<void> {
            this.changeQuestionModalVisibility();
            this.productStore.currentFilter = "";

            checkCategoriesEmpty(this.productStore.currentCategories)
            ? await this.productStore.applyFiltersAndCategories("", { types: [], brands: [], subtypes: {} })
            : await this.productStore.fetchProducts("", this.productStore.currentCategories);
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
            this.scrollY = window.scrollY;      //TODO оптимизация скролла!
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