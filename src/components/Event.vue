<template>
  <div
    class="event"
    >
    <h3
      class="event__title"
      v-if="event.title"
    >{{ event.title }}
    </h3>
    <span
      class="event__participants"
      v-for="participants in event.part"
      :key="participants.id"
    >{{ participants.name }} {{ participants.surname }}
    </span>
  </div>
</template>


<script>
export default {
  name: 'Event',
  props: [
    'event',
  ],
};
</script>
