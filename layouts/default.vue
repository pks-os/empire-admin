<template>
    <div class="app-container" :class="[$store.state.sidebarVisible ? 'menu-active' : null]">

        <sidebar/>

        <section class="main-content">
            <PageHeader/>
            <div v-bar>
                <div class="container-fluid">
                    <nuxt/>
                </div>
            </div>
        </section>

        <no-ssr>
            <vue-snotify></vue-snotify>
        </no-ssr>
    </div>
</template>

<script>
    import {storeMeta} from "~/helpers/mixins/storeMeta";
    import Sidebar from '~/components/specific-components/Sidebar';
    import PageHeader from '../components/specific-components/PageHeader';

    export default {
        "name": "Dashboard",
        components: {
            PageHeader,
            Sidebar
        },
        methods: {},
        watch: {
            $route () {
                this.$snotify.clear();
            }
        }
    }
</script>