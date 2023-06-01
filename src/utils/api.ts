import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.todoist.com/rest/v2/`,
});

export default {
  getTask: () =>
    instance({
      method: 'GET',
      url: `tasks/`,
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
  getFavo: (code: string) =>
    instance({
      method: 'GET',
      url: `account/${code}/favorite/movies?api_key=${
        import.meta.env.VITE_TODO_API
          ? import.meta.env.VITE_TODO_API
          : process.env.VITE_TODO_API
      }`,
    }),
};
