import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const Explore = () => {
  const { explore } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (currentPage) => {
      try {
        setLoading(true);
        const response = await axios.get(`/discover/${explore}`, {
          params: {
            page: currentPage,
          },
        });
        setData((prev) => {
          return [...prev, ...response.data.results];
        });
        setTotalPage(response.data.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [explore]
  );

  const handelScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData(1);
  }, [explore, fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
  }, []);
  return (
    <div className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="capitalize text-lg font-semibold mt-5 mb-10 ml-8 lg:text-3xl">
          Popular {explore === "tv" ? "TV Series" : "Movies"}
        </h2>

        {data.length === 0 && !loading ? (
          <p className="text-center text-neutral-500 my-8">
            No {explore} found.
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-center">
            {data.map((item) => (
              <Card key={item.id} data={item} media_type={explore} />
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center my-8">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
              role="status"
              aria-label="Loading"
            />
            <p className="text-neutral-500 mt-2">Loading more {explore}...</p>
          </div>
        )}

        {!loading && page >= totalPage && data.length > 0 && (
          <p className="text-center text-neutral-500 my-8">
            No more {explore} to load
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
