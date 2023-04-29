<template>
  <div 
    class="settings"
    :class="{'active__settings': activeSettings}"
    @click="$emit('update', !activeSettings)"
  >
    <div 
      class="settings__body"
      :class="{'active__settings-body': activeSettings}"
      @click.stop
    >
      <div class="settings__body__title">
        <h3 class="settings__body__title-text">
          Настройки
        </h3> 
        <img 
          src="@/assets/icons/settings_icon.svg" 
          alt="settings icon" 
          class="settings__body__title-icon" 
        />
        <div 
          class="settings__body__title-close" 
          @click="$emit('update', !activeSettings)"
        ></div>
      </div>

      <div class="settings__body__item">
        <p class="settings__body__item-text">
          Язык
        </p>
        <my-select 
          :selectItemText="language.nameRu"
          :arr="languages.filter((item) => item.id !== language.id)"
          @update="setLanguage"
          style="width: 180px;"
        />
      </div>

      <div class="settings__body__item">
        <p class="settings__body__item-text">
          Отображать задолжности за
        </p>
        <my-select 
          :selectItemText="debt.nameRu"
          :arr="debtTypes.filter((item) => item.id !== debt.id)"
          @update="setDebt"
          style="width: 180px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languages, debtTypes } from '@/constants'
import {mapState, mapMutations} from 'vuex'

export default {
  props: {
    activeSettings: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      languages: languages,
      debtTypes: debtTypes
    }
  },
  methods: {
    ...mapMutations({
      setLanguage: 'settings/setLanguage',
      setDebt: 'settings/setDebt'
    }),
  },
  computed: {
    ...mapState({
      language: state => state.settings.language,
      debt: state => state.settings.debt
    })
  }
}
</script>

<style lang="scss" scoped>
.settings {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;

  &__body {
    position: absolute;
    background-color: #fff;
    border-right: 2px solid rgb(0, 0, 0, 0.7);
    top: 0;
    left: calc(-35vw - 2px);
    z-index: 11;
    width: 35vw;
    height: 100vh;
    transition: 0.33s;

    display: flex;
    flex-direction: column;

    &__title {
      position: relative;
      display: flex;
      width: 100%;
      height: 10%;

      &-text {
        font-size: 26px;
        font-weight: 500;
        margin: auto 0;
        margin-left: 35px;
      }

      &-icon {
        height: 45px;
        margin: auto 0;
        margin-left: 20px;
      }

      &-close {
        width: 22px;
        height: 22px;
        margin: auto 0;
        margin-left: auto;
        margin-right: 20px;
        background-image: url('@/assets/icons/close.svg');
        background-repeat: no-repeat;
        background-position: center;
        transition: 0.22s;
        cursor: pointer;

        &:hover {
          background-image: url('@/assets/icons/close_orange.svg');
          transition: 0.22s;
        }
      }

      &::after {
        position: absolute;
        content: '';
        top: 100%;
        left: 0;
        width: 80%;
        height: 2px;
        background-color: #E0E0E0;
      }
    }

    &__item {
      display: flex;
      user-select: none;
      width: 100%;
      margin-top: 40px;
      margin-left: 35px;

      &-text {
        font-size: 18px;
        margin: auto 0;
        margin-right: 15px;
      }
    }
  }
}

.active {
  &__settings {
    width: 100vw;
    height: 100vh;
    z-index: 11;
    background-color: rgb(0, 0, 0, 0.7);

    &-body {
      left: 0;
      transition: 0.5s;
    }
  }
}
</style>