<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <div>
            <div class="total-price">
                <p>Общая сумма корзины: {{ totalPrice }} руб.</p>
                <div class="buttons">
                    <button @click="useModal('clear')" class="cart-button" :disabled="isCartEmpty">Очистить</button>
                    <button class="cart-button" :disabled="isCartEmpty">Перейти к оформлению</button>
                </div>
            </div>
            <CartModal @close="changeModalVisibility" @clear-cart="confirmClear" @cancel="dismissClear" v-if="modal.visible" :content="modal.content"/>
            <transition-group name="cart" tag="ul" class="products-list">
                <li v-for="product of cartProducts.getProductsFromCart" :key="product.id">
                    <CartProduct :product="product as Product" 
                    :quantity="getProductQuantity(product.id)" 
                    @remove-from-cart="cartProducts.removeFromCart"
                    @add-to-cart="cartProducts.addToCart"/>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import type { Product } from "@/backend/database";
import CartModal from "@/components/CartModal.vue";
import CartProduct from "@/components/CartProduct.vue";
import MainHeader from "@/components/MainHeader.vue";
import { useCartStore } from "@/stores/CartStore";

export default {
    name: "CartView",
    components: { MainHeader, CartProduct, CartModal },
    data() {
        return {
            headerData: {
                headerText: "Корзина",
                searchRequired: false,
                notificationsRequired: true
            },
            cartProducts: useCartStore(),
            modal: {
                visible: false,
                content: ""
            }
        }
    },
    computed: {
        totalPrice() {
            return this.cartProducts.fullPrice;
        },
        isCartEmpty() {
            return !this.cartProducts.getProductsFromCart.length;
        }
    },
    methods: {
        getProductQuantity(id: number): number {
        return this.cartProducts.cartProductsStructure.get(id) || 0 as number;
        },
        changeModalVisibility(): void {
            this.modal.visible = !this.modal.visible;
        },
        useModal(content: string): void {
            this.modal.content = content;
            this.changeModalVisibility();
        },
        dismissClear(): void {
            this.changeModalVisibility();
            this.modal.content = "";
        },
        confirmClear(): void {
            try {
                this.cartProducts.clearCart();
                this.changeModalVisibility();
            }
            catch(e) {
                console.error("Ошибка удаления!");
            }
            finally {
                this.modal.content = "";
            }
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
.cart-leave-active {
    transition: all 0.3s ease;
}
.cart-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
}
</style>