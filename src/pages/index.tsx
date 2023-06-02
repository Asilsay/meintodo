import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

import { Layout, Section } from '../components/Layout';

import api from '../utils/api';
import swal from '../utils/swal';
import Toast from '../utils/toast';
import { TodosType } from '../utils/todotypes';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const LazyCard = lazy(() => import('../components/Card'));

type formInput = {
  content: string;
  description: string;
  labels?: Array<string>;
};

const Home = () => {
  const [datasTodo, setDatasTodo] = useState<TodosType[]>([]);

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(Toast);

  const schema: ZodType<formInput> = z.object({
    content: z.string().min(3, 'Title is required').max(30),
    description: z
      .string()
      .min(1, 'Description is required')
      .min(10, 'Description must have more than 10 character')
      .max(100),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formInput>({
    resolver: zodResolver(schema),
  });

  const submitDataTodo = (data: formInput) => {
    data.labels = ['notcompleted'];
    postDatas(data);
    reset();
  };

  const postDatas = async (code: any) => {
    await api
      .PostTask(code)
      .then((response) => {
        const { data } = response;
        MyToast.fire({
          icon: 'success',
          title: 'success submit todo',
        });
        fetchDatas();
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const fetchDatas = async () => {
    await api
      .getTask()
      .then((response) => {
        const { data } = response;
        setDatasTodo(data);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const handleNav = (movie_id?: number) => {
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  };

  const handleClickScroll = (x: string) => {
    const element = document.getElementById(x);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <Layout>
      <Section
        addClass=" bg-base-100 -mt-0 md:-mt-12 xl:-mt-16 px-16 lg:px-24"
        id="greeting-section"
      >
        <div className="w-full min-h-screen flex flex-col gap-7 items-center md:flex-row">
          <form
            onSubmit={handleSubmit(submitDataTodo)}
            className="w-1/2 rounded-2xl outline outline-1 outline-base-300 p-6 flex flex-col gap-2 "
            id="post"
          >
            <div className="h-28">
              <label
                htmlFor="task-name"
                className="label label-text"
              >
                task name
              </label>
              <input
                id="task-name"
                type="text"
                placeholder="type your task name here"
                className="input input-bordered input-secondary w-full mb-2"
                {...register('content')}
              />
              {errors.content && (
                <span className="text-error-content">
                  {errors.content?.message}
                </span>
              )}
            </div>

            <div className="h-56">
              <label
                className="label label-text"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                id="description"
                placeholder="type your description here"
                className="textarea textarea-secondary w-full h-40"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-error-content">
                  {errors.description?.message}
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <button
                id="nav-todo-list"
                form="post"
                className="btn btn-secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit Todo
              </button>
            </div>
          </form>
          <div className="w-1/2">
            <h1 className="text-5xl font-bold">Write Your Todo List</h1>
            <p className="py-6">
              Hello, this is a web for project test react typescript,
              <br />
              you can submit your todo at left of this section
            </p>

            <button
              id="nav-todo-list"
              className="btn btn-secondary btn-outline"
              onClick={() => handleClickScroll('your-todo-section')}
            >
              Check Todo
            </button>
          </div>
        </div>
      </Section>
      <Section
        addClass="bg-base-200 px-16 lg:px-24 py-16 "
        id="your-todo-section"
      >
        <div className="w-full min-h-screen flex flex-col pt-12 items-center gap-5">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            Your Todo List
          </p>
          <div className="w-full p-4">
            <Suspense
              fallback={
                <span className="loading loading-spinner loading-lg"></span>
              }
            >
              <div className="grid  grid-cols-1 gap-5">
                {datasTodo.map((data, idx) => {
                  return (
                    <LazyCard
                      id={data.id}
                      key={`${idx}-todo`}
                      content={data.content}
                      status={data.labels}
                    />
                  );
                })}
              </div>
            </Suspense>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
