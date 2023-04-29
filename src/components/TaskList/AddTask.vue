<template>
  <div>
    <div className="add">
      <my-select 
        :selectItemText="selectType.nameRu" 
        :selectItemIcon="selectType.icon"
        :arr="taskTypesArr.filter((item) => item.id !== selectType.id)"
        @update="setSelectType"
        style="width: 180px;"
      />
      <div 
        class="add__important item_box"
        :class="{'add__important-active': important}"
        @click="$emit('updateImportant')"
      >
        <p>
          Отметить как важное
        </p>
        <img v-show="!important" src="@/assets/icons/fire_orange.svg" alt="fire"/>
        <img v-show="important" src='@/assets/icons/fire_white.svg' alt="fire"/>
      </div>
      <button 
        class="add-btn item_box"
        @click="$emit('сancel')"
      >
        Отменить
      </button>
      <button
        class="add-btn item_box"
        @click="$emit('add')"
      >
        Сохранить
      </button>
    </div>
    <input 
      v-focus
      type="text"
      :bind="text"
      @input="$emit('updateText', $event)"
      placeholder='Задача'
      className='add__input'
    />
  </div>
</template>

<script>
export default {
  props: {
    selectType: {
      type: Object,
      default: () => {},
    },
    taskTypesArr: {
      type: Array,
      default: () => [],
    },
    important: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    }
  },
  methods: {
    setSelectType(item) {
      this.$emit('updateSelect', item)
    },
  }
}
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  justify-content: space-between;
  width: calc(90% + 15px);
  margin-bottom: 15px;

  &__important {
    display: flex;
    height: 32px;
    padding: 0 15px;
    margin: auto 0;
    cursor: pointer;

    & p {
      margin: auto 0;
    }

    &-active {
      background-color: #FF7415;

      & p {
        color: white;
      }
    }

    & img {
      margin: auto 0;
      margin-left: 15px;
    }
  }

  &-btn {
    height: 35px;
    padding: 0 10px;
    margin: auto 0;
    transition: 0.33s;

    &:hover {
      color: white;
      transition: 0.33s;
      background-color: #FF7415;
    }
  }

  &__input {
    width: calc(90% + 15px);
    height: 32px;
    border: 2px solid #000000;
    background-color: #F3F3F3;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-right: 25px;
    padding: 6px 0;
    padding-right: 15px;
    padding-left: 15px;

    &:focus {
      border: 2px solid #FF7415;
    }
  }
}
</style>