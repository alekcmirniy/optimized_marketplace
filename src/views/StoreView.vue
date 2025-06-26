<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <p class="filter-section">Место для фильтров</p>
        <ul class="card-catalog">
            <li v-for="product of tempDatabase" :key="product.id" >
                <ProductCard :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue'
import db from '@/backend/database';
import { Product } from '@/backend/database';

export default {
    name: "StoreView",
    components: { MainHeader, ProductCard },
    data() {
        return {
            headerData: {
                headerText: "Каталог",
                searchRequired: true,
                notificationsRequired: true
            },
            tempDatabase: db.ProductDatabase as Array<Product> || []
        }
    }
}

</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
}
.filter-section {
    margin: 0 10px;
}
.card-catalog {
    border: solid 1px black;
    display: grid;
    grid-template-columns: 45% 45%;
    gap: 20px;
    list-style-type: none;
}
@media screen and (min-width: 769px) {
    .card-catalog {
        gap: 8px;
        grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
    }
}
</style>