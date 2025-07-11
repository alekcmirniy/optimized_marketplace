<template>
    <div class="filter-wrapper">
        <div @click="$emit('filter-section-open')" class="photo-plus-filters">
            <img :src="Icon" class="filter-image"/>
            <p>&nbsp;Фильтр</p>
        </div>
        <div class="fast-filters">
            <p @click="setActiveFilter('popular')" :class="{ 'active-filter': activeFilter === 'popular'}">Лучшее</p>
            <p @click="setActiveFilter('new-ones-first')" :class="{ 'active-filter': activeFilter === 'new-ones-first'}">Новинки</p>
        </div>
    </div>
</template>

<script lang="ts">
import FilterIcon from '@/components/icons/Filter.png';
import { defineComponent } from 'vue';

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
            this.$emit('use-filters', newFilter);
        }
    }
});

</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.filter-wrapper {
    color: vars.$body-color;
    display: flex;
    align-items: center;
    max-width: 100%;
    justify-content: space-around;
    margin: 0 10px;
}
.filter-image {
    max-width: 30px;
}
.photo-plus-filters {
    padding: 10px;
    justify-content: center;
    min-height: 50px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: vars.$supporting-golden;
}
.fast-filters {
    width: 100%;
    justify-content:flex-end;
    gap: 10px;
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