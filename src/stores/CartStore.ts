import { defineStore } from "pinia";
import { useProductStore } from "./ProductStore";
import { watch } from "vue";
import type { ProductType } from "@/types/interfaces";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        cartProductsStructure: new Map<string, number>(),     //Map<slug, quantity>
        checkedProducts: new Map<string, boolean>(),          //Map<slug, true/false>
        fullPrice: 0
    }),
    
    actions: {
        initCartStore(): void {
            watch(
                () => useCartStore().$state,
                (state) => {
                    const serializableState = {
                        cartProductsStructure: Array.from(state.cartProductsStructure.entries()),
                        checkedProducts: Array.from(state.checkedProducts.entries()),
                        fullPrice: state.fullPrice
                    };
                    localStorage.setItem("cart", JSON.stringify(serializableState));
                },
                { deep: true }
            );
        },
        
        hydrateFromStorage(): void {
            const saved = localStorage.getItem("cart");
            if (!saved) return;

            try {
                const parsed = JSON.parse(saved);
                this.cartProductsStructure = new Map(parsed.cartProductsStructure);
                this.checkedProducts = new Map(parsed.checkedProducts);
                this.fullPrice = parsed.fullPrice;
            }
            catch (e) {
                console.error("Ошибка при восстановлении корзины!");
            }
        },
        
        addToCart(slug: string): void {
            const product = useProductStore().getMappedProducts.get(slug);

            //проверка наличия товара в базе данных
            if (!product) {
                console.error("Невозможно добавить - товара не существует!");
                return;
            }

            this.cartProductsStructure.set(slug, (this.cartProductsStructure.get(slug) || 0) + 1);
            if (!this.checkedProducts.has(slug))
                this.checkedProducts.set(slug, true);
            this.recountFullPrice(slug, "added");
        },

        removeFromCart(slug: string): void {
            if (!this.cartProductsStructure.has(slug)) {
                console.error("Невозможно удалить - товар отсутствует в корзине!");
                return;
            }

            const currentQuantity = this.cartProductsStructure.get(slug) || 0;
            const nextQuantity = currentQuantity - 1;
            if (nextQuantity <= 0) 
                this.cartProductsStructure.delete(slug);
            else 
                this.cartProductsStructure.set(slug, currentQuantity - 1);
            
            this.checkedProducts.delete(slug);
            this.recountFullPrice(slug, "deleted");
        },

        clearCart(): void {
            this.cartProductsStructure.clear();
            this.checkedProducts.clear();
            this.fullPrice = 0;
            
            if (this.cartProductsStructure.size || this.checkedProducts.size) console.error("Ошибка очистки корзины!");
        },

        recountFullPrice(slug: string, operation: string): void {
            const product = useProductStore().getMappedProducts.get(slug);

            //проверка наличия товара в базе данных
            if (!product) {
                console.error("Невозможно пересчитать - товара не существует!");
                return;
            }

            const totalPrice = Number(product.price);
            
            if (operation === "added") {
                this.fullPrice += totalPrice;
            }
            else if (operation === "deleted") {
                this.fullPrice -= totalPrice;
            }
            else {
                console.error("Неизвестная операция по пересчету суммы товаров в корзине!");
                return;
            }
        },

        getCheckedState(slug: string): boolean {
            return this.checkedProducts.get(slug) || false;
        }
    },

    getters: {
        getProductsFromCart: (state) => {
            const products = useProductStore().getMappedProducts;
            return Array.from(state.cartProductsStructure.keys())
            .map((slug) => products.get(slug))
            .filter(Boolean) as Array<ProductType>;
        }
    }
});