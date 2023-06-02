import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from 'react';

import { Layout, Section } from '../components/Layout';
import Spinner from '../components/Loading';
import Swal from '../utils/swal';
import api from '../utils/api';
import { TodosType } from '../utils/todotypes';
import { Input, TextArea } from '../components/Input';

export const Detail = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<TodosType>>({});
  const [data, setData] = useState<TodosType>({
    content: '',
    description: '',
    id: '',
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const { detail: detail_id } = params;

  const fetchData = async () => {
    await api
      .getTaskIdx(detail_id)
      .then((response) => {
        const { data } = response;
        setData(data);
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

  const handleDelete = async () => {
    await api
      .DelTaskIdx(detail_id)
      .then((response) => {
        const { data } = response;
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Section
        addClass="bg-base-100 px-16 lg:px-24 py-6 pt-16 "
        id="now-playing-section"
      >
        <div className="w-full h-max min-h-screen flex flex-col items-center">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            TASK DETAIL
          </p>
          <div className="w-3/4 flex flex-col gap-4 justify-center">
            <div className="w-full outline-1 outline-base-300 outline p-5 rounded-lg">
              <p className="font-semibold tracking-wide">
                TITLE:{' '}
                <span className="tracking-normal font-normal capitalize ">
                  {data.content}
                </span>
              </p>
              <p className="font-semibold tracking-wide">
                STATUS:{' '}
                <span className="tracking-normal font-normal">
                  {data.labels?.[0] === 'notcompleted'
                    ? 'Not Completed'
                    : 'Completed'}
                </span>
              </p>
              <p className="font-semibold tracking-wide">
                DESCRIPTION:{' '}
                <span className="tracking-normal font-normal">
                  {data.description}
                </span>
              </p>
            </div>
            <div className="w-full flex justify-end">
              <div className="flex gap-3">
                <button
                  id="nav-watch"
                  className="btn btn-primary w-32"
                >
                  COMPLETE
                </button>
                <button
                  id="nav-watch"
                  className="btn btn-secondary w-32"
                >
                  EDIT
                </button>
                <button
                  id="nav-favorite"
                  className="btn btn-error btn-outline w-32"
                >
                  DELETE
                </button>
              </div>
            </div>
            <form className="w-full rounded-2xl outline outline-1 outline-base-300 p-6 flex flex-col gap-4 ">
              <Input
                key="input"
                id="task-name"
                type="text"
                name="Title name:"
                value={data.content}
              />

              <TextArea
                key="text-input"
                id="description"
                name="Description:"
                value={data.description}
              />

              <div className="flex justify-end">
                <button
                  id="nav-todo-list"
                  className="btn btn-secondary w-32"
                  onClick={(e) => e.preventDefault()}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Detail;
