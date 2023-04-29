<template>
  <div class="mainPage">
    <div class="mainPage__body">
      <main-calendar />
      <task-list />
    </div>
  </div>
</template>

<script>
import MainCalendar from '@/components/MainCalendar.vue';
import TaskList from '@/components/TaskList/TaskList.vue';

export default {
  components: {
    MainCalendar, TaskList
  }
}
</script>

<style lang="scss" scoped>
.mainPage {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 125px);

  &__body {
    display: flex;
    justify-content: space-between;
    width: 100vw;

    &__tasklist {
      width: 45%;
    }
  }
}

.activeDay {
  background-color: #FF7415;

  & p {
    color: #fff;
  }
}
</style>