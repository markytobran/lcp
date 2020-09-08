<template>
  <div id="result">
    <logo></logo>
    <div>
      <div class="summary">
        <!--Summary card-->
        <div class="cards__container">
          <div class="card cardsum">
            <h3>Summary</h3>
            <ul>
              <li>
                <small>Full Name:</small>
                <small>{{ getFirstName }} {{ getLastName }}</small>
              </li>
              <li>
                <small>Loan amount:</small>
                <small>£ {{ getAmount }}</small>
              </li>
              <li>
                <small>Repayment period:</small>
                <small>{{ getPeriod }} months</small>
              </li>
            </ul>
          </div>
          <!--Contact us card-->
          <div class="card cardcon">
            <h3>Contact us</h3>
            <div class="contact__email">
              <div class="contact__email--div">
                <i class="fas fa-envelope-open-text"></i>
              </div>
              <p>
                <a href="mailto:hello@ezloans.co.uk">hello@ezloans.co.uk</a>
              </p>
            </div>
            <div class="contact__mobile">
              <div class="contact__mobile--div">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <a href="tel:020 7123 1234">020 7123 1234</a>
            </div>
          </div>
        </div>
        <!--Circles-->
        <div class="circle__container">
          <div class="payable">
            <vue-circle
              class="circle"
              :progress="100"
              :size="110"
              :reverse="false"
              line-cap="round"
              :fill="fill"
              empty-fill="rgba(0, 0, 0, .3)"
              :animation-start-value="0.0"
              :start-angle="60"
              insert-mode="append"
              :thickness="5"
              :show-percent="false"
              @vue-circle-progress="progress"
              @vue-circle-end="progress_end"
            >
              <p>£ {{ getAmount * 1.25}}</p>
            </vue-circle>
            <p class="circle__info">Total amount payable</p>
          </div>
          <div class="repayment">
            <vue-circle
              class="circle"
              :progress="100"
              :size="110"
              :reverse="false"
              line-cap="round"
              :fill="fill"
              empty-fill="rgba(0, 0, 0, .3)"
              :animation-start-value="0.0"
              :start-angle="60"
              insert-mode="append"
              :thickness="5"
              :show-percent="false"
              @vue-circle-progress="progress"
              @vue-circle-end="progress_end"
            >
              <p>£ {{ Math.round(getAmount * 1.25 / getPeriod)}}</p>
            </vue-circle>
            <p class="circle__info">Monthly repayment</p>
          </div>
        </div>
        <!--Final card-->
        <div class="finalCard">
          <div class="bubble">
            <div class="bubble__side bubble__side--front">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1521897258701-21e2a01f5e8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt="dirty computer"
                />
                <figcaption>Final Summary</figcaption>
              </figure>
              <div class="bubble__side--details">
                <ul>
                  <li>
                    <i class="fas fa-check"></i>
                    <p>
                      Full Name:
                      <strong>{{ getFirstName }} {{ getLastName }}</strong>
                    </p>
                  </li>
                  <li>
                    <i class="fas fa-check"></i>
                    <p>
                      Loan amount:
                      <strong>£ {{ getAmount }}</strong>
                    </p>
                  </li>
                  <li>
                    <i class="fas fa-check"></i>
                    <p>
                      Repayment period:
                      <strong>{{ getPeriod }} months</strong>
                    </p>
                  </li>
                  <li>
                    <i class="fas fa-check"></i>
                    <p>
                      Total amount payable:
                      <strong>£ {{ getAmount * 1.25}}</strong>
                    </p>
                  </li>
                  <li>
                    <i class="fas fa-check"></i>
                    <p>
                      Monthly repayment:
                      <strong>£ {{ Math.round(getAmount * 1.25 / getPeriod)}}</strong>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bubble__side bubble__side--back">
              <small>Why choose us ?</small>
              <button>Learn More</button>
            </div>
          </div>
          <!--Condition-->
          <div class="condition">
            <p>
              I confirm that I have read and understood the
              terms & conditions.
            </p>
            <div class="pretty p-svg p-curve">
              <input type="checkbox" />
              <div class="state p-primary">
                <!-- svg path -->
                <svg class="svg svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                    style="stroke: white;fill:white;"
                  />
                </svg>
                <label>I agree</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="btnBack" @click="back()">
            <i class="fas fa-arrow-left"></i>Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "./logo";
import VueCircle from "vue2-circle-progress";
export default {
  name: "Result",
  data() {
    return {
      fill: { gradient: ["#ffb7c5", "#fff"] },
    };
  },
  components: {
    logo,
    VueCircle,
  },
  computed: {
    getFirstName() {
      return this.$store.state.firstName;
    },
    getLastName() {
      return this.$store.state.lastName;
    },
    getAmount() {
      return this.$store.state.loanAmount;
    },
    getPeriod() {
      return this.$store.state.repaymentPeriod;
    },
  },
  methods: {
    progress(event, progress, stepValue) {
      return stepValue;
    },
    progress_end(event) {
      return event;
    },
    setAnimation(t, o) {
      document.querySelector(".cardsum").style.transform = `translateX(${t}%)`;
      document.querySelector(".cardcon").style.transform = `translateX(${t}%)`;
      document.querySelector(".bubble").style.transform = `translateX(${t}%)`;
      document.querySelector(
        ".condition"
      ).style.transform = `translateX(${t}%)`;
      document.querySelector(".repayment").style.opacity = o;
      document.querySelector(".payable").style.opacity = o;
    },
    back() {
      this.$store.commit("toggleLoan");
      this.$store.commit("toggleResult");
    },
  },
  mounted() {
    this.setAnimation("0", "1");
  },
};
</script>

<style lang="scss" scoped>
@import "~pretty-checkbox/src/pretty-checkbox.scss";
$primary-color: #ffb7c5;
$black: #000;
$grey: #838383;
$white: #fff;

/********Heading ********/
h3 {
  font-size: 2.5rem;
  letter-spacing: 1rem;
  font-weight: 400;
  margin-bottom: 1.3rem;
  width: 100%;
  text-shadow: 1px 1px 3px ($black, 0.8);
}

/********Card elements ********/
.cards__container {
  display: flex;
  justify-content: space-between;
}

.cardsum {
  transform: translateX(-120%);
}

.cardcon {
  transform: translateX(120%);
}

/********Card ********/

.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  border: 3px solid $primary-color;
  width: 40rem;
  margin: 0 3rem;
  border-top-right-radius: 70%;
  border-bottom-left-radius: 20%;
  padding: 2rem;
  box-shadow: 3rem 2rem 1rem (rgba($black, 0.8));
  cursor: pointer;
  transition: all 1s ease-in;

  & ul {
    list-style: none;

    & li {
      display: flex;
      margin-top: 2rem;

      & small:nth-child(1) {
        font-weight: 900;
        font-size: 1.5rem;
      }
      & small:nth-child(2) {
        margin-left: 1rem;
        font-weight: 400;
        font-size: 1.5rem;
      }
    }
  }
}

/********Contact ********/
.contact__email,
.contact__mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
  height: 5rem;
  z-index: 1;
  cursor: pointer;

  &:hover &--div::after {
    width: 140%;
    height: 140%;
  }

  & div {
    background-color: $primary-color;
    height: 100%;
    width: 5rem;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;

    &::after {
      content: "";
      background-color: $primary-color;
      opacity: 0.6;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      transition: all 0.5s ease-in;
      z-index: -1;
    }
  }
  & i {
    font-size: 2rem;
    position: absolute;
  }
  & a {
    text-decoration: none;
    font-size: 2rem;
    color: $grey;
  }
}
.circle__container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 50%;

    & p {
      font-size: 2rem;
      font-weight: 900;
    }
  }
}

.repayment {
  opacity: 0;
  transition: all 2s ease-in;
}

.payable {
  opacity: 0;
  transition: all 2s ease-in;
}
.circle {
  margin-top: 6rem;
  margin-left: 7rem;

  &__info {
    margin-left: 6rem;
    margin-top: 2rem;
    font-weight: 900;
  }
}
/********Final card ********/
.finalCard {
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
}

/********Bubble div********/
.bubble {
  perspective: 150rem;
  z-index: 1000;
  cursor: pointer;
  position: relative;
  height: 55rem;
  width: 30rem;
  margin-left: 3rem;
  transform: translateX(-120%);
  transition: all 2.5s ease-in;

  &__side {
    height: 55rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backface-visibility: hidden;
    transition: all 2s ease;
    box-shadow: 0 1.5rem 4rem rgba(#000, 0.15);

    &--front {
      background-color: $white;

      & figure {
        height: 50%;
        position: relative;
        clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);

        &::after {
          content: "";
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      & figure img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      & figcaption {
        position: absolute;
        bottom: 4rem;
        right: 2rem;
        color: $white;
        z-index: 1000;
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 900;
        background-color: $primary-color;
        padding: 0.5rem 1rem;
        box-shadow: 1rem 1rem 1rem (rgba(0, 0, 0, 0.8));
        text-shadow: 0.3rem 0.3rem 1rem (rgba(0, 0, 0, 0.8));
      }
    }

    &--back {
      background: linear-gradient(grey 5%, black 95%);
      transform: rotateY(180deg);
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
      width: 100%;
      flex-direction: column;
      color: $white;

      & small {
        font-size: 3rem;
        font-weight: 900;
      }

      & button {
        background: $primary-color;
        width: 18rem;
        padding: 1rem 2.5rem;
        border-radius: 100px;
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: 900;
        transition: all 0.5s;
        text-decoration: none;
        color: $white;
        border: none;
        outline: none;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0.4rem 0.4rem 0.7rem (rgba($white, 0.6));
        }
      }
    }
    &--details {
      background: linear-gradient(grey 5%, black 95%);
      height: 55%;
      margin-top: -2.5rem;

      & ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        padding-top: 4.5rem;
      }

      & i {
        color: $primary-color;
        margin-right: 5px;
        margin-top: 2px;
      }

      & li {
        color: $white;
        font-size: 1.5rem;
        font-weight: 500;
        display: flex;
        line-height: 2rem;
        margin-bottom: 2.2rem;
      }
    }
  }

  &:hover &__side--front {
    transform: rotateY(180deg);
  }
  &:hover &__side--back {
    transform: rotateY(0);
  }
}

/********Condition********/
.condition {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 2rem;
  width: 40%;
  transform: translateX(120%);
  transition: all 2.5s ease-in;

  p {
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 3px;
  }
}

/********BACK Button********/
.btnBack {
  margin-top: 6rem;
  margin-left: 2rem;
  color: $white;
  background-color: $primary-color;
  padding: 1rem 2rem;
  outline: none;
  border: none;
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  margin-bottom: 1rem;
  font-weight: 900;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0.4rem 0.4rem 0.7rem (rgba($white, 0.6));
  }
  & i {
    margin-right: 8px;
    animation: left 1s infinite;
  }
}

/********Animation ********/

@keyframes left {
  0% {
    tranform: translateX(0);
  }
  33% {
    tranform: translateX(-5px);
  }
  66% {
    transform: translateX(-7px);
  }
  100% {
    transform: translateX(0);
  }
}
</style> 
