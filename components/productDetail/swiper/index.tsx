import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Product } from "@/type/product";

type Props = {
  product: Product | undefined;
};

export default function App({ product }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="products__swiper"
      >
        {product?.image?.split(",").map((item: any, i: any) => (
          <SwiperSlide style={{ height: 300 }} key={i}>
            <img
              src={item}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
