import { useState, useEffect } from "react";
import { useGetPostsQuery } from "../../Redux/apiSlice";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addCard, removeCard } from "../../Redux/Cards/cardsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [showCards, setShowCards] = useState(false); // State to control card visibility
  const postsPerPage = 6;

  const cards = useSelector((state) => state.cards.cards); // Accessing cards state from Redux

  useEffect(() => {
    if (posts) {
      dispatch(addCard(posts));
    }
  }, [dispatch, posts]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCards(true); // Show cards after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout); // Clean up timeout on component unmount
  }, []);

  if (isLoading || !showCards) return <div className="flex justify-center items-center text-4xl ">Loading...</div>; // Show loading indicator

  if (error) return <div className="flex justify-center items-center text-4xl ">Error: {error.message}</div>;

  const totalPages = Math.ceil(cards.length / postsPerPage);
  const currentPosts = cards.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleRemove = (postId) => {
    dispatch(removeCard(postId));
  };

  return (
    <div className="px-40 py-10 bg-[#E4EAEF]">
      <div className="flex justify-around items-start flex-wrap gap-5">
        {currentPosts.map((post) => (
          <Card
            key={post.id}
            post={post}
            onRemove={() => handleRemove(post.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
