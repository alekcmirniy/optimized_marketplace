<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <div>
            <div class="total-price">
                <p>Сумма к покупке: {{ totalPrice }} руб.</p>
                <div class="buttons">
                    <button @click="useModal('clear')" class="cart-button" :disabled="isCartEmpty">Очистить</button>
                    <button class="cart-button" :disabled="isCartEmpty">Перейти к оформлению</button>
                </div>
            </div>
            <QuestionModal @close="changeModalVisibility"
            @confirm-clear="confirmClear"
            @delete-last-product="deleteLastProduct"
            @cancel="cancelClear"
            v-if="modal.visible" :content="modal.content"/>
            <transition-group name="cart" tag="ul" class="products-list">
                <li v-for="product of cartStore.getProductsFromCart" :key="product.slug">
                    <CartProduct :product="product as ProductType" 
                    :quantity="getProductQuantity(product.slug)"
                    @remove-from-cart="removeLastProductTask(product.slug)"
                    @add-to-cart="cartStore.addToCart(product.slug)"/>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import CartProduct from "@/components/CartProduct.vue";
import MainHeader from "@/components/MainHeader.vue";
import { useCartStore } from "@/stores/CartStore";
import QuestionModal from "@/components/QuestionModal.vue";
import type { ProductType } from "@/types/interfaces";

export default {
    name: "CartView",
    components: { MainHeader, CartProduct, QuestionModal },
    data() {
        return {
            headerData: {
                headerText: "Корзина",
                searchRequired: false,
                notificationsRequired: true
            },
            cartStore: useCartStore(),
            modal: {
                visible: false,
                content: ""
            },
            tempSlugForDeleting: ""
        }
    },
    computed: {
        totalPrice() {
            return this.cartStore.fullPrice;
        },
        isCartEmpty() {
            return !this.cartStore.getProductsFromCart.length;
        }
    },
    methods: {
        getProductQuantity(slug: string): number {
        return this.cartStore.cartProductsStructure.get(slug) || 0 as number;
        },
        changeModalVisibility(): void {
            this.modal.visible = !this.modal.visible;
        },
        useModal(content: string, slugForDeleting?: string): void {
            this.modal.content = content;
            this.changeModalVisibility();
            this.tempSlugForDeleting = slugForDeleting || "";
        },
        cancelClear(): void {
            this.changeModalVisibility();
            this.modal.content = "";
        },
        confirmClear(): void {
            try {
                this.cartStore.clearCart();
                this.changeModalVisibility();
            }
            catch(e) {
                console.error("Ошибка удаления товара!");
            }
            finally {
                this.modal.content = "";
            }
        },
        removeLastProductTask(slug: string): void {
            const quantity = this.getProductQuantity(slug);
            if (quantity === 1) {
                this.useModal("deleteLastProduct", slug);
            }
            else
                this.cartStore.removeFromCart(slug);
        },
        deleteLastProduct(): void {
            const slug = this.tempSlugForDeleting;
            this.cartStore.removeFromCart(slug);
            this.changeModalVisibility();
            this.tempSlugForDeleting = "";
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