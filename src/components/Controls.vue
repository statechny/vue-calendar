<template>
  <section class="controls">
    <div
      role="button"
      class="controls__controller controls__controller--prev"
      @click="prev"
    ></div>
    <span
      class="controls__desc"
    > {{ month }}  {{ year }} </span>
    <div
      role="button"
      class="controls__controller controls__controller--next"
      @click="next"
    ></div>
    <div
      role="button"
      class="controls__controller controls__controller--current"
      @click="today"
    >today</div>
  </section>
</template>

<script>
export default {
  name: 'Month',
  props: [
    'month', 'year',
  ],
  methods: {
    prev() {
      this.$emit('changeMonth', -1);
    },
    next() {
      this.$emit('changeMonth', 1);
    },
    today() {
      this.$emit('changeToCurrentDay');
    },
  },
};
</script>
