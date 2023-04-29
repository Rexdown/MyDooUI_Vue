<template>
  <div className="select item_box">
    <p 
      v-if="selectItemText"
      :class="{'only_text': !selectItemIcon}"
    >
      {{ selectItemText }}
    </p>
    <img v-if="selectItemIcon" :src="selectItemIcon" alt="icon" />
    <div className="select__options item_box">
      <div 
        v-for="item in arr"
        :key="item.id"
        className="select__options-item"
        @click="$emit('update', item)"
      >
        <p 
          v-if="item.nameRu"
          :class="{'only_text': !item.icon}"
        >
          {{ item.nameRu }}
        </p>
        <img v-if="item.icon" :src="item.icon" alt="icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectItemText: {
      type: String,
      default: '',
    },
    selectItemIcon: {
      type: String,
      default: '',
    },
    arr: {
      type: Array,
      default: () => [],
    }
  },
  name: 'my-select',
}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 32px;
  padding: 0 15px;
  margin: auto 0;

  & p, img {
    margin: auto 0;
  }

  &:hover {
    & div {
      animation: 0.5s showWindow;
      animation-fill-mode: forwards;
    }
  }

  &__options {
    position: absolute;
    left: -2px;
    top: 100%;
    width: 102%;

    opacity: 0;
    z-index: -1;
    pointer-events: none;

    &-item {
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      border-radius: 8px;
      padding: 0 15px;
      height: 32px;

      & p, img {
        margin: auto 0;
      }

      &:hover {
        color: #FF7415;
        background-color: #d3d3d3;
      }
    }
  }
}

.only_text {
  margin: auto !important;
}
</style>