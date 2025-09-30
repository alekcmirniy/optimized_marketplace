<template>
    <transition name="fade">
        <div class="button-wrapper" v-show="showButton" @click="scrollToTop" >
            <button>
                <img :src="Icon" alt="Прокрутить страницу вверх" />
            </button>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoToTopIcon from '@/components/icons/GoToTopArrow.png'

export default defineComponent({
    data() {
        return {
            Icon: GoToTopIcon
        }
    },
    props: {
        showButton: {
            required: true,
            type: Boolean,
            default: false
        }
    },
    methods: {
        scrollToTop(): void {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }
})

</script>

<style scoped lang="scss">
@use '/src/assets/_variables.scss' as vars;
.button-wrapper {
    position:fixed;
    bottom: vars.$nav-bar-height + 1;
    right: 12px;
    opacity: 0.8;
    z-index: 1;
}

img {
    width: 25px;
    height: auto;
    display: block;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

</style>