import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const fetchAboutFilms = async (id, parametr) => {
  const response = await axios.get(`/movie/${id}`, {
    params: {
      append_to_response: parametr,
    },

    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUxM2IzMzRhYWY4OGIwNGM3YjU4NTNhMmQ5NWU0ZiIsInN1YiI6IjY2MWY3YWM3NTI4YjJlMDE3ZDQwNTRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eqXqpcwr5toykUHuTXHsxwVGFDppc72zI4uHWUB8Q4g',
    },
  });
  return response.data;
};
