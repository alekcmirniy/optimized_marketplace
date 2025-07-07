<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />

        <CategoriesSection @categories-section-open="openCategoriesSection"/>
        <CategoriesModal v-if="categoriesIsOpen" @close="categoriesIsOpen = false" @use-categories="useCategories"/>
        
        <FilterSection @filter-section-open="openFilterSection" @use-filters="useFilters"/>
        <FilterModal v-if="filtersIsOpen" @close="filtersIsOpen = false" @use-filters="useFilters"/>
        
        <ul :key="componentKey" class="card-catalog">
            <li v-for="product of tempDatabase" :key="product.id">
                <ProductCard :productId="product.id" :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { productDatabase, Product, sortCatalogBy } from '@/backend/database';
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
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
        }
    },
    methods: {
        /*
        forceUpdate(): void {
            this.componentKey++;
        },
        */
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
        async useCategories(selectedOptions: Array<Array<string>>, recursiveCall?: boolean): Promise<void> {
            this.categoriesIsOpen = false;
            const hasMain = selectedOptions[0].length > 0;
            const hasOther = selectedOptions[1].length > 0;

            if (!productDatabase.length) {
                this.tempDatabase = [];
                return;
            }

            if (!hasMain && !hasOther) {
                this.tempDatabase = productDatabase;
                return;
            }

            const mainCategoriesSet = new Set(selectedOptions[0]);
            const otherCategoriesSet = new Set(selectedOptions[1]);

            const andResults: Array<Product> = [];
            const orResults: Array<Product> = [];
            
            productDatabase.forEach((product) => {
                const matchesMain = !hasMain || mainCategoriesSet.has(product.categories.mainCategory);
                const matchesOther = !hasOther || product.categories.otherCategories.some((cat) => (otherCategoriesSet.has(cat)));

                if (matchesMain && matchesOther) {
                    andResults.push(product);
                }
                else if (matchesMain || matchesOther) {
                    orResults.push(product);
                }
            });
            this.tempDatabase = andResults.length ? andResults : orResults;
        }
    }
}
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