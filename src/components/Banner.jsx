import { ChevronLeft, ChevronRight, Eye, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Banner = () => {
  const banner = useSelector((state) => state.movraxData.banner);
  const imageUrl = useSelector((state) => state.movraxData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < banner.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!banner?.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev < banner.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [banner]);

  return (
    <section className="w-full h-full pt-16">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {banner.map((el) => (
          <div
            key={el.id}
            className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-transform duration-500"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <div className="w-full h-full">
              <img
                src={`${imageUrl}${el.backdrop_path}`}
                alt={el.title || "Banner"}
                className="h-full w-full object-cover"
              />
            </div>

            {/* carousel */}
            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
              <button
                onClick={handlePrevious}
                className="bg-white p-2 rounded-full text-3xl z-10 text-black hover:bg-gray-200 transition-colors cursor-pointer"
                disabled={currentImage === 0}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-white p-2 rounded-full text-3xl z-10 text-black hover:bg-gray-200 transition-colors cursor-pointer"
                disabled={currentImage === banner.length - 1}
              >
                <ChevronRight />
              </button>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            <div className="container mx-auto">
              <div className="absolute bottom-0 max-w-md px-3 pb-4">
                <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                  {el?.title || el?.name}
                </h2>
                <p className="text-ellipsis line-clamp-3 my-2 text-neutral-400">
                  {el.overview}
                </p>
                <div className="flex items-center gap-4  text-neutral-400">
                  <span className="flex gap-1 justify-center items-center">
                    <Star size={"20px"} />
                    <p> {Number(el.vote_average).toFixed(1)}+</p>
                  </span>
                  <span>|</span>
                  <span className="flex gap-1 justify-center items-center">
                    <Eye size={"20px"} />
                    <p>{Number(el.popularity).toFixed(0)}</p>
                  </span>
                </div>
                <button className="bg-white px-4 py-2 text-black rounded my-4 hover:bg-gradient-to-l from-blue-500 to-teal-500 shadow-md transition-all cursor-pointer hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
