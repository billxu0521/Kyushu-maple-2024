<template>
  <div>
    <div class="flex flex-col justify-center">
      <GoogleMap
        api-key="AIzaSyCk_EITNYIKsTbVsxVS44--YnrOyUD66MI"
        style="width: 100%; height: 500px"
        :center="center"
        mapId="b28f57e06bac8f91"
        :zoom="8"
      >
        <MarkerCluster>
          <AdvancedMarker
            v-for="(hotel, i) in hotels"
            :key="i"
            :options="{ position: hotel.location }"
            @click="getInformation(hotel)"
            :pin-options="hotelPinOptions"
          />
        </MarkerCluster>

        <Polyline :options="day1PlanPath" />
        <Polyline :options="day2PlanPath" />
        <Polyline :options="day3PlanPath" />
        <Polyline :options="day4PlanPath" />
        <Polyline :options="day5PlanPath" />
        <Polyline :options="day6PlanPath" />
      </GoogleMap>
    </div>
    <div class="flex justify-center">
      <GenericPanel >
        <div v-if="currentItem" class="card bg-base-100 w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{{currentItem?.title}}</h2>
            <p v-html="currentItem?.detail"></p>
            <div class="card-actions justify-center pt-3">
              <a class="btn btn-primary" :href="currentItem?.link" target="_blank">相關連結</a>
            </div>
          </div>
          <figure class="px-10 pb-10">
            <img
              :src="currentItem?.image"
              alt="Shoes"
              class="rounded-xl" />
          </figure>
        </div>
      </GenericPanel>
    </div>
  </div>
</template>

<script >
import { useHead } from "#app";
import { definePageMeta } from "#imports";
import GenericPanel from "~/components/commons/GenericPanel";
import ogBanner from "../assets/images/nuxtwind-daisy-og-banner.jpg";
import pathJson from "../data/path.json";
import hotelsJson from "../data/hotels.json";

// 保正确导入 GoogleMap 组件
import {
  GoogleMap,
  Marker,
  Polyline,
  CustomMarker,
  MarkerCluster,
  AdvancedMarker,
} from "vue3-google-map";

export default {
  components: {
    GenericPanel,
    GoogleMap, // 在组件中注册 GoogleMap
    Marker,
    Polyline,
    CustomMarker,
    MarkerCluster,
    AdvancedMarker,
  },
  setup() {
    definePageMeta({
      layout: "default",
    });

    useHead({
      title: "徐家2024 九州楓葉之旅",
      description:
        "Nuxtwind Daisy is a starter template for Nuxt.js 3 + Tailwind CSS + Daisy UI with additional installed setup for custom font, icons, animation, and more.",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      meta: [
        {
          hid: "og:image",
          name: "og:image",
          property: "og:image",
          content: ogBanner,
        },
      ],
    });
    const center = { lat: 33.59093532676841, lng: 130.3955431693077 };
    console.log(pathJson);
    //路線圖
    const day1PlanPoint = pathJson.day1;
    const day1PlanPath = {
      path: day1PlanPoint,
      geodesic: true,
      strokeColor: "#D200D2", // 深橙色
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const day2PlanPoint = pathJson.day2;
    const day2PlanPath = {
      path: day2PlanPoint,
      geodesic: true,
      strokeColor: "#C0392B", // 深红色
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const day3PlanPoint = pathJson.day3;
    const day3PlanPath = {
      path: day3PlanPoint,
      geodesic: true,
      strokeColor: "#7D6608", // 深黄褐色
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const day4PlanPoint =  pathJson.day4;
    const day4PlanPath = {
      path: day4PlanPoint,
      geodesic: true,
      strokeColor: "#6E2C00", // 深棕色
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const day5PlanPoint = pathJson.day5;

    const day5PlanPath = {
      path: day5PlanPoint,
      geodesic: true,
      strokeColor: "#884EA0", // 深紫色
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const day6PlanPoint = pathJson.day6;

    const day6PlanPath = {
      path: day6PlanPoint,
      geodesic: true,
      strokeColor: "#1E8449", // 深绿色
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const getInformation = (item) => {
      currentItem.value = item;
    };

    //九州飯店資料
    const hotels = hotelsJson.hotels;

    const currentItem= ref(null);
    const hotelPinOptions = { background: "#FBBC04" };

    return {
      center,
      getInformation,
      hotels,
      currentItem,
      hotelPinOptions,
      day1PlanPath,
      day2PlanPath,
      day3PlanPath,
      day4PlanPath,
      day5PlanPath,
      day6PlanPath
    };
  },
};
</script>

<style scoped>
</style>
