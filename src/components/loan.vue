<template>
  <div id="test">
    <div class="container">
      <!---LOGO-->
      <logo></logo>
      <!---FORM-->
      <form action="#" class="form" v-on:submit.prevent="goToResults()">
        <!---FORM-->
        <div class="name">
          <input
            id="firstname"
            type="text"
            v-model="loanApp.firstName"
            placeholder="First name"
            maxlength="50"
          />
          <div @click="deleteFirst()">
            <span>x</span>
          </div>
          <label class="name__effect" for="firstname">First name</label>
        </div>
        <!---SECOND INPUT-->
        <div class="name">
          <input
            type="text"
            v-model="loanApp.lastName"
            id="lastname"
            placeholder="Last name"
            maxlength="50"
          />
          <div @click="deleteLast()">
            <span>x</span>
          </div>
          <label class="name__effect" for="lastname">Last name</label>
        </div>
        <!---LOAN AMOUNT-->
        <div class="loan__amount">
          <div class="loan__amount-container">
            <label for="loanamount">Loan Amount</label>
            <p>I would like to borrow</p>
            <div>
              <input
                type="number"
                id="loanamount"
                v-model="loanAmount"
                min="0"
                max="2500"
                @input="amountChecker"
              />
              <span>&#163;</span>
            </div>
          </div>
          <v-slider v-model="loanAmount" :min="0" :max="2500" :interval="100"></v-slider>
          <div class="slider__amount">
            <small>£0</small>
            <small>£{{ maxAmount }}</small>
          </div>
        </div>
        <!---LOAN PERIOD-->
        <div class="loan__period">
          <div class="loan__amount-container">
            <label for="period">Repayment Period</label>
            <p>I would like to repay it over</p>
            <div>
              <input
                type="number"
                id="period"
                v-model="loanPeriod"
                :min="6"
                :max="36"
                @input="periodChecker"
                maxlength="2"
              />
            </div>
          </div>
          <v-slider v-model="loanPeriod" :min="6" :max="36" :interval="6" />
          <div class="slider__amount">
            <small>6 months</small>
            <small>{{ maxMonth }} months</small>
          </div>
        </div>
        <div class="btn__div">
          <input type="submit" id="submit" value="submit" />
        </div>
      </form>
      <!---BACK BUTTON-->
      <button @click="backToBrief()" class="btn btn-primary">Back to intro & brief</button>
    </div>
  </div>
</template>
<script>
import vSlider from "vue-slider-component";
import logo from "./logo.vue";

export default {
  name: "Loan",
  data() {
    return {
      loanApp: {
        firstName:
          JSON.parse(localStorage.getItem("firstname")) === null
            ? ""
            : JSON.parse(localStorage.getItem("firstname")),
        lastName:
          JSON.parse(localStorage.getItem("lastname")) === null
            ? ""
            : JSON.parse(localStorage.getItem("lastname")),
      },
      loanAmount: 0,
      loanPeriod: 6,
      maxAmount: 2500,
      maxMonth: 36,
    };
  },
  components: {
    vSlider,
    logo,
  },
  methods: {
    backToBrief() {
      this.$store.commit("toggleIntro");
    },
    goToResults() {
      if (
        this.loanApp.firstName.length < 3 ||
        this.loanApp.lastName.length < 3
      ) {
        this.$toasted.show("Please enter minimum 3 characters", {
          duration: 3000,
          type: "error",
          icon: "exclamation-circle",
        });
        this.callFocus();
      } else if (this.loanAmount === 0 || this.loanAmount > this.maxAmount) {
        this.$toasted.show(
          `Please check loan amount, because it should be between £0 - £${this.maxAmount}`,
          {
            duration: 3000,
            type: "error",
            icon: "exclamation-circle",
          }
        );
        this.callFocus();
      } else if (this.loanPeriod > 36 && this.loanPeriod > 5) {
        this.$toasted.show(
          `Please check loan period, because it should be between ${this.loanPeriod} months - ${this.maxMonth} months`,
          {
            duration: 3000,
            type: "error",
            icon: "exclamation-circle",
          }
        );
        this.callFocus();
      } else {
        this.$store.commit("toggleLoan");
        this.$store.commit("toggleResult");
        this.storage();
        this.change();
      }
    },
    callFocus() {
      const firstNameField = document.querySelector("#firstname");
      const lastNameField = document.querySelector("#lastname");
      const loanA = document.querySelector("#period");
      const period = document.querySelector("#loanamount");

      if (firstNameField.value === "" || this.loanApp.firstName.length < 3) {
        firstNameField.focus();
      } else if (
        lastNameField.value === "" ||
        this.loanApp.lastName.length < 3
      ) {
        lastNameField.focus();
      } else if (loanA.value === 0 || loanA.value === null) {
        loanA.focus();
      } else if (period.value === 0 || period.value === null) {
        period.focus();
      }
    },
    storage() {
      localStorage.setItem(
        "firstname",
        JSON.stringify(this.loanApp.firstName.trim())
      );
      localStorage.setItem(
        "lastname",
        JSON.stringify(this.loanApp.lastName.trim())
      );
    },
    setFirstName() {
      const inputField = document.querySelector("#firstname");
      if (JSON.parse(localStorage.getItem("firstname")) === null) {
        inputField.value = "";
      } else {
        inputField.value = JSON.parse(localStorage.getItem("firstname"));
      }
    },
    setLastName() {
      const inputField = document.querySelector("#lastname");
      if (JSON.parse(localStorage.getItem("lastname")) === null) {
        inputField.value = "";
      } else {
        inputField.value = JSON.parse(localStorage.getItem("lastname"));
      }
    },
    deleteFirst() {
      const inputField = document.querySelector("#firstname");
      inputField.value = "";
    },
    deleteLast() {
      const inputField = document.querySelector("#lastname");
      inputField.value = "";
    },
    change() {
      this.$store.commit("changeFname", this.loanApp.firstName);
      this.$store.commit("changeLname", this.loanApp.lastName);
      this.$store.commit("changeAmount", this.loanAmount);
      this.$store.commit("changePeriod", this.loanPeriod);
    },
    amountChecker() {
      if (this.loanAmount > this.maxAmount) {
        this.loanAmount = 2500;
      }
    },
    periodChecker() {
      if (this.loanPeriod > this.maxMonth) {
        this.loanPeriod = 36;
      } else if (this.loanPeriod < 6) {
        this.loanPeriod = 6;
      }
    },
  },
  mounted() {
    this.setFirstName();
    this.setLastName();
  },
};
</script>
<style lang="scss" scoped>
$pink: #ffb7c5;
$white: #fff;
$grey: #838383;

/***********TITLE **********/
.title {
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;

  & span {
    color: $pink;
  }

  & hr {
    background: linear-gradient(135deg, $pink 60%, #999);
    width: 10rem;
    height: 8px;
  }
}

/***********NAME **********/
.name {
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  position: relative;

  & label {
    font-size: 1.3rem;
    font-weight: 900;
    margin-top: 1rem;
    margin-left: 3px;
    display: block;
    color: rgba($white, 0.95);
    opacity: 1;
    transition: all 0.3s ease-in-out;
    text-transform: uppercase;
  }

  & div {
    position: absolute;
    font-size: 2rem;
    top: 0;
    right: 0;
    background-color: $pink;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 1;
    cursor: pointer;
  }

  & input {
    width: 100%;
    height: 3.2rem;
    font-family: inherit;
    font-weight: bolder;
    font-size: 1.5rem;
    border-radius: 2px;
    padding: 0.5rem 2rem;
    background-color: rgba($white, 0.2);
    border: none;
    border-bottom: 3px solid transparent;
    box-shadow: 0 2rem 3rem rgba(#000, 0.6);
    display: block;
    padding: 0 10px;
    color: $white;

    &:focus {
      outline: none;
      border-bottom: 3px solid $pink;
    }
    &::placeholder {
      color: rgba($white, 0.7);
    }
  }
  & input:placeholder-shown ~ label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-3rem);
  }

  & input:placeholder-shown ~ div {
    opacity: 0;
  }
}

.slider__amount {
  display: flex;
  justify-content: space-between;
}

/***********LOAN AMOUNT & PERIOD**********/
.loan__amount,
.loan__period {
  width: 100%;
  margin-top: 6rem;
  margin-bottom: 5rem;

  & label {
    font-size: 1.5rem;
    display: block;
    text-transform: uppercase;
    margin-bottom: 3.5rem;
  }

  & small {
    font-size: 1.3rem;
    font-weight: 900;
  }

  &-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & div {
      position: relative;
    }

    & input {
      height: 3rem;
      outline: none;
      box-shadow: 0 0.5rem 1rem rgba(#000, 0.4);
      border: $grey;
      text-indent: 2rem;
      background-color: rgba($white, 0.2);
      color: $white;
    }
    & p {
      font-size: 1.5rem;
      letter-spacing: 2px;
    }
    & span {
      font-size: 2rem;
      position: absolute;
      display: block;
      font-weight: 400;
      top: 0;
      left: 5px;
    }
  }
}

#period,
#loanamount {
  width: 7.5rem;
}

.loan__period {
  margin-bottom: 3rem;
}

#submit {
  margin-top: 3rem;
  margin-bottom: 6rem;
  width: 70%;
  padding: 5px 20px;
  background-color: rgba($pink, 0.8);
  color: $white;
  outline: none;
  border: none;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: bolder;
  box-shadow: 0 2rem 2rem rgba(#000, 0.5);
  animation: shrink 1s infinite linear;

  &:focus {
    box-shadow: 0 1.5rem 1.8rem rgba(#000, 0.5);
  }
}

/********Button styles *****************/

.btn-primary {
  position: absolute;
  bottom: 0rem;
  left: 0.5rem;
}

.btn__div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/********Animation *****************/
@keyframes shrink {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(-7px);
  }
  75% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
