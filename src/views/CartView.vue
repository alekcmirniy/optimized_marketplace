<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <div class = "cart-container">
            <header>Общая сумма корзины: {{ totalPrice }}</header>
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
.cart-container {
    padding: 0 10px;
}
.products-list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    gap: 15px;
}
</style>