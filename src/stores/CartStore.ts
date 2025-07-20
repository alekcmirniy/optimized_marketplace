import { defineStore } from "pinia";
import { useProductStore } from "./ProductStore";
import { watch } from "vue";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        cartProductsStructure: new Map<number, number>(),     //Map<id, quantity>
        checkedProducts: new Map<number, boolean>(),          //Map<id, true/false>
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
                {deep: true}
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
        addToCart(id: number): void {
            const productsData = useProductStore();
            const product = productsData.productsStructure.get(id);

            //проверка наличия товара в базе данных
            if (!product) {
                console.error("Невозможно добавить - товара не существует!");
                return;
            }

            this.cartProductsStructure.set(id, (this.cartProductsStructure.get(id) || 0) + 1);
            if (!this.checkedProducts.has(id))
                this.checkedProducts.set(id, true);
            this.recountFullPrice(id, "added");
        },
        removeFromCart(id: number): void {
            if (!this.cartProductsStructure.has(id)) {
                console.error("Невозможно удалить - товар отсутствует в корзине!");
                return;
            }
            const nextQuantity = (this.cartProductsStructure.get(id) || 0) - 1;
            if (nextQuantity <= 0) {
                this.cartProductsStructure.delete(id);
            }
            else {
                this.cartProductsStructure.set(id, (this.cartProductsStructure.get(id) || 0) - 1);
            }
            this.checkedProducts.delete(id);
            this.recountFullPrice(id, "deleted");
        },
        clearCart(): void {
            this.cartProductsStructure.clear();
            this.checkedProducts.clear();
            if (this.cartProductsStructure.size || this.checkedProducts.size) console.error("Ошибка очистки корзины!");
            this.fullPrice = 0;
        },
        recountFullPrice(id: number, operation: string): void {
            const productsData = useProductStore().productsStructure;
            const prod = productsData.get(id);

            if (operation === "added") {
                this.fullPrice += prod?.price || 0;
            }
            else if (operation === "deleted") {
                this.fullPrice -= prod?.price || 0;
            }
            else {
                console.error("Неизвестная операция по пересчету суммы товаров в корзине!");
                return;
            }
        },
        getCheckedState(id: number): boolean {
            return this.checkedProducts.get(id) || false;
        }
    },

    getters: {
        getProductsFromCart: (state) => {
            return useProductStore().allProducts.filter((product) => (state.cartProductsStructure.has(product.id)))
        }
    }
});