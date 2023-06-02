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
  PostTask: (code?: object) =>
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
  PutTaskComplete: (code?: string, isCompleted?: string) =>
    instance({
      method: 'POST',
      url: `tasks/${code}`,
      data: { labels: [`${isCompleted}`] },
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
  PutTasks: (code?: string, obj?: object) =>
    instance({
      method: 'POST',
      url: `tasks/${code}`,
      data: obj,
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
};
