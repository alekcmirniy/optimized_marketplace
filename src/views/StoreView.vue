<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <CategoriesSection @categories-section-open="openCategoriesSection"/>
        <FilterSection @filter-section-open="openFilterSection" class="filter-section" @use-filters="useFilters"/>
        <ul :key="componentKey" class="card-catalog">
            <li v-for="product of tempDatabase" :key="product.id">
                <ProductCard :productId="product.id" :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
            </li>
        </ul>
        <FilterModal v-if="filtersIsOpen" @close="filtersIsOpen = false" @use-filters="useFilters"/>
        <CategoriesModal v-if="categoriesIsOpen" @close="categoriesIsOpen = false" @use-filters="useFilters" />
    </div>
</template>

<script lang="ts">
import { productDatabase, Product, sortCatalogBy } from '@/backend/database';
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue'
import CategoriesSection from '@/components/CategoriesSection.vue';
import FilterSection from '@/components/FilterSection.vue';
import FilterModal from '@/components/FilterModal.vue';
import CategoriesModal from '@/components/CategoriesModal.vue';

export default {
    name: "StoreView",
    components: { MainHeader, ProductCard, CategoriesSection, FilterSection, FilterModal, CategoriesModal},
    data() {
        return {
            headerData: {
                headerText: "Каталог",
                searchRequired: true,
                notificationsRequired: true,
            },
            componentKey: 0,
            tempDatabase: productDatabase as Array<Product> || [],
            filtersIsOpen: false,
            categoriesIsOpen: false,
            selectedCategories: ""
        }
    },
    methods: {
        forceUpdate(): void {
            this.componentKey++;
        },
        openFilterSection(): void {
            this.filtersIsOpen = true;
        },
        openCategoriesSection() {
            this.categoriesIsOpen = true;
        },
        async useFilters(selectedOption: string) : Promise<void> {
            this.filtersIsOpen = false;
                /* тут реализован примерный запрос когда будет бекенд
            try {
                
                const response = await axios.get('/api/catalog', {
                    params: { categories, selectedOption },
                    method: 'get',
                    timeout: 1000,
                    headers: {"getFiltered": "true"}
                });
            if (response.status === 200) {
                this.tempDatabase = response.data;
                this.forceUpdate();
            }
            else console.log("Response status is not OK!");
            }
            catch(error) {
                console.log("Ошибка при загрузке каталога:", error);            //нужны кнопки сброса категорий и сброса фильтров
            }
            */
            if (selectedOption === 'default')
                this.tempDatabase = productDatabase; 
            else 
                this.tempDatabase = await sortCatalogBy(this.tempDatabase as Array<Product>, selectedOption);
            console.log(`Фильтр ${selectedOption} применён!`);
        },
        async useCategories(selectedOptions: Array<string>): Promise<void> {
            this.categoriesIsOpen = false;
            //this.tempDatabase = await filterCatalogBy(this.tempDatabase as Array<Product>, selectedOptions);
            console.log(`Категории ${selectedOptions} применены!`);
        }
    }
}
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
}
.filter-section {
    margin: 0 10px;
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