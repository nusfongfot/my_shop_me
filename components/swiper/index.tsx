import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { getCate } from "@/api/products";
import { Box, Stack, Typography } from "@mui/material";

export default function MySwiper() {
  const [cate, setCate] = useState<any[]>([]);
  const getCateApi = async () => {
    const res = await getCate();
    const data = res.map((item: any, index: any) => {
      return {
        title: item,
        img: "",
      };
    });
    console.log("data", data);
    // setCate(data);
  };

  useEffect(() => {
    getCateApi();
  }, []);

  return (
    <>
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 5,
          },
          1526: {
            slidesPerView: 6,
          },
        }}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="products__swiper"
      >
        {/* {cate.map((item, i) => (
          <SwiperSlide key={i}>
            <Stack>
              <img
                src={item.img}
                style={{ width: "100%", height: "100%" }}
              />
              <Typography align="center">{item.item}</Typography>
            </Stack>
          </SwiperSlide>
        ))} */}
      </Swiper>
    </>
  );
}
