<template>
    <div class="slider-wrapper" aria-label="Галерея-подборок">
        <div>
            <img v-if="slides?.length" class="slider-image" :src="slides[currentIndex].src" :alt="slides[currentIndex].alt" :loading="slides[currentIndex].loading" role="img" />
        </div>
    </div>
</template>

<script lang="ts">
import type { Slide } from "@/utils/slides";
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CompilationSlider",
    props: {
        slides: {
            type: Array<Slide>,
            required: true
        }
    },
    data() {
        return {
            currentIndex: 0,
            interval: null as number | null
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        }, 5000);
    },
    unmounted() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    }
});
</script>

<style scoped lang="scss">
.slider-wrapper {
    min-height: 18vh;
    max-width: 100%;
}
.slider-image {
    max-width: 100%;
    overflow: hidden;
}
@media screen and (min-width: 769px) {
    .slider-wrapper {
        max-width: 60%;
    }
    .slider-image {
        width: 100%;
    }
}
</style>