<template>
  <the-header 
    v-if="$route.fullPath !== '/'"
    :activeSettings="activeSettings"
    @update="changeSettingsHandler"
  />
  <the-settings 
    v-if="$route.fullPath !== '/'"
    :activeSettings="activeSettings"
    @update="changeSettingsHandler"
  />
  <div class="app">
		<router-view />
	</div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue"
import TheSettings from "./components/TheSettings.vue";

export default {
  components: {
    TheHeader, TheSettings
  },
  data() {
    return {
      activeSettings: false,
    }
  },
  methods: {
    changeSettingsHandler(bool) {
      this.activeSettings = bool;
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/animations.scss';

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
  font-family: 'Ubuntu', sans-serif;
}

button {
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

h1, h2, h3, h4, h5, h6 {
  font: inherit;
}

a {
  font: inherit;
  text-decoration: none;
}

input, textarea {
  border: none;
  outline: none;
  font: inherit;
}

.item_box {
  border-radius: 10px;
  border: 2px solid #FF7415;
  background-color: #F3F3F3;
}
</style>
