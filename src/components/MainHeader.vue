<template>
    <h1 class="siteName"> {{ siteName }}</h1>
    <div class="wrapper">
        <p class="header-current-page">{{ header.headerText }}</p>
        <aside class = "header-aside">
            <img v-show="header.searchRequired" v-bind:src="iconPaths.SearchIcon" class="header-icons search-icon"/>
            <img v-show="header.notificationsRequired" v-bind:src="iconPaths.NotificationsIcon" class="header-icons notification-icon"/>
        </aside>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchIcon from "@/components/icons/Search.png";
import NotificationsIcon from "@/components/icons/Notifications.png";

export default defineComponent({
    name: "MainHeader",
    props: {
            header: {
                type: Object,
                required: true
            }
        },
    data() {
        return {
            siteName: "MarketplaceVue",
            iconPaths: {
                SearchIcon,
                NotificationsIcon
            }
        }
    }
});

</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
}
.header-current-page {
    font-size: 20px;
    align-self: center;
    font-weight: 600;
}
.siteName {
    justify-self:center;
    font-size: 36px;
    font-weight: bold;
    padding-top: 3px;
}
.header-aside {
    padding-top: 5px;
    display: flex;
    align-self: flex-start;
    gap: 10px;
}
.header-icons {
    padding: 8px;
    max-width: 5.5vh;
    border: solid 1px black;
    border-radius: 20%;
}
</style>