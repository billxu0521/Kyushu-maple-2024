<script setup>
import { ref } from 'vue';
import { useHead } from "#app";
import { definePageMeta } from "#imports";
import GenericPanel from "~/components/commons/GenericPanel";
import ogBanner from "../assets/images/nuxtwind-daisy-og-banner.jpg";
import pathJson from "../data/path.json";
import hotelsJson from "../data/hotels.json";
import locationJson from "../data/location.json";

// 保正确导入 GoogleMap 组件
import {
  GoogleMap,
  Marker,
  Polyline,
  CustomMarker,
  MarkerCluster,
  AdvancedMarker,
} from "vue3-google-map";

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


// 使用 ref 创建响应式路径对象
const day1PlanPath = ref({
  path: pathJson.day1,
  geodesic: true,
  strokeColor: "#D200D2",
  strokeOpacity: 1.0,
  strokeWeight: 2,
});

const day2PlanPath = ref({
  path: pathJson.day2,
  geodesic: true,
  strokeColor: "#C0392B",
  strokeOpacity: 1.0,
  strokeWeight: 2,
});

const day3PlanPath = ref({
  path: pathJson.day3,
  geodesic: true,
  strokeColor: "#7D6608",
  strokeOpacity: 1.0,
  strokeWeight: 2,
});

const day4PlanPath = ref({
  path: pathJson.day4,
  geodesic: true,
  strokeColor: "#6E2C00",
  strokeOpacity: 1.0,
  strokeWeight: 2,
});

const day5PlanPath = ref({
  path: pathJson.day5,
  geodesic: true,
  strokeColor: "#884EA0",
  strokeOpacity: 1.0,
  strokeWeight: 2,
});

const day6PlanPath = ref({
  path: pathJson.day6,
  geodesic: true,
  strokeColor: "#1E8449",
  strokeOpacity: 1.0,
  strokeWeight: 2,
});

const getInformation = (item) => {
  
  currentItem.value = item;
  console.log(currentItem.value.title);
  console.log(item.title);
  if(currentItem.value.day){
    currentDay.value = item.day;
  }else{
    currentDay.value = 0;
  }
  
};

//九州飯店資料
const hotels = hotelsJson.hotels;
const locations = locationJson.location;

const currentItem = ref(null);
const hotelPinOptions = { background: "#FBBC04" };
const locationPinOptions = { background: "#4285F4" };

const highlightPath = (day) => {
  const paths = {
    day1: day1PlanPath,
    day2: day2PlanPath,
    day3: day3PlanPath,
    day4: day4PlanPath,
    day5: day5PlanPath,
    day6: day6PlanPath
  };

  Object.keys(paths).forEach(key => {
    if (key === day) {
      console.log(paths[key].value);
      paths[key].value.strokeColor = "#FF0000";
      paths[key].value.strokeWeight = 4;
    } else {
      paths[key].value.strokeColor = getOriginalColor(key);
      paths[key].value.strokeWeight = 2;
    }
  });
};

const getOriginalColor = (day) => {
  const colors = {
    day1: "#D200D2",
    day2: "#C0392B",
    day3: "#7D6608",
    day4: "#6E2C00",
    day5: "#884EA0",
    day6: "#1E8449"
  };
  return colors[day];
};

const currentDay = ref(0);


</script>

<template>
  <div>
    <div class="flex flex-col justify-center">
      <GoogleMap
        api-key="AIzaSyCk_EITNYIKsTbVsxVS44--YnrOyUD66MI"
        style="width: 100%; height: 400px"
        :center="center"
        mapId="b28f57e06bac8f91"
        :zoom="8"
        :streetViewControl= "false"
      >
        <MarkerCluster>
          <CustomMarker
            v-for="(hotel, i) in hotels"
            :key="i"
            :options="{ position: hotel.location }"
            @click="getInformation(hotel)"
            :pin-options="hotelPinOptions"
          >
          <div  class="bg-[#FBBC04] rounded-md" style="text-align: center ">
            <i class="text-2xl la la-hotel text-white"></i>
          </div>
        </CustomMarker>
        </MarkerCluster>
        <MarkerCluster>
          <CustomMarker
            v-for="(location, i) in locations"
            :key="i"
            
            :options="{ position: location.location }"
            @click="getInformation(location)"
            :pin-options="locationPinOptions"
          >
          <div v-if="location.type === '觀賞楓葉'" :class="location?.title === currentItem?.title ? 'focus' : ''" class="bg-[#BB5E00] rounded-md" style="text-align: center ">
            <i  class="text-2xl text-white lab la-canadian-maple-leaf"></i>
          </div>  
          <div v-else :class="location?.title === currentItem?.title ? 'focus' : ''" class="bg-[#4285F4] rounded-md" style="text-align: center ">
            <i  class="text-2xl las la-camera text-white"></i>
          </div>  
        </CustomMarker>
        </MarkerCluster>

        <Polyline :options="day1PlanPath" @click="highlightPath('day1')"/>
        <Polyline :options="day2PlanPath" @click="highlightPath('day2')"/>
        <Polyline :options="day3PlanPath" @click="highlightPath('day3')"/>
        <Polyline :options="day4PlanPath" @click="highlightPath('day4')"/>
        <Polyline :options="day5PlanPath" @click="highlightPath('day5')"/>
        <Polyline :options="day6PlanPath" @click="highlightPath('day6')"/>
      </GoogleMap>
    </div>
    <div class="flex justify-center w-full">
      <div class="grow">
        <div class="">
        <ul class="timeline justify-between ">
          <li  class="grow ">
            <div class="timeline-start">Day 1</div>
            <div class="timeline-middle" :class="currentDay == 1 ? 'text-red-600' : ''">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd" />
              </svg>
            </div>
         
            <hr/>
          </li>
          <li class="grow " v-for="(index) in 4" key="index">
            <hr />
            <div class="timeline-start">day {{ index + 1}}</div>
            <div class="timeline-middle" :class="currentDay == index + 1 ? 'text-red-600' : ''">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <hr />
          </li>
         
          <li class="grow ">
            <hr />
            <div class="timeline-start">Day 6</div>
            <div class="timeline-middle"  :class="currentDay == 6 ? 'text-red-600' : ''">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </li>
        </ul>

      </div>

        <div v-if="currentItem" class="card bg-base-100 w-96 shadow-xl m-auto">
         
          <div class="card-body">
            <h2 class="card-title">{{currentItem?.title}}</h2>
            <div class="badge badge-secondary text-white">{{ currentItem.type }}</div>
            <p v-html="currentItem?.detail"></p>
            <div class="card-actions justify-center pt-3" v-if="currentItem?.link">
              <a class="btn btn-primary" :href="currentItem?.link" target="_blank">相關連結</a>
            </div>
            <div class="card-actions justify-center pt-3" v-if="currentItem?.type == '景點' ||currentItem?.type == '觀賞楓葉'">
              <a class="btn btn-primary text-white" :href="`http://google.com/search?q=${currentItem.title}`" target="_blank">查詢這個景點！</a>
            </div>
          </div>
          <figure class="px-10 pb-10">
            <img
              v-if="currentItem?.image"
              :src="currentItem?.image"
              alt=""
              class="rounded-xl" />
          </figure>
        </div>
        <div v-else class="card bg-base-100 w-96 shadow-xl m-auto">
          <div class="card-body w-100">
            <h2 class="card-title">資訊卡</h2>
            <p>點擊地圖標記觀看資訊卡</p>
            
          </div>
          
         
        </div>
        <hr>
        <div class="collapse collapse-arrow bg-base-100 mb-4">
          <input type="checkbox" />
           <div class="collapse-title text-xl font-medium text-center">景點列表</div>
          <div class="collapse-content">

            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr >
                    <th>景點名稱</th>
                    <th>類別</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(location, i) in locations"
                  :key="i">
                  <tr @click="getInformation(location)">
                    <th>{{ location.title }}</th>
                    <th>{{ location.type }}</th>
                  
                  </tr>
                  </template>
                  
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.focus {
  animation: pulse 2s infinite;
  border: 1px solid #000000;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
