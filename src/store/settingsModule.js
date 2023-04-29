import { languages, debtTypes } from '@/constants'

export const settingsModule = {
  state: () => ({
    language: languages[0],
    debt: debtTypes[0],
  }),
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setDebt(state, debt) {
      state.debt = debt;
    },
  },
  namespaced: true
}