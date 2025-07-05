<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <div class="compilations-container">
            <p class="covering">Подборки дня</p>
            <CompilationSlider class="compilations-slider" :slides="dailySlidesData" />
        </div>
        <div class="daily">
            <label class="daily-product-label covering">Товар дня</label>
            <ProductCard class="daily-product" :productId="dailyProduct.id" :cardDescription="dailyProduct.getCardDescription()" :imagePath="dailyProduct.imagePath"/>
        </div>
        <p class="covering">Лучшие товары</p>
        <div class="best-wrapper">
            <ul class="best-catalog">
                <li v-for="product of bestRating" :key="product.id">
                    <ProductCard class="best-product" :productId="product.id" :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
                </li>
            </ul>
            <button @click="getMoreBest()" class="best-footer covering">
                ▽ Показать ещё
            </button>
        </div>
        <div class="compilations-container">
            <p class="covering">Популярные подборки</p>
            <CompilationSlider class="compilations-slider" :slides="bestSlidesData" />
        </div>
    </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import CompilationSlider from '@/components/CompilationSlider.vue';
import type { Slide } from '@/backend/database';
import { bestSlidesData, dailySlidesData, Product, productDatabase, sortCatalogBy, dailyProduct } from '@/backend/database';

export default {
    name: "HomeView",
    components: { MainHeader, ProductCard, CompilationSlider },
    data() {
        return {
            headerData: {
                headerText: "Главная",
                searchRequired: true,
                notificationsRequired: true
            },
            bestRating: [] as Array<Product>,
            dailyProduct: dailyProduct as Product,
            dailySlidesData: dailySlidesData as Array<Slide>,
            bestSlidesData: bestSlidesData as Array<Slide>
        }
    },
    async created() {
        this.bestRating = await sortCatalogBy(productDatabase, "best-rating");
    },
    methods: {
        getMoreBest() : void {
            const root = document.querySelector(".best-catalog") as HTMLElement;
            if (!root) return;
        
            const currentValue = getComputedStyle(root).getPropertyValue("--counter-similar-rows").trim();
            const nextValue = parseInt(currentValue, 10) + 2;
        
            root.style.setProperty("--counter-similar-rows", nextValue.toString());
        }
    }
};

</script>

<style scoped lang="scss">
@use '/src/assets/variables' as vars;
$block-covering-height: 40px;
.covering {
    min-height: $block-covering-height;
    background-color: vars.$block-covering-color;
    color: vars.$supporting-golden;
    font-size: 20px;
    font-weight: 500;
    place-content: center;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.covering:not(.best-footer) {
    margin-top: 20px;
}
.covering {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.wrapper {
    padding-bottom: 6.5vh;
}
.daily {
    margin: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.daily-product-label {
    width: 43vh;
    height: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    font-weight: 500 !important;
    font-size: 40px;
    padding-top: 5px;
    background-color: vars.$card-color;
}
.daily-product {
    margin-top: 0;
    max-width: 43vh;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: none;
}
.best-wrapper {
    max-width: 100%;
}
.best-footer {
    width: 100%;
}
.best-catalog {
    --counter-similar-rows: 2;    
    --catalog-max-height: calc((var(--card-height) + var(--gap-y)) * var(--counter-similar-rows));
    --gap-y: 10px;
    --card-height: 21vh;
    max-height: var(--catalog-max-height);
    margin: 10px 0;
    display: grid;
    justify-content: center;
    gap: 10px;
    list-style-type: none;
    grid-template-columns: repeat(3, 30vw);
    grid-template-rows: repeat(var(--counter-similar-rows), 21vh);
    overflow: hidden;
}
.best-product {
    margin: 0;
}
.compilations-container {
    margin-top: 20px;
}
.compilations-slider {
    margin-top: 0;
}
@media screen and (min-width: 769px) {
    .daily {
        align-items: flex-start;
        margin-left: 10px;
    }
    .daily-product-label {
        max-width: 25%;
    }
    .daily-product {
        margin: 0;
        max-width: 25%;
        height: auto;
        justify-self: start;
    }
}
</style>