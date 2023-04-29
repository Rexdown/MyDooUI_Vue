<template>
  <div
    class="task item_box"
    :class="{'complete-task': item.complete}"
    @contextmenu.prevent="$emit('rightClick', $event, item)"
  >
    <p className="task-text">{{ item.text }}</p>
    <div className="task-info">
      <img :src="typeIcon" alt="icon" />
      <img 
        v-show="item.important"
        src='@/assets/icons/fire_orange.svg'
        alt="fire" 
        className="task-info-important"
        @click="$emit('changeImportant', item)"
      />
      <img 
        v-show="!item.important"
        src='@/assets/icons/fire_grey.svg'
        alt="fire" 
        className="task-info-important"
        @click="$emit('changeImportant', item)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    typeIcon: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  width: calc(90% + 15px);
  min-height: 20px;
  margin-right: 25px;
  margin-top: 15px;
  padding: 2px 0;

  &-text {
    width: 85%;
    margin: auto 0;
    margin-left: 15px;
    padding: 7px 0;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }

  &-info {
    display: flex;
    justify-content: space-around;
    height: inherit;
    width: 15%;

    & img {
      margin: auto 0;
    }

    &-important {
      cursor: pointer;
    }
  }
}
</style>