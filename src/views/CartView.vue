<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <div>
            <div class="total-price">
                <p>Общая сумма корзины: {{ totalPrice }} руб.</p>
                <div class="buttons">
                    <button class="cart-button">Очистить</button>
                    <button class="cart-button">Перейти к оформлению</button>
                </div>
            </div>
            <ul class="products-list">
                <li v-for="product of cartProducts.getProductsFromCart" :key="product.id">
                    <CartProduct :product="product as Product" 
                    :quantity="getProductQuantity(product.id)" 
                    @remove-from-cart="cartProducts.removeFromCart"
                    @add-to-cart="cartProducts.addToCart"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import type { Product } from "@/backend/database";
import CartProduct from "@/components/CartProduct.vue";
import MainHeader from "@/components/MainHeader.vue";
import { useCartStore } from "@/stores/CartStore";

export default {
    name: "CartView",
    components: { MainHeader, CartProduct },
    data() {
        return {
            headerData: {
                headerText: "Корзина",
                searchRequired: false,
                notificationsRequired: true
            },
            cartProducts: useCartStore()
        }
    },
    computed: {
        totalPrice() {
            return this.cartProducts.fullPrice;
        }
    },
    methods: {
        getProductQuantity(id: number): number {
        return this.cartProducts.cartProductsStructure.get(id) as number;
        }
    }
}
</script>

<style scoped lang="scss">
@use '@/assets/_variables.scss' as vars;
.wrapper {
    padding-bottom: vars.$nav-bar-height;
}
.products-list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    gap: 15px;
    padding: 0 10px;
}
.total-price {
    place-self: center;
    font-size: 1.35rem;
    width: 100%;
    margin: 10px;
    padding: 10px;
    background: rgba(vars.$card-color, 0.9);
    position: sticky;
    top: 0;
    backdrop-filter: blur(8px);
    border-radius: 0 0 20px 20px;
    overflow: hidden;
}
.buttons {
    display: flex;
    justify-content: space-between;
}
.cart-button {
    margin-top: 10px;
    padding: 8px;
    display: flex;
    justify-content: flex-end;
}
</style>