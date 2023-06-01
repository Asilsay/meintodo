import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from 'react';

import { Layout, Section } from '../components/Layout';
import Spinner from '../components/Loading';
import swal from '../utils/swal';
import api from '../utils/api';

export const Detail = () => {
  return (
    <Layout>
      <Section
        addClass="bg-base-100 px-16 lg:px-24 py-6 pt-16 "
        id="now-playing-section"
      >
        <div className="w-full min-h-screen flex flex-col items-center">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold "></p>
          <div className="flex gap-4 justify-center">
            <figure className="">
              <img
                src={`${'https://placehold.co/500x750/png?text=No+Image+Preview&font=roboto'}`}
                className="w-96 rounded-2xl "
              />
            </figure>
            <div className="flex flex-col w-2/5 justify-between">
              <div className="">
                <p className="font-semibold tracking-wide">
                  Runtime:{' '}
                  <span className="tracking-normal font-normal">minutes</span>
                </p>
                <p className="font-semibold tracking-wide">Genre: </p>
                <p className="font-semibold tracking-wide">
                  Language:{' '}
                  <span className="tracking-normal font-normal"></span>
                </p>
                <p className="font-semibold tracking-wide">
                  Status:{' '}
                  <span className="tracking-normal font-normal">{status}</span>
                </p>
                <p className="font-semibold tracking-wide">
                  Description:{' '}
                  <span className="tracking-normal font-normal"></span>
                </p>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex gap-3">
                  <button
                    id="nav-favorite"
                    className="btn btn-primary "
                  >
                    Add to favorite
                  </button>
                  <button
                    id="nav-watch"
                    className="btn btn-outline btn-primary"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Detail;
