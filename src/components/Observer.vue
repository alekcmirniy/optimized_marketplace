<template>
    <div class="observer"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            observer: null as IntersectionObserver | null
        }
    },
    props: {
        options: {
            type: Object,
            required: false,
            default: () => ({
                rootMargin: '600px'
            })
        }
    },
    emits: ['intersect'],
    mounted() {
        setTimeout(() => {
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                this.$emit('intersect');
            }
        }, this.options);
        this.observer.observe(this.$el);
        }, 500);
    },
    unmounted() {
        this.observer?.disconnect();
    }
})
</script>