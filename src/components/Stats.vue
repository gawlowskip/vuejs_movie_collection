<template>
    <section>
        <div class="title">
            <h2>Stats</h2>
        </div>
        <div class="items align-center" v-if="Object.keys(topRatedData).length">
            <article>
                <BarChart id="chart_1" title="Top Rated Movies" xKey="title" yKey="vote_average"
                          :data="topRatedData"></BarChart>
            </article>
            <article>
                <BarChart id="chart_2" title="Vote / Rating Count" xKey="title" yKey="vote_average_count"
                          :data="topRatedData"></BarChart>
            </article>
        </div>
    </section>
</template>

<script>
    import BarChart from "./BarChart";
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "Stats",
        components: {
            BarChart
        },
        watch: {
            topRatedMovies(to) {
                if (!Object.keys(to).length) {
                    return false;
                }

                let topRatedData = (to.results).slice(0, 10);

                topRatedData.forEach((movie) => {
                    movie.vote_average_count = parseFloat(movie.vote_average / movie.vote_count).toFixed(3);
                });

                this.topRatedData = topRatedData;
            }
        },
        data() {
            return {
                topRatedData: []
            }
        },
        methods: {
            ...mapActions([
                'getTopRatedMovies',
            ]),
        },
        computed: {
            ...mapGetters([
                'topRatedMovies',
            ]),
        },
        created() {
            this.getTopRatedMovies();
        }
    }
</script>

<style scoped>

</style>