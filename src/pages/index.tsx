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

  useEffect(() => {
    fetchNowPlay();
  }, []);

  return (
    <Layout>
      <Section
        addClass="hero bg-base-100 -mt-0 md:-mt-12 xl:-mt-16 px-16 lg:px-24"
        id="greeting-section"
      >
        <div className="hero-content flex-col md:flex-row">
          <div className="">
            <h1 className="text-5xl font-bold">Welcome!</h1>
            <p className="py-6">
              Hello, {handleTime} this is a web for learning and this section is
              greeting, yey!
              <br />
              and click button bellow to get random top rated movie
            </p>
            <div className="flex flex-row gap-3">
              <button className="btn btn-primary">Get Random Top</button>
              <button
                id="nav-showmore"
                className="btn btn-secondary btn-outline"
                onClick={() => navigate('/category/top_rated')}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </Section>
      <Section
        addClass="bg-base-300 px-16 lg:px-24 py-16 !min-h-full"
        id="upcoming-movie-section"
      >
        <div className="w-full flex flex-col  items-center gap-5">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            Upcoming Movie
          </p>

          <button
            id="nav-showmore"
            className="btn btn-primary btn-wide"
            onClick={() => navigate('/category/upcoming')}
          >
            Show More
          </button>
        </div>
      </Section>
      <Section
        addClass="bg-base-100 px-16 lg:px-24 py-16 pt-16 "
        id="now-playing-section"
      >
        <div className="w-full min-h-screen flex flex-col items-center gap-5">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            Now Playing Movie
          </p>

          <button
            id="nav-showmore"
            className="btn btn-primary btn-wide"
            onClick={() => navigate('/category/now_playing')}
          >
            Show More
          </button>
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
