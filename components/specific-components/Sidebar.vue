<template>
    <aside class="app-sidebar" :class="{retracted:!$store.state.sidebarVisible}">
        <div class="scrollable-content" v-bar="{useScrollbarPseudo:true}">
            <div>
                <div class="info-bar">
                    <button class="log-off" @click="logOut" v-b-tooltip.hover title="Logout">
                        <i class="fas fa-power-off"></i>
                    </button>

                    <h4 class="text-center">{{siteTitle}}</h4>
                </div>
                <div class="user-block">
                    <img src="~/assets/img/avatar/luke.png" :alt="$store.state.user.userInfo.name.full_name" class="img-circle" />

                    <div class="welcome-gauge pt-2">
                        <h6><small>Welcome</small>{{ $store.state.user.userInfo.name.first_name }}</h6>
                        <h6 class="position-relative">
                            <small v-text="cDate"></small>{{ getZeroPad(hours) }}:{{ getZeroPad(minutes) }}
                            <i :icon="(hours >= 20 && hours <=  7) ? 'fa fa-moon' : 'fa fa-sun'"></i>
                        </h6>
                    </div>
                </div>

                <ul class="sidebar-nav" v-if="sitemap.length > 0">
                    <sitemap-node v-for="node in sitemap" :key="node.path" :node="node" :namespace="'mainMenu'"></sitemap-node>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
import SitemapNode from "./SitemapNode";
import Sitemap from "../../data/sitemap";

export default {
    name: "Sidebar",
    components: {SitemapNode},
    methods: {
        updateDateTime () {
            let now = new Date();
            this.cDate = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();
            this.hours = now.getHours();
            this.minutes = now.getMinutes();
        },
        getZeroPad(n) {
            return (parseInt(n, 10) >= 10 ? '' : '0') + n
        },
        logOut(){
            this.$store.commit('user/logout');
            this.$router.push({
                path: '/login'
            })
        }
    },
    mounted () {
        this.$options.interval = setInterval(this.updateDateTime, 1000);
    },
    beforeDestroy () {
        clearInterval(this.$options.interval);
    },
    data:()=> (
        {
            sitemap: Sitemap,
            routes: [],
            siteTitle: process.env.defaultTitle,
            hours: 0,
            minutes: 0,
            cDate: null
        }
    )
}
</script>