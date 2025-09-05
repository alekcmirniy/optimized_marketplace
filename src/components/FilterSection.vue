<template>
    <div class="filter-wrapper">
        <div @click="$emit('filter-section-open')" class="photo-plus-filters">
            <img :src="Icon" class="filter-image" alt="Фильтр - иконка"/>
            <p>&nbsp;Фильтр</p>
        </div>
        <button @click="$emit('reset-filters')" v-if="activeFilter">Сброс</button>
        <div class="fast-filters">
            <p @click="setActiveFilter('-rating')" :class="{ 'active-filter': activeFilter === '-rating'}">Лучшее</p>
            <p @click="setActiveFilter('created_at')" :class="{ 'active-filter': activeFilter === 'created_at'}">Новинки</p>
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
    color: vars.$body-color;
    display: flex;
    align-items: stretch;
    max-width: 100%;
    justify-content: space-around;
    margin: 0 10px;
    display: flex;
    gap: 20px;
}
.photo-plus-filters {
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background: vars.$background-gradient;
}
.filter-image {
    max-width: 25px;
}
.fast-filters {
    width: 100%;
    justify-content:flex-end;
    gap: 5px;
    display: flex;
}
.fast-filters p {
    border-radius: 20px;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:not(.active-filter) {
    background-color: color.adjust(vars.$body-color, $lightness: 10%);
    color: vars.$supporting-golden;
    }

    &.active-filter {
    background-color: vars.$supporting-golden-lighten;
    color: vars.$card-color;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
}
</style>