<template>
    <b-navbar variant="white" class="page-header" toggleable="md" sticky>
        <button
            class="toggle-sidebar"
            @click="$store.commit('toggleSidebar')"
            v-b-tooltip.hover title="Toggle Sidebar"
            :class="[$store.state.sidebarVisible ? 'active' : 'passive']"
        >
            <span></span>
        </button>
        <b-navbar-brand href="#">{{$store.state.pageTitle}} <small>{{$store.state.pageDescription}}</small></b-navbar-brand>

        <b-navbar-nav sticky class="ml-auto">
            <li class="nav-item">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="search" v-model.trim="searchTerm" placeholder="Search" id="search-input" autocomplete="off"></b-form-input>
                </b-nav-form>
            </li>

            <b-nav-item-dropdown class="dd-no-padding has-divider-left notification-dropdown" right no-caret>
                <template slot="button-content">
                    <span class="btn btn-silver btn-circle no-caret">
                        <i class="fas fa-comment-alt"></i> <sup class="text-warning notification-indicator"><font-awesome-icon icon="circle" /></sup>
                    </span>
                </template>
                <ul class="list-unstyled notification-list">
                    <b-media tag="li">
                        <b-img slot="aside" blank blank-color="#abc" width="64" />
                        <h5 class="mt-0 mb-1">You have a new task</h5>
                        Clean up your mess<br>
                        <small>15th, Dec 2018</small>
                    </b-media>
                </ul>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="dd-no-padding pl-2" right no-caret>
                <template slot="button-content">
                    <span class="btn btn-silver btn-circle no-caret">
                        <i class="fas fa-comment-cog"></i>
                    </span>
                </template>

                <div class="text-center px-3">
                    <img src="~/assets/img/avatar/luke.png" :alt="$store.state.user.userInfo.name.full_name" class="img-circle" width="100" />
                    <p class="pt-3 text-primary text-uppercase">{{ $store.state.user.userInfo.name.full_name }}</p>
                    <nuxt-link to="/pages/my-profile" class="btn btn-sm btn-primary">My Profile</nuxt-link>
                    <b-button @click="logOut" variant="link">Logout</b-button>
                </div>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
    name: "PageHeader",
    data(){
        return {
            searchTerm: null
        }
    },
    methods: {
        logOut(){
            // Todo: convert to mixin
            this.$store.commit('user/logout');
            this.$router.push({
                path: '/login'
            })
        }
    },
    watch: {
        searchTerm(newVal,oldVal){
            if(newVal.length > 3){
                // Todo: implement search
            }
        }
    }
}
</script>