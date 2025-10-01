<template>
    <div class="filter-wrapper">
        <div class="filters-plus-canceller">
            <div @click="$emit('filter-section-open')" class="photo-plus-filters" :title="activeFilter ? activeFilter : `Фильтр не выбран`">
                <img :src="Icon" class="filter-image" alt="Фильтр - иконка"/>
                <p class="filter-field">{{ filterField }}</p>
            </div>
            <button @click="$emit('reset-filters')" v-if="activeFilter">Сброс</button>
        </div>
        <div class="fast-filters">
            <p @click="setActiveFilter('-rating')" :class="{ 'active-filter': activeFilter === '-rating'}">Лучшее</p>
            <p @click="setActiveFilter('created_at')" :class="{ 'active-filter': activeFilter === 'created_at'}">Новинки</p>
            <p @click="setActiveFilter('-price')" :class="{ 'active-filter': activeFilter === '-price'}">Цена ↓</p>
            <p @click="setActiveFilter('price')" :class="{ 'active-filter': activeFilter === 'price'}">Цена ↑</p>
            <p @click="setActiveFilter('-views')" :class="{ 'active-filter': activeFilter === '-views'}">Популярное</p>
        </div>
    </div>
</template>
<script lang="ts">
import FilterIcon from "@/components/icons/Filter.png";
import { defineComponent } from "vue";

export default defineComponent ({
    name: "FilterSection",
    props: {
        activeFilter: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            Icon: FilterIcon
        }
    },
    computed: {
        filterField(): string {
            switch (this.activeFilter) {
                case "price":
                    return "По возрастанию цены";
                case "-price":
                    return "По убыванию цены";
                case "created_at":
                    return "Новинки";
                case "-rating":
                    return "По рейтингу";
                case "-views":
                    return "Популярные";
                default:
                    return "Фильтр";
            }
        }
    },
    methods: {
        setActiveFilter(filterType: string): void {
            const newFilter = this.activeFilter === filterType ? "" : filterType;
            if (this.activeFilter === filterType)
                this.$emit("reset-filters");
            else
                this.$emit("use-filters", newFilter);
        }
    },
    emits: ["filter-section-open", "reset-filters", "use-filters"]
});

</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.filter-wrapper {
    max-width: 100%;
    gap: 10px;
    color: vars.$body-color;
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
}
.photo-plus-filters {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    border-radius: 20px;
    background: vars.$background-gradient;
    padding: 0 5px;
}
.filter-image {
    max-width: 25px;
}
.fast-filters {
    display: flex;
    justify-content: space-around;
    width: 50%;
    gap: 8px;
    overflow: hidden;
    p:nth-child(n + 3) {
        display: none;
    }
}
.fast-filters p {
    height: 44px;
    width: 50%;
    text-align: center;
    border-radius: 20px;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.3s ease;

    
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:not(.active-filter) {
    background-color: color.adjust(vars.$body-color, $lightness: 10%);
    color: vars.$supporting-golden;
    }

    &.active-filter {
    background-color: vars.$supporting-golden-lighten;
    color: vars.$card-background;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
}
.filter-field {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.filters-plus-canceller {
    flex-grow: 0;
    flex-shrink: 0;
    width: 50%;
    display: flex;
    &:has(button) {
        gap: 10px;
        justify-content: center;
        .photo-plus-filters {       
            flex-grow: 1;
        }
    }
}
@media screen and (min-width: 769px) {
    .fast-filters {
        gap: 25px;
        p:nth-child(n + 1) {
            display: block;
        }

    }
    .filters-plus-canceller {
        &:has(button) {
            justify-content: space-around;
        }
        button {
            width: 500px;
        }
    }
}
</style>