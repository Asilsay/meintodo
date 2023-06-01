import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Layout, Section } from '../components/Layout';

import Spinner from '../components/Loading';
import api from '../utils/api';
import swal from '../utils/swal';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [handleTime, setHandleTime] = useState<string>('');
  const [datasNowPlay, setDatasNowPlay] = useState<[]>([]);
  const [datasUpc, setDatasUpc] = useState<[]>([]);
  const [datasTopRate, setDatasTopRate] = useState<any>({
    title: '',
    overview: '',
    poster_path: '',
    id: 0,
  });

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const fetchNowPlay = async () => {
    setIsLoading(true);
    await api
      .getTask()
      .then((response) => {
        const { results } = response.data;
        console.log(response);
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
          <div className="w-1/2 rounded-2xl outline outline-1 outline-base-300 p-6">
            s
          </div>
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
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
