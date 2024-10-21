<template>
  <div>
    <div class="flex flex-col justify-center">
      <GoogleMap
        api-key="AIzaSyCk_EITNYIKsTbVsxVS44--YnrOyUD66MI"
        style="width: 100%; height: 600px"
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
      <GenericPanel>
        {{ currentItemDetail }}
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
      currentItemDetail.value = item.detail;
    };

    //九州飯店資料
    const hotels = [
      {
        title: "博多WBF格蘭德飯店",
        detail: "第一天(11/24)住宿：福岡市 博多 WBF格蘭德飯店",
        link: "",
        location: { lat: 33.585593875822916, lng: 130.42685632052448 },
      },
      {
        title: "新車站飯店 Premier",
        detail: "第二天(11/25)住宿：諫早市 新車站飯店 Premier",
        link: "",
        location: { lat: 32.84882316005601, lng: 130.04184430088665 },
      },
      {
        title: "Grids Premium Hotel Kumamoto",
        detail: "第三天(11/26)住宿：熊本市 Grids Premium Hotel Kumamoto",
        link: "",
        location: { lat: 32.80473517945612, lng: 130.71581167309125 },
      },
      {
        title: "Hotel Route Inn Hita Ekimae",
        detail: "第四天(11/27)住宿：日田市 Hotel Route Inn Hita Ekimae",
        link: "",
        location: { lat: 33.31704877102474, lng: 130.93886567569893 },
      },
      {
        title: "Hotel Route Inn Hita Ekimae",
        detail: "第五天(11/28)住宿：門司港 普樂美雅酒店",
        link: "",
        location: { lat: 33.94714919912043, lng: 130.9633431445823 },
      },
    ];

    const currentItemDetail = ref(null);
    const hotelPinOptions = { background: "#FBBC04" };

    return {
      center,
      getInformation,
      hotels,
      currentItemDetail,
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

