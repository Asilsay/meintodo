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
  getTaskIdx: (code?: string) =>
    instance({
      method: 'GET',
      url: `tasks/${code}`,
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
  DelTaskIdx: (code?: string) =>
    instance({
      method: 'DELETE',
      url: `tasks/${code}`,
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
  PostTask: (code: any) =>
    instance({
      method: 'POST',
      url: 'tasks/',
      data: code,
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
};
