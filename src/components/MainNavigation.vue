<template>
    <div class="wrapper">
        <nav class="nav-bar" role="navigation" aria-label="Навигационное меню">
            <ul class = "nav-list">
                <li class="nav-item" v-for="link in links" :key="link.name">
                    <router-link
                    :to="link.path"
                    class="nav-link"
                    active-class="router-link-active"
                    aria-current="page"
                    >
                    {{ link.label }}
                    <img :src="link.src" :alt="link.alt" class="nav-icon" />
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeIcon from "@/components/icons/Home.png";
import StoreIcon from "@/components/icons/Store.png";
import CartIcon from "@/components/icons/Cart.png";
import ProfileIcon from "@/components/icons/Profile.png";

export default defineComponent({
    name: "MainNavigation",
    data() {
        return {
            links: [
                {name: "home", path: "/", src: HomeIcon, alt: 'Главная - иконка', label: "Главная"},
                {name: "store", path: "/store", src: StoreIcon, alt: 'Каталог - иконка', label: "Каталог"},
                {name: "cart", path: "/cart", src: CartIcon, alt: 'Корзина - иконка', label: "Корзина"},
                {name: "profile", path: "/profile", src: ProfileIcon, alt: 'Профиль - иконка', label: "Профиль"}
            ]
        }
    }
});

</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
$nav-item-color: rgb(238, 225, 235);
$nav-bar-color: vars.$supporting-golden-lighten;
.nav-bar {
    position:fixed;
    bottom: 0;
    height: vars.$nav-bar-height;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: solid 1px black;
    z-index: 100;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: rgba(20, 20, 20, 0.6);
}
.nav-item {
    display: flex;
    flex-grow: 1;
    justify-content:space-around;
}
.nav-list {
    display: flex;
    list-style: none;
    width: 100vw;
}
.nav-link {
    color: black;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    -ms-flex-direction: column;
    letter-spacing: 1px;
    align-items: center;
    transition: 0.15s;
    padding: 0;
    flex-grow: 0.5;
    -ms-flex-positive: 0.5;
    background: vars.$background-gradient;
    border-radius: 10px;
    opacity: 0.75;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.nav-icon {
    width: 20px;
    padding-top: 5px;
}
.nav-link:hover, .router-link-active {
    transform: scale(1.07);
}
.router-link-active {
    opacity: 1;
}
</style>