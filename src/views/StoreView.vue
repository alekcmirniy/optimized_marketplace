<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />

        <CategoriesSection :currentCategories="currentCategories" 
        @categories-section-open="openCategoriesSection" 
        @reset-categories="useModal('categories')"/>

        <CategoriesModal v-if="categoriesIsOpen" @close="categoriesIsOpen = false" @use-categories="useCategories"/>
        
        <FilterSection :activeFilter="productStore.currentFilter" 
        @use-filters="useFilters"
        @filter-section-open="openFilterSection" 
        @reset-filters="useModal('filters')"/>

        <FilterModal v-if="filtersIsOpen" @close="filtersIsOpen = false" @use-filters="useFilters"/>
        
        <QuestionModal @close="changeQuestionModalVisibility"
        @confirm-reset-categories="confirmResetCategories"
        @confirm-reset-filters="confirmResetFilters"
        @cancel="cancelReset"
        v-if="questionModal.visible" :content="questionModal.content"/>

        <ul class="card-catalog">
            <li v-for="product of tempDatabase" :key="product.id">
                <ProductCard :productId="product.id" :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
            </li>
        </ul>
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
import { Product } from '@/backend/database';
import QuestionModal from '@/components/QuestionModal.vue';

export default defineComponent({
    name: "StoreView",
    components: { MainHeader, ProductCard, CategoriesSection, FilterSection, FilterModal, CategoriesModal, QuestionModal},
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
            }
        }
    },
    computed: {
        tempDatabase(): Array<Product> {
            return this.productStore.filteredProducts.length ? this.productStore.filteredProducts as Array<Product> : this.productStore.allProducts as Array<Product>;
        },
        currentCategories(): string {
            return this.productStore.categoriesString;
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
            await this.productStore.applyFilters(selectedFilter, this.productStore.currentCategories);
        },
        async useCategories(selectedCategories: Array<Array<string>>): Promise<void> {
            this.categoriesIsOpen = false;
            await this.productStore.applyFilters(this.productStore.currentFilter, selectedCategories);
        },
        changeQuestionModalVisibility(): void {
            this.questionModal.visible = !this.questionModal.visible;
        },
        cancelReset(): void {
            this.changeQuestionModalVisibility();
            this.questionModal.content = "";
        },
        confirmResetCategories(): void {
            this.useCategories([[],[]]);
            this.changeQuestionModalVisibility();
        },
        confirmResetFilters(): void {
            this.useFilters('');
            this.changeQuestionModalVisibility();
        },
        useModal(value: string): void {
            if (value === 'categories')
                this.questionModal.content = "resetCategories";
            else if (value === 'filters')
                this.questionModal.content = "resetFilters";
            this.changeQuestionModalVisibility();
        }
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