import { Star } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageUrl = useSelector((state) => state.movraxData.imageUrl);
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded-xl relative hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
      <div className="relative w-full h-full">
        {data?.poster_path ? (
          <img
            src={`${imageUrl}${data?.poster_path}`}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            alt={data?.title || data?.name}
          />
        ) : (
          <div className="bg-gradient-to-br from-gray-700 to-gray-900 h-full w-full flex justify-center items-center text-white font-medium">
            No Image Found
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 hover:opacity-90 transition-opacity duration-300"></div>
      </div>

      <div className="absolute top-3">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-md rounded-r-full bg-gradient-to-r from-orange-500 to-pink-500 text-white overflow-hidden font-semibold text-sm shadow-lg flex items-center gap-1.5">
            <span className="text-yellow-200">#{index}</span>
            <span>Trending</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-sm text-white p-3 pb-4">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-bold mb-2 hover:text-blue-400 transition-colors duration-300">
          {data?.title || data?.name}
        </h2>
        <div className="text-xs text-gray-300 flex justify-between items-center gap-2">
          <p className="truncate flex-1">
            {moment(data.release_date).format("MMM DD, YYYY")}
          </p>
          <span className="flex items-center gap-1 bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/30">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <p className="text-sm font-semibold text-yellow-200">
              {Number(data.vote_average).toFixed(1)}
            </p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
