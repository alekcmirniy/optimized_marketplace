<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />

        <CategoriesSection :currentCategories="currentCategories" @categories-section-open="openCategoriesSection"/>
        <CategoriesModal v-if="categoriesIsOpen" @close="categoriesIsOpen = false" @use-categories="useCategories"/>
        
        <FilterSection @use-filters="useFilters" :activeFilter="activeFilter" @filter-section-open="openFilterSection" />
        <FilterModal v-if="filtersIsOpen" @close="filtersIsOpen = false" @use-filters="useFilters"/>
        
        <ul class="card-catalog">
            <li v-for="product of tempDatabase" :key="product.id">
                <ProductCard :productId="product.id" :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { productDatabase, Product, applyFiltersAndCategories } from '@/backend/database';
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import CategoriesSection from '@/components/CategoriesSection.vue';
import FilterSection from '@/components/FilterSection.vue';
import FilterModal from '@/components/FilterModal.vue';
import CategoriesModal from '@/components/CategoriesModal.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "StoreView",
    components: { MainHeader, ProductCard, CategoriesSection, FilterSection, FilterModal, CategoriesModal},
    data() {
        return {
            headerData: {
                headerText: "Каталог",
                searchRequired: true,
                notificationsRequired: true,
            },
            tempDatabase: productDatabase as Array<Product> || [],

            filtersIsOpen: false,
            categoriesIsOpen: false,

            currentCategories: "",
            activeFilter: "",
            selectedCategories: [] as Array<Array<string>>
        }
    },
    methods: {
        openFilterSection(): void {
            this.filtersIsOpen = true;
        },
        openCategoriesSection() {
            this.categoriesIsOpen = true;
        },
        async useFilters(selectedOption: string): Promise<void> {
            this.filtersIsOpen = false;
            this.activeFilter = selectedOption;
            await this.filterAndSort();
        },
        async useCategories(selectedOptions: Array<Array<string>>): Promise<void> {
            this.categoriesIsOpen = false;
            this.selectedCategories = selectedOptions;
            this.currentCategories = selectedOptions.flat().join(", ");
            await this.filterAndSort();
        },
        async filterAndSort(): Promise<void> {
            const context = this;
            this.tempDatabase = await applyFiltersAndCategories(context);
        }
    }
});
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
}
.card-catalog {
    display: grid;
    grid-template-columns: 45% 45%;
    gap: 20px;
    list-style-type: none;
    padding-bottom: 8vh;
}
@media screen and (min-width: 769px) {
    .card-catalog {
        gap: 8px;
        grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
    }
}
</style>