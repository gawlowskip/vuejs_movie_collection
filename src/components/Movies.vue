<template>
    <section>
        <div class="title">
            <h2>Movies</h2>
        </div>
        <div class="content">
            <ul class="actions">
                <li v-for="(option, key) in sortByOptions" :key="`sort-by-${key}`">
                    <button type="button" class="button small" :class="{'primary': sortBy === key}"
                            @click.prevent="sortBy = key; getMovies({'sortBy': key, 'page': 1})"
                            :disabled="search.length >= 1">{{ option }}
                    </button>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="instant-search mb-2">
                <input type="text" v-model="search" @keyup.enter="searchMovies(search)"
                       placeholder="What are you looking for?">
            </div>
        </div>
        <div class="items">
            <article v-for="movie in movies.results" :key="`movie-${movie.id}`">
                <router-link :to="{name: 'movieDetails', params: {movieId: movie.id}}">
                    <a href="#" class="image">
                        <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/no-image.png'"
                             :alt="movie.title"/>
                    </a>
                </router-link>
                <h3>{{ movie.title }}</h3>
                <p>{{ movie.overview }}</p>
                <ul class="actions">
                    <router-link :to="{name: 'movieDetails', params: {movieId: movie.id}}" tag="li" exact><a
                            class="button">Details</a></router-link>
                </ul>
            </article>
        </div>
        <div class="content" v-if="!search">
            <ul class="pagination">
                <li>
                    <button class="button" :class="{'disabled': currentPage <= 1}"
                            @click.prevent="getMovies({'sortBy': sortBy, 'page': currentPage - 1})"
                            :disabled="currentPage <= 1">Previous
                    </button>
                </li>
                <li v-for="page in pages" :key="`page-${page}`">
                    <a href="#" class="page" :class="{'active': page === currentPage}"
                       @click.prevent="getMovies({'sortBy': sortBy, 'page': page})">{{ page }}</a>
                </li>
                <li>
                    <button class="button" :class="{'disabled': currentPage + 1 >= totalPages}"
                            @click.prevent="scrollToTop(); getMovies({'sortBy': sortBy, 'page': currentPage + 1})"
                            :disabled="currentPage + 1 >= totalPages">Next
                    </button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import VueScrollTo from 'vue-scrollto';
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "Movies",
        data() {
            return {
                sortBy: 'popularity.desc',
                search: ''
            }
        },
        methods: {
            ...mapActions([
                'getMovies',
                'storeMovies',
                'searchMovies'
            ]),
            scrollToTop() {
                setTimeout(() => {
                    VueScrollTo.scrollTo('.title', 500, {easing: 'ease-in'});
                }, 1000);
            }
        },
        watch: {
            search(to) {
                if (!to) {
                    this.getMovies({'sortBy': this.sortBy, 'page': 1})
                } else {
                    this.searchMovies(this.search);
                }
            },
        },
        computed: {
            ...mapGetters([
                'movies',
                'sortByOptions',
                'foundMovies',
                'currentPage',
                'totalPages'
            ]),
            pages() {
                let array = Array.from(Array(this.totalPages).keys()).map(i => i + 1);
                let currentIndex = array.findIndex((item) => {
                    return item === this.currentPage;
                });
                if (currentIndex < 3) {
                    currentIndex = 0;
                } else {
                    currentIndex -= 2;
                }

                return array.slice(currentIndex, currentIndex + 6);
            }
        },
        created() {
            this.getMovies({'sortBy': this.sortBy});
        }
    }
</script>

<style scoped>

</style>