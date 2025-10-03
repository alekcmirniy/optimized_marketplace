<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <div data-sal="slide-up" data-sal-duration="150">
            <p class="covering">Подборки дня</p>
            <CompilationSlider v-if="mainSlides?.length" :slides="mainSlides" />
        </div>
        <div class="daily">
            <label class="daily-product-label covering">Товар дня</label>
            <ProductCard v-if="dailyProduct" class="daily-product" :product="dailyProduct"/>
        </div>
        <p class="covering">Лучшие товары</p>
        <div class="best-wrapper">
            <ul class="best-catalog">
                <li v-for="product of bestRatingProducts" :key="product.slug">
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
            <CompilationSlider v-if="categoriesSlides?.length" :slides="categoriesSlides" />
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
import sal from "sal.js";

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
        if (!this.dailyProduct) 
            await this.productStore.initDailyProduct();
        if (!this.productStore.homeBest.productsMap.size)
            await this.productStore.fetchHomeProducts();
    },
    computed: {
        bestRatingProducts(): Array<ProductType> {
            return Array.from(this.productStore.homeBest.productsMap.values());
        },
        dailyProduct(): ProductType {
            return this.productStore.dailyProduct as ProductType;
        },
        mainSlides(): Array<Slide> {
            return Object.values(this.productStore.mainSlides).filter(slide => slide.src);
        },
        categoriesSlides(): Array<Slide> {
            return Object.values(this.productStore.categoriesSlides).filter(slide => slide.src);
        }
    },
    methods: {
        async getMoreBest(): Promise<void> {
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
    },
    mounted() {
        this.$nextTick(() => { sal({ root: null, threshold: 0.2, once: true }) });
    }
});

</script>

<style scoped lang="scss">
@use '/src/assets/variables' as vars;
$block-covering-height: 40px;

.covering {
    min-height: $block-covering-height;
    &:not(.daily-product-label) {
        background: linear-gradient(120deg, rgba(163, 141, 70, 0.397), rgba(27, 20, 7, 0.336)),rgb(44, 44, 44);
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
.wrapper {
    padding-bottom: vars.$nav-bar-height;
}
.daily {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, vars.$block-covering-color, vars.$body-color);
    border-radius: 40px;
    border-top: solid 2px;
    border-bottom: solid 2px;
    box-shadow: -4px -2px 12px rgba(173, 190, 19, 0.486);
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
    --rows: 2;
    --cols: 3;
    --card-height: max(230px, 45vw);
    @media (max-width: 486px) {
        --card-height: 50vw;
    }
    --gap: 10px;

    display: grid;
    justify-content: center;
    grid-template-columns: repeat(var(--cols), minmax(100px, 1fr));
    grid-auto-rows: var(--card-height);
    gap: var(--gap);
    max-height: calc(var(--rows) * (var(--card-height) + var(--gap)));
    list-style-type: none;
    overflow: hidden;
    padding: 5px;

    transition: max-height 0.5s ease-in-out, grid-template-rows 0.5s ease-in-out;
}
.more-icon {
    width: 20px;
}
.reversed {
    transform: rotate(180deg);
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