<script setup lang="ts">
defineProps(["weather", "weather3d"]);
</script>
<template>
  <div class="weather" v-if="weather?.weather">
    <h2>Погода сегодня</h2>
    <img
      :src="`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`"
      :alt="weather?.weather[0]?.description"
    />
    <p>{{ weather?.weather[0]?.description }}</p>
    <p>Температура: {{ Math.round(weather?.main?.temp) }} °C</p>
    <p>Влажность: {{ weather?.main?.humidity }}</p>
    <p>Скорость ветра: {{ weather?.wind?.speed }}</p>
  </div>

  <h2>Погода в течении 3 дней</h2>
  <div class="weather__list" v-if="weather3d?.list">
    <div v-for="(item, index) in weather3d?.list" :key="index + 1">
      <img
        :src="`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`"
        :alt="item?.weather[0]?.description"
      />
      <p>{{ item?.weather[0]?.description }}</p>
      <p>Время: {{ item?.dt_txt }}</p>
      <p>Температура: {{ Math.round(item?.main?.temp) }} °C</p>
      <p>Влажность: {{ Math.round(item?.main?.humidity) }}</p>
      <p>Скорость ветра: {{ Math.round(item?.wind?.speed) }} °C</p>
    </div>
  </div>
</template>

<style scoped>
.weather {
  max-width: 200px;
  margin-top: 15px;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s linear;
}

.weather:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
}
.weather__list {
  display: flex;
  max-width: 600px;
  overflow-y: hidden;
  align-items: center;
  gap: 10px;
}

.weather__list div {
  padding: 10px;
  max-width: 200px;
  cursor: pointer;
  transition: box-shadow 0.2s linear;
}

.weather__list div:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
}

@media (max-width: 600px) {
  .weather {
    margin: 15px auto;
  }
  .weather__list {
    max-width: 320px;
  }
}
</style>
