<template>
  <div
    class="calendar__day"
    :class='color'
    @click="handleClick"
  >
    <h2>
      <span
        class="date"
        v-if="text.day">{{ text.day }},</span>
      <span
        class="date"
      > {{ text.date }} </span>
    </h2>
    <Event
      v-if="events"
      :key="events.id"
      :event="{title: events.title, part: events.participants}"
    />
  </div>
</template>


<script>
import Event from './Event.vue';

export default {
  name: 'DayBox',
  components: {
    Event,
  },
  props: [
    'text', 'currentDay', 'events',
  ],
  computed: {
    color() {
      if (this.currentDay) {
        return 'calendar__day--current';
      }
      if (this.events) {
        return 'calendar__day--event';
      }
      return '';
    },
  },
  methods: {
    handleClick() {
    },
  },
};
</script>
