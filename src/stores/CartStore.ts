import { defineStore } from "pinia";
import { useProductStore } from "./ProductStore";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        cartProducts: new Map<number, number>(),     //Map<id, quantity>
        fullPrice: 0
    }),
    
    actions: {
        addToCart(id: number): void {
            const productsData = useProductStore();
            const product = productsData.productsStructure.get(id);

            //проверка наличия товара в базе данных
            if (!product) {
                console.error("Невозможно добавить - товара не существует!");
                return;
            }

            this.cartProducts.set(id, this.cartProducts.get(id) || 0 + 1);
            this.recountFullPrice(id, "added");
        },
        removeFromCart(id: number): void {
            if (!this.cartProducts.has(id)) {
                console.error("Невозможно удалить - товар отсутствует в корзине!");
                return;
            }
            this.cartProducts.delete(id);
            this.recountFullPrice(id, "deleted");
        },
        clearCart(): void {
            this.cartProducts.clear();
            if (this.cartProducts.size) console.error("Ошибка очистки корзины!");
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
        }
    },

    getters: {
        getProductsFromCart: (state) => {
            const productsData = useProductStore().allProducts;
            return productsData.filter((product) => (state.cartProducts.has(product.id)))
        }
    }
});