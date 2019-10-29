<template>
  <header
    class="header"
  >
    <div
      class="header__wrapper"
    >
      <div
        class="header__btns"
      >
        <div
          role="button"
          class="header__btn"
        >Add Event
        </div>
        <div
          role="button"
          class="header__btn"
        >Refresh
        </div>
      </div>
        <Search />
    </div>
  </header>
</template>


<script>
import Search from './Search.vue';

export default {
  name: 'Header',
  components: {
    Search,
  },
};
</script>
