"use client";

import { useGetPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BestViewCard } from "./BestViewCard/BestViewCard";

export function CommunityBestView() {
  const { data } = useGetPosts({ type: "best", limit: 6 });
  if (!data?.data.posts.length) return null;
  return (
    <div className="w-full min-w-0">
      <Swiper
        className="w-full"
        slidesPerView="auto"
        spaceBetween={16}
        breakpoints={{
          768: {
            spaceBetween: 24,
          },
        }}
      >
        {data?.data.posts.map((post) => (
          <SwiperSlide
            key={post.id}
            className="mb-12 md:mb-[54px] lg:mb-[62px] !w-[260px] md:!w-[384px]"
          >
            <BestViewCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
