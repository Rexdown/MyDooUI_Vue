<template>
  <div className="header">
    <router-link
      to="/main"
    >
      <img 
        src="@/assets/icons/Logo_2.svg" 
        alt="logo" 
        className='header__logo' 
      />
    </router-link>

    <div className="header__actions">
      <router-link 
        className="header__actions-profile" 
        to="/analytics"
      >
        <img 
          src="@/assets/icons/profile.svg" 
          alt="profile" 
        />
      </router-link>
      <img 
        src="@/assets/icons/settings.svg" 
        alt="settings" 
        className="header__actions-settings" 
        @click="$emit('update', !activeSettings)"
      />
    </div>
  </div>
</template>

<script>
export default {
    props: {
      activeSettings: {
        type: Boolean,
        default: false,
      }
    }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  position: relative;
  margin-bottom: 45px;
  width: 100vw;
  height: 80px;

  &::after {
    position: absolute;
    content: '';
    height: 1px;
    width: 92vw;
    bottom: 0;
    left: 4vw;
    background-color: #e4e4e4;
  }

  &__logo {
    margin: auto 0;
    margin-left: 3vw;
  }

  &__actions {
    margin-right: 4vw;
    display: flex;
    height: 100%;

    &-profile {
      cursor: pointer;
      margin: auto 0;
      margin-right: 20px;
    }

    &-settings {
      transition: 0.33s;
      cursor: pointer;
      margin: auto 0;

      &:hover {
        transform: rotate(45deg);
        transition: 0.33s;
      }
    }
  }
}
</style>