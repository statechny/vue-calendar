<template>
  <div>
    <Header />
    <Controls
      :month = 'monthName'
      :year = 'year'
      @changeMonth='changeMonth'
      @changeToCurrentDay='changeToCurrentDay'
    />
    <div class ="calendar">
      <DayBox
        v-for="singleDay in days"
        :key="singleDay.id"
        :text='{day: singleDay.day, date: singleDay.date}'
        :events='singleDay.events'
        :currentDay='currentDay(singleDay.date)'
      />
    </div>
  </div>
</template>

<script>
import formatDate from '../helpers/formatDate';

import DayBox from './DayBox.vue';
import Controls from './Controls.vue';
import Header from './Header.vue';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DATE = new Date();

export default {
  name: 'Calendar',
  components: {
    DayBox,
    Controls,
    Header,
  },
  data() {
    return {
      date: DATE.getDate(),
      month: DATE.getMonth(),
      year: DATE.getFullYear(),
      events: JSON.parse(localStorage.getItem('events')).events,
    };
  },
  computed: {
    monthName() {
      return MONTH[this.month];
    },
    days() {
      return this.getCurrentDays();
    },
  },
  methods: {
    changeToCurrentDay() {
      this.month = DATE.getMonth();
      this.year = DATE.getFullYear();
      this.date = DATE.getDate();
    },
    changeMonth(value) {
      this.month += value;

      if (this.month < 0) {
        this.month = MONTH.length - 1;
        this.year += value;
      }
      if (this.month === MONTH.length) {
        this.month = 0;
        this.year += value;
      }
    },
    getCurrentDays() {
      const days = [];
      const date = new Date();
      date.setMonth(this.month);
      date.setFullYear(this.year);
      // calculate days of prev months
      date.setDate(1);
      const startDay = !date.getDay() ? 7 : date.getDay();
      const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
      for (let i = 0, l = startDay - 1; i < l; i += 1) {
        const current = new Date(
          lastDayPrevMonth.getFullYear(),
          lastDayPrevMonth.getMonth(),
          lastDayPrevMonth.getDate() - i,
        );

        days.push({
          day: DAYS_OF_WEEK[current.getDay() ? current.getDay() - 1 : 6],
          date: current.getDate(),
          id: +current,
          events:
            this.events.find(event => event.date.split(' ')[0] === formatDate(current)),
        });
      }
      days.reverse();
      // calculate days of current moths
      const currentMonth = date.getMonth();
      while (currentMonth === date.getMonth()) {
        const dayName = DAYS_OF_WEEK[date.getDay() ? date.getDay() - 1 : 6];
        days.push({
          day: (days.length) < 7 ? dayName : '',
          date: date.getDate(),
          id: +date,
          events:
            this.events.find(event => event.date.split(' ')[0] === formatDate(date)),
        });
        date.setDate(date.getDate() + 1);
      }
      // calculate days after last current month day
      while (date.getDay() !== 1) {
        days.push({
          day: '',
          date: date.getDate(),
          id: +date,
          events:
            this.events.find(event => event.date.split(' ')[0] === formatDate(date)),
        });
        date.setDate(date.getDate() + 1);
      }
      return days;
    },
    currentDay(day) {
      return (DATE.getFullYear() === this.year
        && DATE.getMonth() === this.month
        && DATE.getDate() === day);
    },
  },
};
</script>
