<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <div>
            <p class="covering">Подборки дня</p>
            <router-link to="/store">
                <CompilationSlider v-if="mainSlides?.length" :slides="mainSlides" />
            </router-link>
        </div>
        <div class="daily">
            <label class="daily-product-label covering">Товар дня</label>
            <ProductCard v-if="dailyProduct" class="daily-product" :product="dailyProduct"/>
        </div>
        <p class="covering">Лучшие товары</p>
        <div class="best-wrapper">
            <ul class="best-catalog">
                <li v-for="(product, index) of bestRating" :key="index">
                    <ProductCard class="best-product" :product="product"/>
                </li>
            </ul>
            <div class="buttons-container">
                <button @click="getMoreBest()" class="best-footer covering">
                    <img class="more-icon" :src="MoreIcon" :alt="'Показать ещё - иконка'" />
                    <p>Показать ещё</p>
                </button>
                <button v-show="hidingBestVisible" @click="getLessBest()" class="best-footer covering">
                    <img class="more-icon reversed" :src="MoreIcon" :alt="'Скрыть - иконка'" />
                    <p>Скрыть</p>
                </button>
            </div>
        </div>
        <div>
            <p class="covering">Популярные подборки</p>
            <router-link to="/store">
                <CompilationSlider v-if="categoriesSlides?.length" :slides="categoriesSlides" />
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import MoreIcon from '@/components/icons/MoreProducts.png';
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import CompilationSlider from '@/components/CompilationSlider.vue';
import { useProductStore } from '@/stores/ProductStore';
import { type Slide } from '@/utils/slides';
import { defineComponent } from 'vue';
import type { ProductType } from '@/types/interfaces';

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
            productStore: useProductStore(),
            hidingBestVisible: false
        }
    },
    async created(): Promise<void> {
        if (!this.dailyProduct || !this.productStore.dailyProduct) {
            await this.productStore.initDailyProduct();
        }
        if (!this.productStore.homeBest.products.length) {
            await this.productStore.fetchHomeProducts();
        }

        if (!this.mainSlides.length || !this.categoriesSlides.length) {
            await this.productStore.init();
        }
    },
    unmounted() {
        this.productStore.homeBest = { products: [], nextPage: null };
    },
    computed: {
        bestRating(): Array<ProductType> {
            return this.productStore.homeBest.products;
        },
        nextPage(): string | null {
            return this.productStore.homeBest.nextPage;
        },
        dailyProduct(): ProductType {
            return this.productStore.dailyProduct as ProductType;
        },
        mainSlides(): Array<Slide> {
            const slidesObject = Object.values(this.productStore.mainSlides);
            const slidesArray = Array.from(slidesObject);
            return slidesArray.filter(slide => slide.src);
        },
        categoriesSlides(): Array<Slide> {
            const slidesObject = Object.values(this.productStore.categoriesSlides);
            const slidesArray = Array.from(slidesObject);
            return slidesArray.filter(slide => slide.src);
        }
    },
    methods: {
        async getMoreBest(): Promise<void> {
            const root = document.querySelector(".best-catalog") as HTMLElement;
            if (!root) return;
        
            const currentValue = getComputedStyle(root).getPropertyValue("--counter-similar-rows").trim();
            const nextValue = parseInt(currentValue, 10) + 2;
        
            root.style.setProperty("--counter-similar-rows", nextValue.toString());
            this.hidingBestVisible = true;

            if (this.productStore.homeBest.nextPage)
                await this.productStore.fetchHomeProducts(this.productStore.homeBest.nextPage);
        },
        async getLessBest(): Promise<void> {
            const root = document.querySelector(".best-catalog") as HTMLElement;
            if (!root) return;

            root.style.setProperty("--counter-similar-rows", "2");
            this.hidingBestVisible = false;

            await this.productStore.fetchHomeProducts();
        }
    }
});

</script>

<style scoped lang="scss">
@use '/src/assets/variables' as vars;
$block-covering-height: 40px;

.covering {
    min-height: $block-covering-height;
    &:not(.daily-product-label) {
        background: linear-gradient(135deg, rgba(255, 215, 100, 0.08), rgba(255, 200, 100, 0.12)),rgb(44, 44, 44);
    }

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
.covering:not(.daily-product-label) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.wrapper {
    padding-bottom: vars.$nav-bar-height
}
.daily {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #2c2c2c, #4b3d2a, #7c623e);
    padding: 0 20px 20px 20px;
    border-radius: 24px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
}
.daily-product-label {
    width: 43vh;
    height: 50px;
    font-weight: 500 !important;
    font-size: 40px;
    text-align: center;
    background: none;
}
.daily-product {
    max-width: 43vh;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: none;
    margin: 0;
    font-size: 1.8rem;
    background: none;
    color: #f4e4b5;
    padding-bottom: 12px;
    z-index: 2;
}
.daily::after {
    content: "";
    position: absolute;
    top: -30%;
    left: -30%;
    width: 160%;
    height: 160%;
    background: radial-gradient(circle at center, rgba(255, 215, 100, 0.05), transparent 70%);
    z-index: 1;
}
.best-wrapper {
    max-width: 100%;
}
.buttons-container {
    margin: 0 10px;
    display: flex;
    gap: 10px;
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
    --gap-y: 20px;
    --card-height: 21vh;

    max-height: var(--catalog-max-height);
    margin: 10px 0;
    display: grid;
    display: ms-grid;
    justify-content: center;
    gap: 20px 10px;

    list-style-type: none;
    grid-template-columns: repeat(3, 30vw);
    grid-template-rows: repeat(var(--counter-similar-rows), 21vh);
    overflow: hidden;
    margin-bottom: 0;

    transition: max-height 0.5s ease-in-out, grid-template-rows 0.5s ease-in-out;
}
.more-icon {
    width: 20px;
}
.reversed {
    transform: rotate(180deg);
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