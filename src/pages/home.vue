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

// 确保正确导入 GoogleMap 组件
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
    AdvancedMarker
  },
  setup() {
    definePageMeta({
      layout: "default",
    });

    useHead({
      title: "Nuxtwind Daisy 🟢💨🌼",
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

    //路線圖
    const day1PlanPoint = [
      { lat: 33.58696211652374, lng: 130.453078254138 },
      { lat: 33.564263456636844, lng: 130.46260275666194 },
      { lat: 33.467387382133474, lng: 130.54594242420583},
      { lat: 33.4257333987401, lng: 130.6525022854957},
      { lat: 33.46537678202498, lng: 130.69586528563653 }, //秋月
      { lat: 33.4257333987401, lng: 130.6525022854957},
      { lat: 33.467387382133474, lng: 130.54594242420583},
      { lat: 33.564263456636844, lng: 130.46260275666194 },
      { lat: 33.585593875822916, lng: 130.42685632052448 }
    ];
    const day1PlanPath = {
      path: day1PlanPoint,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    const day2PlanPoint = [
    
      { lat: 33.585593875822916, lng: 130.42685632052448 }, //飯店
      { lat: 33.574096615046976, lng: 130.26103895271322 },
      { lat: 33.539162904591514, lng: 130.19828331393444 },
      { lat: 33.48944211328074, lng: 130.06792630314618 },
      { lat: 33.447356375940686, lng: 130.04922020099465 },

      { lat: 33.44476799333162 , lng: 129.99305628768926 },//鏡山
      { lat: 33.404720959572906, lng: 129.97545999215032 },
      { lat: 33.35363377013039, lng: 130.00533226617927 },
      { lat: 33.3128345718404, lng: 130.06834649880918},

      { lat: 33.310307047875, lng: 130.07227472789086}, //休息站 嚴木
      { lat: 33.34866654003284, lng: 130.0768097447885}, //環境藝術之森
      { lat: 33.310307047875, lng: 130.07227472789086}, //休息站 嚴木
      { lat: 33.28940791758127, lng: 130.09334688743755},
      { lat: 33.26815833730932, lng: 130.0906754340945},
      { lat: 33.20879356186168, lng: 130.04710212626023},
      { lat: 33.18153464034397, lng: 130.0172002360942 },//御船山樂園
      { lat: 33.13317859627453, lng: 129.9885973789881 },
      { lat: 33.09319898519443, lng: 129.97705766535907 },
      { lat: 33.036426147954636, lng: 129.92136618277402 },
      { lat: 33.01485725533513, lng: 129.94528915095447 },
      { lat: 32.889315981048476, lng: 129.98788741915942 },
      { lat: 32.88047553729258, lng: 130.0192139443904 },
      
      { lat: 32.84882316005601, lng: 130.04184430088665 }, //諫早市 新車站飯店 Premier

    ];
    const day2PlanPath = {
      path: day2PlanPoint,
      geodesic: true,
      strokeColor: "#019858",
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
        location: { lat: 32.820126139846025, lng: 130.7595361458797 },
      },
      {
        title: "Hotel Route Inn Hita Ekimae",
        detail: "第四天(11/27)住宿：日田市 Hotel Route Inn Hita Ekimae",
        link: "",
        location: { lat: 33.3227458121253, lng: 130.94090493896823 },
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
      day2PlanPath
    };
  },
};
</script>

<style scoped>
</style>
