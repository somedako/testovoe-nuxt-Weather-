<script setup>
const props = defineProps({
  modelValue: {
    type: String,
  },

  placeholder: {
    type: String,
    default: "Enter City Name",
  },
});
const emit = defineEmits(["update:modelValue", "eventKey"]);
</script>

<template>
  <input
    class="input"
    :value="modelValue"
    :placeholder="placeholder"
    @input="emit('update:modelValue', $event.target.value)"
    @keyup.enter="emit('eventKey')"
    type="text"
  />
</template>

<style scoped>
.input {
  padding: 10px 15px;
  border-radius: 5px;
}
</style>
