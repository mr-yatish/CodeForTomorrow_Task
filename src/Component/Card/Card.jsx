import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeCard } from "../../Redux/Cards/cardsSlice";
import { RxCross1 } from "react-icons/rx";

const Card = ({ post, onRemove }) => {
  const dispatch = useDispatch();

  const handleRemoveCard = () => {
    dispatch(removeCard(post.id));
    onRemove(); // Optional: Notify parent component if needed
  };

  return (
    <div className="bg-white rounded-lg w-[300px] p-5 shadow-md relative">
      <div className="absolute top-2 right-2">
        <button
          onClick={handleRemoveCard}
          className="text-red-400 text-3xl font-extrabold"
        >
          <RxCross1 />
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2 h-14 w-full line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-700 line-clamp-2">{post.body}</p>
      <span className="font-bold tracking-wide text-gray-400">
        Mon, 21 Dec 2020 14.57 GMT
      </span>
      <img
        className="w-full h-42 object-cover mt-4 rounded-md"
        src="https:/plus.unsplash.com/premium_photo-1718198497330-08b58f749d4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Card Image"
      />
    </div>
  );
};

Card.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired, // Optional: Add if you want to notify parent
};

export default Card;
