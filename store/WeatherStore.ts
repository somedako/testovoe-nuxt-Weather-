import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

const API_KEY = "a3f01e369cbbd9d792772532cf8b8236";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const useWeatherStore = defineStore("weatherStore", () => {
  const weather = ref([]);
  const weatherIn3d = ref([]);
  const isLoading = ref(true);

  const isError = computed(() => weather.value?.cod !== 200);

  const getWeather = async (input: string) => {
    isLoading.value = true;
    try {
      const { data } = await axios.get(
        `${BASE_URL}weather?q=${input}&units=metric&appid=${API_KEY}`
      );
      if (data) {
        return (weather.value = data);
      }
    } catch (error) {
      weather.value = error.response.data;
    } finally {
      isLoading.value = false;
    }
  };

  const getWeatherIn3d = async (city: string) => {
    isLoading.value = true;

    try {
      const { data } = await axios.get(
        `${BASE_URL}forecast?q=${city}, ${weather.value.id}&cnt=25&units=metric&appid=${API_KEY}`
      );
      weatherIn3d.value = data;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    weather,
    getWeather,
    weatherIn3d,
    getWeatherIn3d,
    isError,
    isLoading,
  };
});
