import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from 'react';

import { Layout, Section } from '../components/Layout';
import Swal from '../utils/swal';
import api from '../utils/api';
import { TodosType } from '../utils/todotypes';
import { Input, TextArea } from '../components/Input';
import toast from '../utils/toast';

import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type formInput = {
  content: string;
  description: string;
  labels?: Array<string>;
};

export const Detail = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<TodosType>>({});
  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<TodosType>({
    content: '',
    description: '',
    id: '',
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();
  const MySwal = withReactContent(Swal);
  const MyToast = withReactContent(toast);
  const navigate = useNavigate();

  const { detail: detail_id } = params;

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

  const updateDataTodo = (data: formInput) => {
    handleUpdate(data);
  };

  const fetchData = async () => {
    setLoad(true);
    await api
      .getTaskIdx(detail_id)
      .then((response) => {
        const { data } = response;
        setData(data);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      })
      .finally(() => setLoad(false));
  };

  const handleDelete = async () => {
    MySwal.fire({
      icon: 'question',
      title: 'DELETE',
      text: `are you sure delete ${data.content}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .DelTaskIdx(detail_id)
          .then((response) => {
            navigate('/');
            MyToast.fire({
              icon: 'success',
              title: 'success deleted todo',
            });
          })
          .catch((error) => {
            MySwal.fire({
              icon: 'error',
              title: 'Failed',
              text: `error :  ${error.message}`,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const handleComplete = async () => {
    const isCompleted = data.labels?.[0];
    MySwal.fire({
      icon: 'question',
      title: 'COMPLETE',
      text: `are you sure complete ${data.content}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .PutTaskComplete(
            detail_id,
            isCompleted === 'notcompleted' ? 'completed' : 'notcompleted'
          )
          .then((response) => {
            fetchData();
            MyToast.fire({
              icon: 'success',
              title: 'success completed tasks',
            });
          })
          .catch((error) => {
            MySwal.fire({
              icon: 'error',
              title: 'Failed',
              text: `error :  ${error.message}`,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const handleUpdate = async (code: object) => {
    MySwal.fire({
      icon: 'question',
      title: 'UPDATE',
      text: `finish update ${data.content}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .PutTasks(detail_id, code)
          .then((response) => {
            fetchData();
            setIsEdit(!isEdit);
            MyToast.fire({
              icon: 'success',
              title: 'success updated tasks',
            });
          })
          .catch((error) => {
            MySwal.fire({
              icon: 'error',
              title: 'Failed',
              text: `error :  ${error.message}`,
              showCancelButton: false,
            });
          });
      }
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
              {load ? (
                <div className="w-full h-full flex justify-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="w-full flex justify-end">
              <div className="flex gap-3">
                <button
                  id="nav-watch"
                  className="btn btn-primary w-32"
                  onClick={() => handleComplete()}
                >
                  COMPLETE
                </button>
                <button
                  id="nav-watch"
                  className="btn btn-secondary w-32"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  EDIT
                </button>
                <button
                  id="nav-favorite"
                  className="btn btn-error btn-outline w-32"
                  onClick={() => handleDelete()}
                >
                  DELETE
                </button>
              </div>
            </div>
            {isEdit === false ? (
              <></>
            ) : (
              <form
                onSubmit={handleSubmit(updateDataTodo)}
                className="w-full rounded-2xl outline outline-1 outline-base-300 p-6 flex flex-col gap-2 "
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
                    defaultValue={data.content}
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
                    defaultValue={data.description}
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
                    className="btn btn-secondary w-32"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Detail;
