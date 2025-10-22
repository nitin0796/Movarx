// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Clock, Eye, Star } from "lucide-react";
// import { memo, useMemo } from "react";
// import moment from "moment";
// import Divider from "../components/Divider";
// import useFetchDetails from "../hooks/UseFetchDetails";
// import useFetch from "../hooks/UseFetch";
// import HorizontalScrollCard from "../components/HorizontalScrollCard";

// const DetailsPage = () => {
//   const { explore, id } = useParams();
//   const imageUrl = useSelector((state) => state.movraxData.imageUrl);

//   const { data } = useFetchDetails(`/${explore}/${id}`);
//   const { data: cast } = useFetchDetails(`/${explore}/${id}/credits`);
//   const { data: similarData } = useFetch(`/${explore}/${id}/similar`);
//   const { data: recommendation } = useFetch(
//     `/${explore}/${id}/recommendations`
//   );

//   const duration = useMemo(() => {
//     if (!data?.runtime) return { hours: 0, minutes: 0 };
//     const hours = Math.floor(data.runtime / 60);
//     const minutes = data.runtime % 60;
//     return { hours, minutes };
//   }, [data?.runtime]);

//   const writers = useMemo(() => {
//     if (!cast?.crew) return "N/A";
//     return (
//       cast.crew
//         .filter(
//           (person) =>
//             person?.job === "Writer" || person?.department === "Writing"
//         )
//         .map((person) => person?.name)
//         .join(", ") || "N/A"
//     );
//   }, [cast?.crew]);

//   const director = useMemo(() => {
//     if (!cast?.crew) return "N/A";
//     const directorData = cast.crew.find((person) => person?.job === "Director");
//     return directorData?.name || "N/A";
//   }, [cast?.crew]);

//   const filteredCast = useMemo(() => {
//     if (!cast?.cast) return [];
//     return cast.cast.filter((el) => el?.profile_path).slice(0, 10);
//   }, [cast?.cast]);

//   const title = data?.title || data?.name;
//   const releaseDate = data?.release_date || data?.first_air_date;

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-neutral-400">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="lg:mt-17">
//       {/* Backdrop Image */}
//       {data?.backdrop_path && (
//         <div className="w-full h-[280px] relative hidden lg:block">
//           <div className="w-full h-full">
//             <img
//               src={`${imageUrl}${data.backdrop_path}`}
//               alt={title}
//               className="h-full w-full object-cover"
//               loading="lazy"
//             />
//           </div>
//           <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
//         {/* Poster */}
//         <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
//           {data?.poster_path ? (
//             <img
//               src={`${imageUrl}${data.poster_path}`}
//               alt={title}
//               className="h-80 w-60 object-cover rounded shadow-lg"
//               loading="lazy"
//             />
//           ) : (
//             <div className="h-80 w-60 bg-neutral-800 rounded flex items-center justify-center">
//               <p className="text-neutral-500">No Image</p>
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex-1">
//           <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>
//           {data?.tagline && (
//             <p className="text-neutral-400 italic mt-1">{data.tagline}</p>
//           )}

//           <Divider />

//           {/* Stats */}
//           <div className="flex items-center gap-3 flex-wrap text-sm lg:text-base">
//             {data?.vote_average && (
//               <>
//                 <span className="flex items-center gap-1">
//                   <Star
//                     size={20}
//                     className="text-yellow-500"
//                     fill="currentColor"
//                   />
//                   {Number(data.vote_average).toFixed(1)}
//                 </span>
//                 <span className="text-neutral-600">|</span>
//               </>
//             )}
//             {data?.vote_count && (
//               <>
//                 <span className="flex items-center gap-1">
//                   <Eye size={20} />
//                   {Number(data.vote_count).toLocaleString()}
//                 </span>
//                 <span className="text-neutral-600">|</span>
//               </>
//             )}
//             {data?.runtime && (
//               <span className="flex items-center gap-1">
//                 <Clock size={20} />
//                 {duration.hours}h {duration.minutes}m
//               </span>
//             )}
//           </div>

//           <Divider />

//           {/* Overview */}
//           <div>
//             <h3 className="text-xl font-bold mb-2">Overview</h3>
//             <p className="text-neutral-400 leading-relaxed">
//               {data?.overview || "No overview available."}
//             </p>
//           </div>

//           <Divider />

//           {/* Release Info */}
//           <div className="flex items-center gap-3 flex-wrap text-sm">
//             {data?.status && (
//               <p>
//                 Status: <span className="text-neutral-400">{data.status}</span>
//               </p>
//             )}
//             {data?.status && releaseDate && (
//               <span className="text-neutral-600">|</span>
//             )}
//             {releaseDate && (
//               <p>
//                 Release Date:{" "}
//                 <span className="text-neutral-400">
//                   {moment(releaseDate).format("MMMM Do, YYYY")}
//                 </span>
//               </p>
//             )}
//             {releaseDate && data?.revenue && (
//               <span className="text-neutral-600">|</span>
//             )}
//             {data?.revenue > 0 && (
//               <p>
//                 Revenue:{" "}
//                 <span className="text-neutral-400">
//                   ${Number(data.revenue).toLocaleString()}
//                 </span>
//               </p>
//             )}
//           </div>

//           <Divider />

//           {/* Director and Writers */}
//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="font-semibold">Director:</span>{" "}
//               <span className="text-neutral-400">{director}</span>
//             </p>
//             <p>
//               <span className="font-semibold">Writers:</span>{" "}
//               <span className="text-neutral-400">{writers}</span>
//             </p>
//           </div>

//           <Divider />

//           {/* Cast */}
//           {filteredCast.length > 0 && (
//             <>
//               <h2 className="font-bold text-lg mb-4">Cast</h2>
//               <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-4">
//                 {filteredCast.map((actor) => (
//                   <div key={actor.id} className="text-center">
//                     <img
//                       src={`${imageUrl}${actor.profile_path}`}
//                       alt={actor.name}
//                       className="w-24 h-24 object-cover rounded-full mx-auto shadow-md"
//                       loading="lazy"
//                     />
//                     <p className="font-semibold text-xs mt-2 text-neutral-300 line-clamp-2">
//                       {actor.name}
//                     </p>
//                     {actor.character && (
//                       <p className="text-xs text-neutral-500 line-clamp-1">
//                         {actor.character}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Similar and Recommendations */}
//       <div className="container mx-auto px-3 space-y-6 pb-8">
//         {similarData && similarData.length > 0 && (
//           <HorizontalScrollCard
//             data={similarData}
//             heading={`Similar ${explore === "movie" ? "Movies" : "TV Shows"}`}
//             media_type={explore}
//           />
//         )}

//         {recommendation && recommendation.length > 0 && (
//           <HorizontalScrollCard
//             data={recommendation}
//             heading={`Recommended ${
//               explore === "movie" ? "Movies" : "TV Shows"
//             }`}
//             media_type={explore}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default memo(DetailsPage);
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Clock,
  Eye,
  Star,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { memo, useMemo } from "react";
import moment from "moment";
import useFetchDetails from "../hooks/UseFetchDetails";
import useFetch from "../hooks/UseFetch";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const imageUrl = useSelector((state) => state.movraxData.imageUrl);

  const { data } = useFetchDetails(`/${explore}/${id}`);
  const { data: cast } = useFetchDetails(`/${explore}/${id}/credits`);
  const { data: similarData } = useFetch(`/${explore}/${id}/similar`);
  const { data: recommendation } = useFetch(
    `/${explore}/${id}/recommendations`
  );

  const duration = useMemo(() => {
    if (!data?.runtime) return { hours: 0, minutes: 0 };
    const hours = Math.floor(data.runtime / 60);
    const minutes = data.runtime % 60;
    return { hours, minutes };
  }, [data?.runtime]);

  const writers = useMemo(() => {
    if (!cast?.crew) return "N/A";
    return (
      cast.crew
        .filter(
          (person) =>
            person?.job === "Writer" || person?.department === "Writing"
        )
        .map((person) => person?.name)
        .join(", ") || "N/A"
    );
  }, [cast?.crew]);

  const director = useMemo(() => {
    if (!cast?.crew) return "N/A";
    const directorData = cast.crew.find((person) => person?.job === "Director");
    return directorData?.name || "N/A";
  }, [cast?.crew]);

  const filteredCast = useMemo(() => {
    if (!cast?.cast) return [];
    return cast.cast.filter((el) => el?.profile_path).slice(0, 10);
  }, [cast?.cast]);

  const title = data?.title || data?.name;
  const releaseDate = data?.release_date || data?.first_air_date;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen mt-19">
      {/* Backdrop Image with Gradient Overlay */}
      {data?.backdrop_path && (
        <div className="w-full h-[320px] lg:h-[420px] relative">
          <div className="w-full h-full">
            <img
              src={`${imageUrl}${data.backdrop_path}`}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
          <div className="absolute w-full h-24 bottom-0 bg-gradient-to-t from-white to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:-mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            {data?.poster_path ? (
              <div className="relative group">
                <img
                  src={`${imageUrl}${data.poster_path}`}
                  alt={title}
                  className="h-[420px] w-[280px] object-cover rounded-2xl shadow-2xl shadow-gray-300/50 ring-1 ring-gray-200"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="h-[420px] w-[280px] bg-gray-100 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-gray-200">
                <p className="text-gray-400 font-medium">No Image</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-6">
            {/* Title and Tagline */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              {data?.tagline && (
                <p className="text-lg text-gray-500 italic font-light">
                  "{data.tagline}"
                </p>
              )}
            </div>

            {/* Stats Cards */}
            <div className="flex items-center gap-4 flex-wrap">
              {data?.vote_average && (
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200">
                  <Star
                    size={20}
                    className="text-amber-500"
                    fill="currentColor"
                  />
                  <span className="font-bold text-gray-900">
                    {Number(data.vote_average).toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-sm">/10</span>
                </div>
              )}
              {data?.vote_count && (
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-200">
                  <Eye size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">
                    {Number(data.vote_count).toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">votes</span>
                </div>
              )}
              {data?.runtime && (
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2.5 rounded-xl border border-purple-200">
                  <Clock size={20} className="text-purple-600" />
                  <span className="font-semibold text-gray-900">
                    {duration.hours}h {duration.minutes}m
                  </span>
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {data?.overview || "No overview available."}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Release & Status Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 space-y-3">
                {data?.status && (
                  <div className="flex items-start gap-3">
                    <TrendingUp
                      size={20}
                      className="text-green-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Status
                      </p>
                      <p className="text-gray-700">{data.status}</p>
                    </div>
                  </div>
                )}
                {releaseDate && (
                  <div className="flex items-start gap-3">
                    <Calendar
                      size={20}
                      className="text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Release Date
                      </p>
                      <p className="text-gray-700">
                        {moment(releaseDate).format("MMMM Do, YYYY")}
                      </p>
                    </div>
                  </div>
                )}
                {data?.revenue > 0 && (
                  <div className="flex items-start gap-3">
                    <DollarSign
                      size={20}
                      className="text-emerald-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Revenue
                      </p>
                      <p className="text-gray-700">
                        ${Number(data.revenue).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Credits Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Director
                  </p>
                  <p className="text-gray-700 font-medium">{director}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Writers
                  </p>
                  <p className="text-gray-700 line-clamp-2">{writers}</p>
                </div>
              </div>
            </div>

            {/* Cast Section */}
            {filteredCast.length > 0 && (
              <div className="pt-4">
                <h2 className="font-bold text-2xl text-gray-900 mb-5">
                  Top Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredCast.map((actor) => (
                    <div key={actor.id} className="group cursor-pointer">
                      <div className="relative mb-3">
                        <img
                          src={`${imageUrl}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full aspect-square object-cover rounded-2xl shadow-lg shadow-gray-200 ring-1 ring-gray-200 group-hover:shadow-xl group-hover:shadow-gray-300 transition-all duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <p className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {actor.name}
                      </p>
                      {actor.character && (
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {actor.character}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar and Recommendations */}
      <div className="container mx-auto px-4 lg:px-8 space-y-8 pb-16 pt-8">
        {similarData && similarData.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>
            <HorizontalScrollCard
              data={similarData}
              heading={`Similar ${explore === "movie" ? "Movies" : "TV Shows"}`}
              media_type={explore}
            />
          </div>
        )}

        {recommendation && recommendation.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>
            <HorizontalScrollCard
              data={recommendation}
              heading="You May Also Like"
              media_type={explore}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DetailsPage);
