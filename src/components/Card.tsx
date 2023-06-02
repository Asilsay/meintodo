import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  content?: string;
  status?: Array<string>;
  description?: string;
  priority?: number;
  id?: string;
  label?: string;
}

const LazyCard: FC<Props> = (props) => {
  const { content, id, status } = props;

  const label = status?.[0];

  return (
    <Link to={`/detail/${id}`}>
      <div
        className="h-16 w-full  p-4 items-center justify-between file:placeholder: bg-base-300 rounded-box shadow-md tooltip flex flex-row"
        data-tip="click to detail"
      >
        <p className="text-lg tracking-wide font-semibold text-base-content uppercase">
          {content}
        </p>
        <p className="text-lg tracking-wide font-semibold text-base-content uppercase">
          {label}
        </p>
      </div>
    </Link>
  );
};

export default LazyCard;
