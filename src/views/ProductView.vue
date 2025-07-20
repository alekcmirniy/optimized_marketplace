<template>
    <div v-if="product">
        <img :src="product.imagePath" class="product-image"/>
        <main class="description-container">
            <p class="brand">{{ product.brand }} </p>
            <div class="flexed">
                <p class="model">{{ product.categories.mainCategory }}</p>
                <p class="model">{{ product.model }}</p>
            </div>
            <p class="price">{{ getFormattedPrice(product.price) }} руб.</p>
            <div class="rating-container">
                <img class="rating-icon" :src="RatingIcon" /> 
                <p class="rating">Рейтинг: {{ product.rating }}</p>
            </div>
            <button @click="handleToCart(product.id)" class="buy-button">
                В корзину
            </button>
        </main>
    </div>
    <div v-else>
        <p>Товар не найден</p>
    </div>
</template>

<script lang="ts">
import { getFormattedPrice } from '@/utils/reusable_functions';
import { defineComponent } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import { Product } from '@/backend/database'
import RatingIcon from '@/components/icons/rating.png';

export default defineComponent({
    name: "ProductView",
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            product: null as Product | null,
            RatingIcon: RatingIcon,
            productStore: useProductStore(),
            cartStore: useCartStore()
        }
    },
    computed: {
        getFormattedPrice(): Function {
            return getFormattedPrice;
        }
    },
    methods: {
        handleToCart(id: number): void {
            this.cartStore.addToCart(id);
        }
    },
    mounted() {
        this.product = this.productStore.getProductById(this.id);
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
    background-color: vars.$card-color;
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
  background: vars.$card-color;
  color: vars.$supporting-golden-lighten;
  place-self: center;
  width: 90%;
}

</style>