import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

import { Layout, Section } from '../components/Layout';

import Spinner from '../components/Loading';
import api from '../utils/api';
import swal from '../utils/swal';
import { Input, TextArea } from '../components/Input';
import { TodosType } from '../utils/todotypes';

const LazyCard = lazy(() => import('../components/Card'));

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [datasTodo, setDatasTodo] = useState<TodosType[]>([]);

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const fetchNowPlay = async () => {
    setIsLoading(true);
    await api
      .getTask()
      .then((response) => {
        const { data } = response;
        setDatasTodo(data);
        console.log(data);
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
    fetchNowPlay();
  }, []);

  return (
    <Layout>
      <Section
        addClass=" bg-base-100 -mt-0 md:-mt-12 xl:-mt-16 px-16 lg:px-24"
        id="greeting-section"
      >
        <div className="w-full min-h-screen flex flex-col gap-7 items-center md:flex-row">
          <form className="w-1/2 rounded-2xl outline outline-1 outline-base-300 p-6 flex flex-col gap-4 ">
            <Input
              key="input"
              id="task-name"
              type="text"
              name="Task name:"
              placeholder="type your task name here"
            />

            <TextArea
              key="text-input"
              id="description"
              name="Description:"
              placeholder="type your description here"
            />

            <div className="flex justify-end">
              <button
                id="nav-todo-list"
                className="btn btn-secondary"
                onClick={(e) => e.preventDefault()}
              >
                Check Todo
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
