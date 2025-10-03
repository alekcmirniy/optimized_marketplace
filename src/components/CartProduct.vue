<template>
    <div class="cart-product-wrapper" :class="{unchecked: !checked}">
        <router-link class="link" :to="`/product/${product.slug}`">
            <img class = "cart-product-image" :src="imageSource" :alt="'Изображение товара'" />
        </router-link>  
        <aside class="cart-product-description">
            <input type="checkbox" v-model="checked"/>
            <p class="brand">{{ product.brand }}</p>
            <p>{{ product.type }}</p>
            <p>{{ product.name }}</p>
            <p class="price">{{ fullQuantity }} руб.</p>
            <div class="quantity-more-less">
                <button @click="$emit('add-to-cart', product.slug)" class="quantity-button">+</button>
                <span class="quantity"> {{ quantity }}</span>                                      
                <button @click="$emit('remove-from-cart', product.slug)" class="quantity-button">-</button>
            </div>
        </aside>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useCartStore } from "@/stores/CartStore";
import type { ProductType } from "@/types/interfaces";

export default defineComponent({
    name: "CartProducts",
    props: {
        product: {
            type: Object as PropType<ProductType>,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            cartStore: useCartStore()
        }
    },
    computed: {
        fullQuantity(): string {
            return this.getFormattedPrice(Number(this.product.price) * this.quantity);
        },
        checked: {
            get(): boolean {
                return this.cartStore.getCheckedState(this.product.slug);
            },
            set(value: boolean): void {
                this.cartStore.checkedProducts.set(this.product.slug, value);
                value ? this.cartStore.recountFullPrice(this.product.slug, "added", this.quantity) : this.cartStore.recountFullPrice(this.product.slug, "deleted", this.quantity);
            }
        },
        imageSource(): string {
            if (this.product.images.length === 1)
                return this.product.images[0].image;
            else {
                this.product.images.find((imgData) => {
                    if (imgData.is_preview) return imgData.image;
                })
                console.error("Не найдено изображение is_preview товара!");
                return "";
            }
        }
    },
    methods: {
        getFormattedPrice(price: number) : string {   
            let outPrice = price.toString().split("").reverse();
            let formatted = [];
            for (let i = 0; i < outPrice.length; i++) {
                if (i > 0 && i % 3 === 0) {
                    formatted.push(",");
                }
                formatted.push(outPrice[i]);
            }
            return formatted.reverse().join("");
        }
    }
});
</script>

<style scoped lang="scss">
@use '@/assets/_variables.scss' as vars;
@use "sass:color";
.cart-product-wrapper {
    height: 190px;
    display: flex;
    justify-content: space-between;
    background-color: color.adjust(vars.$body-color, $lightness:10%);
    gap: 4px;
    border-radius: 20px;
    transition: opacity 0.1s ease;
}
.unchecked {
    opacity: 0.65;
}
.cart-product-image {
    height: 100%;
    border-radius: 20px;
    background: vars.$card-background;
}
.cart-product-description {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    background: vars.$background-gradient;
    color: black;
    border-radius: 20px;
    padding: 8px;
}
.cart-product-description p {
    &:not(.quantity) {
        margin-top: 8px;
    }
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
input[type=checkbox] {
    position: absolute;
    right: 2%;
    top: 5%;
    appearance: none;
    height: 20px;
    width: 20px;
    border: solid 1px vars.$body-color;
    border-radius: 2px;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 0.2);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    &:checked {
        background-image: url('../components/icons/CheckedIcon.png');
    }
}
.brand {
    color: rgba(0,0,0,0.8);
    font-style: italic;
}
.price {
    text-align: center;
    word-break: break-word;
    font-weight: 800;
    letter-spacing: 1px;
    font-size: 24px;
    justify-self: flex-end;
}
.quantity-more-less {
    margin-top: 10px;
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
    outline: solid 1px vars.$card-background;
}
</style>