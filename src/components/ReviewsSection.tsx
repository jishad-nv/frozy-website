import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from 'lucide-react';
import { FROZY_REVIEWS, FROZY_CONFIG } from '../data/frozyData.ts';

export const ReviewsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 3;
  const maxStartIndex = Math.max(0, FROZY_REVIEWS.length - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxStartIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxStartIndex ? prev + 1 : 0));
  };

  // Determine card rotation angles like in the video (-1.5deg, 0deg, 1.5deg)
  const tilts = ['-rotate-1 sm:-rotate-2', 'rotate-0', 'rotate-1 sm:rotate-2'];

  const visibleReviews = FROZY_REVIEWS.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="relative bg-[#FFF8F5] py-16 sm:py-24 px-6 sm:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-700">
            Scoop Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-creamy tracking-tight text-[#4A1525] mt-1">
            {FROZY_CONFIG.reviewsHeadline}
          </h2>
          <p className="text-[#6B2E3F] text-sm sm:text-base mt-2">
            {FROZY_CONFIG.reviewsSubtitle}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
          {visibleReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, rotate: 0 }}
              className={`bg-white rounded-3xl p-7 sm:p-8 shadow-xl border border-pink-100 flex flex-col justify-between transition-all duration-300 transform ${
                tilts[idx % tilts.length]
              }`}
            >
              <div>
                {/* Quotation Icon in Soft Rose (matching pink theme) */}
                <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-5">
                  <Quote className="w-5 h-5 fill-pink-600 text-pink-600" />
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Review Quote */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-pink-50">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{review.author}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-pink-700">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-md hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all border border-pink-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {[...Array(Math.max(1, FROZY_REVIEWS.length - itemsPerPage + 1))].map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  startIndex === i ? 'w-6 bg-pink-700' : 'w-2 bg-pink-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next review"
            className="w-10 h-10 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-md hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all border border-pink-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
