<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />

        <ToTopButton :showButton="userPositionCheck" />

        <CategoriesSection :currentCategories="currentCategories" 
        @categories-section-open="openCategoriesSection" 
        @reset-categories="useModal('reset-categories')" />

        <CategoriesModal v-if="modal.categories" @close="modal.categories = false" @use-categories="useCategories" />
        
        <FilterSection :activeFilter="currentFilter"
        @use-filters="useFilters"
        @filter-section-open="openFilterSection" 
        @reset-filters="useModal('reset-filters')" />

        <FilterModal v-if="modal.filters" @close="modal.filters = false" @use-filters="useFilters" />
        
        <QuestionModal @close="changeQuestionModalVisibility"
        @confirm-reset-categories="confirmResetCategories"
        @confirm-reset-filters="confirmResetFilters"
        @cancel="cancelReset"
        v-if="questionModal.visible" :content="questionModal.content" />

        <ul class="card-catalog">
            <li v-for="product in catalog" :key="product.slug"   data-sal="zoom-in" data-sal-duration="150">
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
import { defineComponent } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import QuestionModal from '@/components/QuestionModal.vue';
import type { ProductType, SelectedCategories } from '@/types/interfaces';
import Observer from '@/components/Observer.vue';
import ToTopButton from '@/components/ToTopButton.vue';
import { checkCategoriesEmpty } from '@/utils/reusable_functions';
import sal from "sal.js";
    
export default defineComponent({
    name: "StoreView",
    components: { MainHeader, ProductCard, CategoriesSection, FilterSection, FilterModal, CategoriesModal, QuestionModal, Observer, ToTopButton },
    watch: {
        catalog() {
            this.$nextTick(() => { sal({ root: null, threshold: 0.2, once: true }) })
        }
    },
    data() {
        return {
            headerData: {
                headerText: "Каталог",
                searchRequired: true,
                notificationsRequired: true,
            },

            modal: {
                filters: false,
                categories: false
            },

            productStore: useProductStore(),
            questionModal: {
                visible: false,
                content: ""
            },
            scrollParams: {
                scrollY: 0,
                scrollTimeout: null as number | null
            }
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
            return this.scrollParams.scrollY > 500;
        }
    },
    methods: {
        openFilterSection(): void {
            this.modal.filters = true;
        },
        openCategoriesSection(): void {
            this.modal.categories = true;
        },
        async useFilters(selectedFilter: string): Promise<void> {
            this.modal.filters = false;
            await this.productStore.applyFiltersAndCategories(selectedFilter, this.productStore.currentCategories);
        },
        async useCategories(selectedCategories: SelectedCategories): Promise<void> {
            this.modal.categories = false;
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
        handleScroll() {
            if (this.scrollParams.scrollTimeout) return;
            this.scrollParams.scrollY = window.scrollY;
            this.scrollParams.scrollTimeout = setTimeout(() => (this.scrollParams.scrollTimeout = null), 300);
        },
    },
    async beforeMount() {
        const slideIdx = new Map(Object.entries(this.$route.query)).get("slideIdx");
        if (!slideIdx) return;
        
        const found = Object.values(this.productStore.mainSlides)
        .find(slide => slide.id.toString() === slideIdx)
        ?? Object.values(this.productStore.categoriesSlides)
        .find(slide => slide.id.toString() === slideIdx);

        if (found)
            await this.productStore.applyFiltersAndCategories(found.filter || "", found.categories || { types: [], brands: [], subtypes: {} });
    },
    mounted() {
        document.addEventListener("scroll", this.handleScroll);
        this.$nextTick(() => { sal({ root: null, threshold: 0.2, once: true }) })
    },
    unmounted() {
        document.removeEventListener("scroll", this.handleScroll);
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
    margin: 0 5px;
    list-style-type: none;
    padding-bottom: vars.$nav-bar-height;
    padding-top: 10px;
}
@media screen and (min-width: 769px) {
    .card-catalog {
        gap: 8px;
        grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
    }
}
</style>