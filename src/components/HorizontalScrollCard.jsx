import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    containerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <div className="">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize mb-2">
          {heading}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
      </div>

      <div className="relative group">
        {/* Fade gradient overlays */}

        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-hide p-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.map((el, index) => (
            <Card
              key={el.id}
              data={el}
              trending={trending}
              index={index + 1}
              media_type={media_type}
            />
          ))}
        </div>

        <div className="absolute top-0 flex justify-between w-full h-full items-center pointer-events-none">
          <button
            onClick={handlePrev}
            className="bg-white border-2 border-gray-200 p-2 lg:p-2.5 text-gray-700 rounded-full -ml-3 lg:-ml-5 z-30 pointer-events-auto shadow-lg hover:shadow-xl hover:scale-110 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            <ChevronLeft
              size={20}
              className="lg:w-6 lg:h-6"
              strokeWidth={2.5}
            />
          </button>

          <button
            onClick={handleNext}
            className="bg-white border-2 border-gray-200 p-2 lg:p-2.5 text-gray-700 rounded-full -mr-3 lg:-mr-5 z-30 pointer-events-auto shadow-lg hover:shadow-xl hover:scale-110 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            <ChevronRight
              size={20}
              className="lg:w-6 lg:h-6"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
