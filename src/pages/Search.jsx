import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import Card from "../components/Card";
import useDebounce from "../hooks/UseDebounce";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location?.search?.slice(3)?.trim();
  const [searchInput, setSearchInput] = useState(
    query?.split("%20")?.join(" ") || ""
  );
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNum = 1, isNewSearch = false) => {
    if (!query) return;

    try {
      setLoading(true);
      const response = await axios.get(`/search/multi`, {
        params: { query, page: pageNum },
      });

      const results = response.data.results || [];
      setHasMore(results.length > 0);

      if (isNewSearch) {
        setData(results);
      } else {
        setData((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchInput(query.split("%20").join(" "));
    }
  }, [query]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/search?q=${debouncedSearchTerm}`);
    } else if (debouncedSearchTerm === "" && searchInput === "") {
      navigate("/search");
    }
  }, [debouncedSearchTerm, navigate]);

  useEffect(() => {
    if (query) {
      setPage(1);
      fetchData(1, true);
    } else {
      setData([]);
    }
  }, [query]);

  useEffect(() => {
    if (page > 1 && query) fetchData(page);
  }, [page]);

  const handleScroll = () => {
    if (
      hasMore &&
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="py-22 min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Mobile Search Bar */}
      <div className="lg:hidden my-3 mx-3 sticky top-[70px] z-30">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies, TV shows..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="px-4 py-3 pl-11 text-base w-full rounded-xl bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-800 placeholder-gray-500 shadow-lg focus:shadow-xl transition-all duration-300 outline-none"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="container mx-auto px-3">
        {query && data.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Search Results for "{query.split("%20").join(" ")}"
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <p className="text-gray-500 mt-3 text-sm">
                Found {data.length} {data.length === 1 ? "result" : "results"}
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
              {data.map((el) => (
                <Card
                  data={el}
                  key={`${el.id}-${el.media_type}`}
                  media_type={el.media_type}
                />
              ))}
            </div>
            {loading && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
          </>
        ) : query && data.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <SearchIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any matches for "{query.split("%20").join(" ")}".
              Try different keywords or check your spelling.
            </p>
          </div>
        ) : loading && page === 1 ? (
          <div className="flex justify-center items-center mt-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mb-6">
              <SearchIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Start Your Search
            </h3>
            <p className="text-gray-500 max-w-md">
              Type something in the search bar to discover movies and TV shows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
