<template>
    <div class="cart-product-wrapper">
        <img class = "cart-product-image" :src="product?.imagePath" />
        <aside class="cart-product-description">
            <p class="brand">{{ product.getCardDescription()[1] }}</p>
            <p class="category-model">{{ product.getCardDescription()[0] }}</p>
            <p class="price">{{ product.getCardDescription()[2] }}</p>
            <div class="quantity-more-less">
                <button @click="$emit('add-to-cart', product.id)" class="quantity-button">+</button>
                <span class="quantity"> {{ quantity }}</span>                                      
                <button @click="$emit('remove-from-cart', product.id)" class="quantity-button">-</button>
            </div>
        </aside>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Product } from '@/backend/database';

export default defineComponent({
    name: "CartProducts",
    props: {
        product: {
            type: Object as PropType<Product>,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }
});
</script>

<style scoped lang="scss">
@use '@/assets/_variables.scss' as vars;
@use "sass:color";
.cart-product-wrapper {
    display: flex;
    gap: 10px;
    background-color: color.adjust(vars.$body-color, $lightness:10%);
    border-radius: 20px;
}
.cart-product-image {
    max-width: 35%;
    border-radius: 20px;
    background: vars.$card-color;
}
.cart-product-description {
    background: vars.$background-gradient;
    color: black;
    width: 100%;
    border-radius: 20px;
}
.cart-product-description p {
    &:not(.quantity) {
        margin-top: 5px;
    }
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.brand {
    color: rgba(0,0,0,0.8);
    font-style: italic;
}
.price {
    word-break: break-word;
    font-weight: 800;
    letter-spacing: 1px;
    font-size: 24px;
}
.quantity-more-less {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 40px;
}
.quantity {
    min-width: 30px;
    text-align: center;
    line-height: 1.5;
    height: 100%;
}
.quantity-button {
    line-height: 1;
    background: vars.$supporting-golden-lighten;
    outline: solid 1px vars.$card-color;
}
</style>