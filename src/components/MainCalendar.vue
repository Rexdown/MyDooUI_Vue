<template>
  <div class="calendarConteiner">
    <div class="calendar">
      <div 
        v-for="day in days"
        :key="day.number"
        class="calendar__day"
        :class="{'activeDay': activeDay == day.number}"
        @click="activeDay = day.number"
      >
        <div class="calendar__day__content">
          <p class="calendar__day-number">
            {{ day.number }}
          </p>
          <p class="calendar__day-month">
            {{ day.month }}
          </p>
          <p class="calendar__day-today" v-if="day.today">
            Сегодня
          </p>
        </div>
      </div>
    </div>

    <div class="calendar__actionsWrapper">
      <div class="calendar__actions">
        <div class="calendar__actions__item">
          <div 
            class="calendar__actions__item-text"
            style="width: auto;"
          >
            {{ monthList.filter((item) => item.number === (month < 1 ? 12 : month))[0].nameRu }}
          </div>
          <div 
            class="calendar__actions__item-btn" 
            style="transform: rotate(180deg);"
            @click="chengeMonth(month - 1), chengeYear(month - 1)"
          ></div>
        </div>

        <div class="calendar__actions__info">
          <p class="calendar__actions__info-month">
            {{ monthList.filter((item) => item.number === month + 1)[0].nameRu }}
          </p>
          <p class="calendar__actions__info-year">{{ this.year }}</p>
        </div>

        <div class="calendar__actions__item">
          <div class="calendar__actions__item-btn" 
            @click="chengeMonth(month + 1), chengeYear(month + 1)"
          ></div>
          <div class="calendar__actions__item-text">
            {{ monthList.filter((item) => item.number === (month + 2 > 12 ? 1 : month + 2))[0].nameRu }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MonthList } from '@/constants'
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      days: [],
      activeDay: new Date().getDate(),
      monthList: MonthList,
    }
  },
  methods: {
    ...mapMutations({
      setSelectDate: 'calendar/setSelectDate',
    }),
    chengeMonth(month) {
      const tempMonth = month > 11 ? 0 : month < 0 ? 11 : month;
      
      if (month !== this.selectDate.getMonth()) {
        this.activeDay = 0;
      } else {
        this.activeDay = this.selectDate.getDate();
      }

      this.month = tempMonth;
    },
    chengeYear(month) {
      if (month > 11) {
        this.year = this.year + 1;
      } else if (month < 0) {
        this.year = this.year - 1;
      }
    },
  },
  computed: {
    ...mapState({
      selectDate: state => state.calendar.selectDate,
    }),
    daysInMonth() {
      if (this.month >= 0 && this.month < 12 ) {
        const tempList = [];
        const thisMonth = MonthList.filter((item) => item.number === this.month + 1)[0].nameRu;
        const conut = 33 - new Date(new Date().getFullYear(), this.month, 33).getDate();

        for (let i = 1; i <= conut; i++) {
          tempList.push({
            month: thisMonth,
            number: i,
            today: i === new Date().getDate() && this.month === new Date().getMonth() && 
              this.year === new Date().getFullYear(),
          })
        }

        return tempList;
      }

      return null;
    },
  },
  watch: {
    month() {
      this.days = this.daysInMonth;
    },
    activeDay() {
      if (this.activeDay !== 0) {
        this.setSelectDate(new Date(this.year, this.month, this.activeDay));
      }
    },
  },
  mounted() {
    this.days = this.daysInMonth;
    this.setSelectDate(new Date(this.year, this.month, this.activeDay));
  }
}
</script>

<style lang="scss" scoped>
.calendarConteiner {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.calendar {
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: 30px;
  width: 90%;

  &__day {
    display: flex;
    flex-direction: column;
    z-index: 5;
    width: 13.5%;
    height: 90px;
    cursor: pointer;
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    border: 2px solid #FF7415;
    background-color: #F3F3F3;

    &__content {
      display: flex;
      flex-direction: column;
      margin: auto;
    }

    &-number {
      font-weight: 700;
      font-size: 22px;
      margin: 0 auto;
    }
    &-month {
      font-weight: 500;
      font-size: 17px;
      margin: 0 auto;
    }
    &-today {
      font-weight: 400;
      font-size: 17px;
      margin: 0 auto;
    }
  }

  &__actionsWrapper {
    position: absolute;
    display: flex;
    width: 45vw;
    bottom: 40px;
    left: 0;
  }

  &__actions {
    display: flex;
    margin-left: auto;
    margin-top: 20px;

    &__item {
      display: flex;

      &-text {
        width: 70px;
        font-size: 18px;
        font-weight: 500;
        margin: auto 0;
      }

      &-btn {
        width: 25px;
        height: 30px;
        border: 2px solid #FF7415;
        border-radius: 7px;
        margin: auto 15px;
        cursor: pointer;

        background-image: url('@/assets/icons/Arrow_black.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 80%;
        transition: 0.2s all;

        &:hover {
          background-color: #FF7415;
          background-image: url('@/assets/icons/Arrow_white.svg');
          transition: 0.2s all;
        }
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      width: 70px;

      &-month {
        margin: 0 auto;
      }
      &-year {
        margin: 0 auto;
        font-weight: 500;
      }
    }
  }
}

.activeDay {
  background-color: #FF7415;

  & p {
    color: #fff;
  }
}
</style>