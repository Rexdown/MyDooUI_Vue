import { createStore } from 'vuex'
import { calendarModule } from "@/store/calendarModule";
import { settingsModule } from "@/store/settingsModule";

export default createStore({
  modules: {
    calendar: calendarModule,
    settings: settingsModule,
  }
})
