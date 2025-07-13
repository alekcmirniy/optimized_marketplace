<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />

        <CategoriesSection :currentCategories="currentCategories" @categories-section-open="openCategoriesSection"/>
        <CategoriesModal v-if="categoriesIsOpen" @close="categoriesIsOpen = false" @use-categories="useCategories"/>
        
        <FilterSection @use-filters="useFilters" :activeFilter="productStore.currentFilter" @filter-section-open="openFilterSection" />
        <FilterModal v-if="filtersIsOpen" @close="filtersIsOpen = false" @use-filters="useFilters"/>
        
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

            filtersIsOpen: false,
            categoriesIsOpen: false,
            productStore: useProductStore()
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
        openCategoriesSection() {
            this.categoriesIsOpen = true;
        },
        async useFilters(selectedOption: string): Promise<void> {
            this.filtersIsOpen = false;
            await this.productStore.applyFilters(selectedOption, this.productStore.currentCategories);
        },
        async useCategories(selectedOptions: Array<Array<string>>): Promise<void> {
            this.categoriesIsOpen = false;
            await this.productStore.applyFilters(this.productStore.currentFilter, selectedOptions);
        },
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