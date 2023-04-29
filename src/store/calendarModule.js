export const calendarModule = {
  state: () => ({
    selectDate: new Date(),
  }),
  mutations: {
    setSelectDate(state, selectDate) {
      state.selectDate = selectDate;
    },
  },
  namespaced: true
}