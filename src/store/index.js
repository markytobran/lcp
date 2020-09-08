import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    showIntro: true,
    showLoan: false,
    showResult: false,
    firstName: "",
    lastName: "",
    loanAmount: 0,
    repaymentPeriod: 0,
  },
  mutations: {
    toggleIntro(state) {
      state.showIntro = !state.showIntro;
    },
    toggleResult(state) {
      state.showResult = !state.showResult;
    },
    toggleLoan(state) {
      state.showLoan = !state.showLoan;
    },
    changeFname(state, fname) {
      state.firstName = fname;
    },
    changeLname(state, lname) {
      state.lastName = lname;
    },
    changeAmount(state, amount) {
      state.loanAmount = amount;
    },
    changePeriod(state, period) {
      state.repaymentPeriod = period;
    },
  },
});
