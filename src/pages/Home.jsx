import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/UseFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movraxData.banner);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: upComingMovie } = useFetch("/movie/upcoming");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: onTheAirShowData } = useFetch("/tv/on_the_air");

  return (
    <div>
      <Banner />

      <div className="px-3">
        <HorizontalScrollCard
          data={trendingData}
          heading={"Trending"}
          trending={true}
        />

        <HorizontalScrollCard
          data={nowPlayingData}
          heading={"Now Playing"}
          media_type={"movie"}
        />

        <HorizontalScrollCard
          data={upComingMovie}
          heading={"Upcoming Movies"}
          media_type={"movie"}
        />

        <HorizontalScrollCard
          data={popularTvShowData}
          heading={"Popular TV Series"}
          media_type={"tv"}
        />

        <HorizontalScrollCard
          data={onTheAirShowData}
          heading={"On Air"}
          media_type={"tv"}
        />
      </div>
    </div>
  );
};

export default Home;
