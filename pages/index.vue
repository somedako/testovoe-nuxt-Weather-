<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useWeatherStore } from "../store/WeatherStore";
import Weather from "@/components/Weather.vue";

import { onMounted, ref } from "vue";

const weatherStore = useWeatherStore();
const { weather, weatherIn3d, isError, isLoading } = storeToRefs(weatherStore);

const city = ref("Paris");

const handleSubmitWeather = () => {
  weatherStore.getWeather(city.value);
  weatherStore.getWeatherIn3d(city.value);
};

onMounted(() => {
  handleSubmitWeather();
});
</script>

<template>
  <div class="wrapper">
    <input
      class="input"
      v-model="city"
      @keyup.enter="handleSubmitWeather"
      type="text"
    />
    <div v-show="isLoading" class="loader">
      <img src="/loading.svg" alt="loading..." />
    </div>
    <div class="weather__container">
      <Weather v-if="!isError" :weather="weather" :weather3d="weatherIn3d" />
      <div class="error" v-else>{{ weather.message }}</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.weather__container {
  display: flex;
  flex-direction: column;
}

.loader {
  margin-top: 10px;
}

.input {
  padding: 10px 15px;
}

.error {
  margin-top: 10px;
}
</style>
