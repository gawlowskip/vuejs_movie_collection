import axios from 'axios';

const state = {
    movies: [],
    topRatedMovies: [],
    currentMovie: [],
    apiKey: 'f5113d82bf25e774efd85825b36c9f09',
    foundMovies: [],
    sortByOptions: {
        'popularity.desc': 'Most Popular',
        'vote_average.desc': 'Highest Rated',
        'revenue.desc': 'Highest Grossing',
    },
    searchInProgress: false,
    currentPage: 1,
    totalPages: 1
};

const getters = {
    apiKey: state => {
        return state.apiKey;
    },
    movies: state => {
        return state.movies;
    },
    topRatedMovies: state => {
        return state.topRatedMovies;
    },
    currentMovie: state => {
        return state.currentMovie;
    },
    foundMovies: state => {
        return state.foundMovies;
    },
    sortByOptions: state => {
        return state.sortByOptions;
    },
    currentPage: state => {
        return state.currentPage;
    },
    totalPages: state => {
        return state.totalPages;
    }
};

const mutations = {
    storeMovies: (state, movies) => {
        state.movies = movies;
    },
    storeTopRatedMovies: (state, topRatedMovies) => {
        state.topRatedMovies = topRatedMovies;
    },
    storeCurrentMovie: (state, currentMovie) => {
        state.currentMovie = currentMovie;
    },
    storeFoundMovies: (state, foundMovies) => {
        state.foundMovies = foundMovies;
        state.searchInProgress = false;
    },
    storeCurrentPage: (state, currentPage) => {
        state.currentPage = currentPage;
    },
    storeTotalPages: (state, totalPages) => {
        state.totalPages = totalPages;
    }
};

const actions = {
    getMovies: ({state, commit}, data) => {
        let sortBy = 'popularity.desc';
        if (data.sortBy) {
            sortBy = data.sortBy;
        }

        let page = state.currentPage;
        if (data.page) {
            page = data.page;
        }

        axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=${sortBy}&page=${page}&api_key=${state.apiKey}`)
            .then(response => {
                commit('storeMovies', response.data);
                commit('storeCurrentPage', response.data.page);
                commit('storeTotalPages', response.data.total_pages);
            });
    },
    getTopRatedMovies: ({ state, commit }) => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${state.apiKey}`)
            .then(response => {
                commit('storeTopRatedMovies', response.data);
            });
    },
    getMovieDetails: ({state, commit}, movieId) => {
        state.currentMovie = [];
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${state.apiKey}`)
            .then(response => {
                commit('storeCurrentMovie', response.data);
            });
    },
    storeMovies: ({commit}, movies) => {
        commit('storeMovies', movies);
    },
    searchMovies: ({state, commit}, query) => {
        if (state.searchInProgress) {
            return false;
        }
   
        state.searchInProgress = true;
        state.foundMovies = [];
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${state.apiKey}&query=${query}`)
            .then(response => {
                commit('storeMovies', response.data);
                commit('storeCurrentPage', 1);
                commit('storeTotalPages', 1);
                state.searchInProgress = false;
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}