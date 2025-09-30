<template>
    <div v-if="product">
        <img :src="product.images[0].image" class="product-image"/>             <!-- заменить изображения корректно когда isPreview -->
        <main class="description-container">
            <p class="brand">{{ product.brand }} </p>
            <div class="flexed">
                <p class="model">{{ product.type }}</p>
                <p class="model">{{ product.name }}</p>             <!-- почему класс model? -->
            </div>
            <p class="price">{{ formattedPrice }} руб.</p>
            <div class="rating-container">
                <img class="rating-icon" :src="RatingIcon" /> 
                <p class="rating">Рейтинг: {{ product.rating }}</p>
            </div>
            <button @click="handleToCart(product.slug)" class="buy-button">
                В корзину
            </button>
        </main>
    </div>
    <div v-else>
        <p>Товар не найден</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import RatingIcon from '@/components/icons/Rating.png';
import type { ProductType } from '@/types/interfaces';
import { getFormattedPrice } from '@/utils/reusable_functions';

export default defineComponent({
    name: "ProductView",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            product: null as ProductType | null,
            RatingIcon: RatingIcon,
            productStore: useProductStore(),
            cartStore: useCartStore()
        }
    },
    computed: {
        formattedPrice() {
            if (this.product)
                return getFormattedPrice(this.product.price);
        }
    },
    methods: {
        handleToCart(slug: string): void {
            this.cartStore.addToCart(slug);
        }
    },
    beforeMount() {
        this.product = this.productStore.getProductBySlug(this.slug);
    }
});

</script>

<style scoped lang="scss">
@use '@/assets/variables.scss' as vars;
* {
    color: vars.$body-color;
}
.product-image {
    width: 100%;
    background-color: vars.$card-background;
    display: block;
}
.description-container {
    background: vars.$background-gradient;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    padding: 12px;

    & p:not(.price, .brand) {
        font-size: 24px;
    }
    & *:not(.flexed) {
        margin-bottom: 10px;
    }
}
.brand {
    font-style: italic;
    font-size: 16px;
    opacity: 0.8;
}
.model {
    font-size: 28px;
    font-weight: 700;
}
.flexed {
    display: flex;
    gap: 10px;
}
.price {
    place-self: center;
    font-size: 36px;
    font-weight: bold;
    max-width: fit-content;
    border-bottom: 1px solid vars.$supporting-golden;
}
.rating-container {
    display:flex;
    align-items: center;
    gap: 4px;
}
.rating-icon {
    width: 20px;
    height: auto;
    object-fit: contain;
}
.buy-button {
  background: vars.$card-background;
  color: vars.$supporting-golden-lighten;
  place-self: center;
  width: 90%;
}

</style>