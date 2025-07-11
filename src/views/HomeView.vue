<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <div>
            <p class="covering">Подборки дня</p>
            <CompilationSlider :slides="dailySlidesData" />
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
                <img class="more-icon" :src="MoreIcon" :alt="'Показать ещё - иконка'" />
                <p>Показать ещё</p>
            </button>
        </div>
        <div>
            <p class="covering">Популярные подборки</p>
            <CompilationSlider :slides="bestSlidesData" />
        </div>
    </div>
</template>

<script lang="ts">
import MoreIcon from '@/components/icons/MoreProducts.png';
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import CompilationSlider from '@/components/CompilationSlider.vue';
import { useProductStore } from '@/stores/ProductStore';
import { type Slide, Product } from '@/backend/database';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "HomeView",
    components: { MainHeader, ProductCard, CompilationSlider },
    data() {
        return {
            headerData: {
                headerText: "Главная",
                searchRequired: true,
                notificationsRequired: true
            },
            MoreIcon: MoreIcon,
        }
    },
    setup() {
        const productStore = useProductStore();
        return { productStore };
    },
    async created() {
        await this.productStore.loadBestRating();
    },
    computed: {
        bestRating(): Array<Product> {
            return this.productStore.products as Array<Product>;
        },
        dailyProduct(): Product {
            return this.productStore.dailyProduct as Product;
        },
        bestSlidesData(): Array<Slide> {
            return this.productStore.bestSlides;
        },
        dailySlidesData(): Array<Slide> {
            return this.productStore.dailySlides;
        }
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
});

</script>

<style scoped lang="scss">
@use '/src/assets/variables' as vars;
$block-covering-height: 40px;
.covering {
    min-height: $block-covering-height;
    background-color: vars.$block-covering-color;
    color: vars.$supporting-golden;
    font-size: 24px;
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
    background-color: vars.$card-color;
    text-align: center;
}
.daily-product {
    max-width: 43vh;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: none;
    margin: 0;
    font-size: 1.5em;
}
.best-wrapper {
    max-width: 100%;
}
.best-footer {
    width: 100%;
    display: flex;
    gap: 5px;
    font-size: 16px;
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
    margin-bottom: 0;
}
.more-icon {
    width: 20px;
}
.best-product {
    margin: 0;
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