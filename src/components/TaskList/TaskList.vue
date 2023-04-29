<template>
  <div class="taskList">
    <div 
      v-if="activeMenu"
      class="taskList__menu item_box"
      :style="{left: posX + 'px', top: posY - 40  + 'px'}"
    >
      <img 
        src="@/assets/icons/ok.svg" 
        alt="ok"
        @click="isCompleteTask"
      />
      <img 
        src="@/assets/icons/trash.svg"
        alt="trash"
        @click="deleteTask"
      />
    </div>

    <add-task
      v-if="addFlag"
      :selectType="selectType"
      :taskTypesArr="taskTypesArr"
      :important="important"
      :text="text"
      @updateSelect="setSelectType"
      @updateImportant="important = !important"
      @сancel="сancelAddTask"
      @add="addTask"
      @updateText="updateText"
    />
    
    <div v-else class="taskList__actions">
      <button
        class="taskList__actions-flag item_box"
        :class="{'taskList__actions-flag-active': debtFlag}"
        @click="debtFlag = !debtFlag"
      >
        Задолжности
      </button>
      <button
        class="taskList__actions-flag item_box"
        :class="{'taskList__actions-flag-active': sortFlag}"
        @click="sortFlag = !sortFlag"
      >
        Только важные
      </button>

      <div class="taskList__actions__select">
        <p v-if="selectSortType === 'All'">All</p>
        <img 
          v-else
          :src="taskTypesArr.filter((task) => task.type === selectSortType)[0].icon"
          alt="icon" 
        />
        <div class="taskList__actions__select__options">
          <div 
            v-for="item in taskTypesArr.filter((item) => item.type !== selectSortType)"
            :key = "item.id"
            @click="selectSortType = item.type"
          >
            <img :src="item.icon" alt="icon" />
          </div>
          <div v-if="selectSortType !== 'All'" @click="selectSortType = 'All'"> 
            <p>All</p>
          </div>
        </div>
      </div>
      <div 
        class="taskList__actions-add" 
        @click="addFlag = true"  
      ></div>
    </div>
    
    <task-item 
      v-for="item in filterSortTaskList"
      :key="item.id" 
      :item="item"
      :typeIcon="taskTypesArr.filter((taskType) => taskType.type === item.type)[0]?.icon"
      @rightClick="rightClick"
      @changeImportant="changeImportant"
    />

    <div v-if="debtFlag">
      <task-item 
        v-for="item in filterSortTaskListWithDebt"
        :key="item.id"
        class="debt-task"
        :item="item"
        :typeIcon="taskTypesArr.filter((taskType) => taskType.type === item.type)[0]?.icon"
        @rightClick="rightClick"
        @changeImportant="changeImportant"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'
import AddTask from './AddTask.vue'
import {taskTypesArr} from '@/constants'
import {mapState} from 'vuex'

export default {
  components: {
    TaskItem, AddTask
  },
  data() {
    return {
      taskTypesArr: taskTypesArr,
      taskList: [],
      text: '',
      debtFlag: false,
      important: false,
      addFlag: false,
      selectType: taskTypesArr[0],
      sortFlag: false,
      selectSortType: 'All',
      activeMenu: false,
      selectedTask: {},
      posX: 0,
      posY: 0,
    }
  },
  methods: {
    isCompleteTask() {
      const tempArr = []
      this.taskList.forEach((task) => {
        if (task.id === this.selectedTask.id) {
          tempArr.push({
            ...task,
            complete: !task.complete,
          })
        } else {
          tempArr.push({...task})
        }
      })
      this.taskList = tempArr;
    },
    deleteTask() {
      this.taskList = this.taskList.filter((task) => task.id !== this.selectedTask.id);
    },
    сancelAddTask() {
      this.selectType = taskTypesArr[0];
      this.important = false;
      this.addFlag = false;
      this.text = '';
    },
    addTask() {
      if (this.text !== '') {
        const tempArr = [
          {
            id: Math.random().toString(16).slice(2),
            text: this.text,
            date: this.selectDate,
            type: this.selectType.type,
            important: this.important,
            complete: false,
          },
          ...this.taskList
        ]
        this.taskList = tempArr;
        this.selectType = taskTypesArr[0];
        this.important = false;
        this.addFlag = false;
        this.text = '';
      }
    },
    rightClick(e, item) {
      window.addEventListener('click', () => this.activeMenu = false)
      this.selectedTask = item;
      this.activeMenu = true;
      this.posX = e.pageX;
      this.posY = e.pageY;
    },
    changeImportant(item) {
      const tempArr = [];
      this.taskList.forEach((task) => {
        if (task.id === item.id) {
          tempArr.push({
            ...item,
            important: !item.important,
          })
        } else {
          tempArr.push({...task})
        }
      })
      this.taskList = tempArr;
    },
    setSelectType(item) {
      this.selectType = item
    },
    updateText(e) {
      this.text = e.target.value
    }
  },
  computed: {
    ...mapState({
      selectDate: state => state.calendar.selectDate,
      debt: state => state.settings.debt,
    }),
    sortTaskList() {
      if (this.sortFlag && this.selectSortType !== 'All') {
        return this.taskList.filter((task) => task.important && task.type === this.selectSortType);
      } else if (!this.sortFlag && this.selectSortType !== 'All') {
        return this.taskList.filter((task) => task.type === this.selectSortType);
      } else if (this.sortFlag && this.selectSortType === 'All') {
        return this.taskList.filter((task) => task.important);
      } else {
        return this.taskList;
      }
    },
    filterSortTaskList() {
      return this.sortTaskList?.filter((item) => (+item.date === +this.selectDate));
    },
    filterSortTaskListWithDebt() {
      return (
        this.sortTaskList.filter((item) => (
          +item.date < +this.selectDate && !item.complete &&
          +item.date >= +(new Date(this.selectDate.getFullYear(), this.selectDate.getMonth(), 
            this.selectDate.getDate() - this.debt.number))
        ))
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.taskList {
  width: 50vw;
  height: 90%;
  overflow-y: auto;

  &__menu {
    display: flex;
    justify-content: space-around;
    position: absolute;
    z-index: 5;
    width: 70px;
    height: 40px;
    padding: 0 5px;

    & img {
      cursor: pointer;
      margin: auto 0;
    }
  }

  &__actions {
    width: calc(90% + 15px);
    margin-bottom: 25px;
    display: flex;

    &-flag {
      height: 32px;
      padding: 0 15px;
      transition: 0.33s;
      margin: auto 0;
      margin-right: 20px;

      &:hover {
        background-color: #FF7415;
        transition: 0.33s;
        color: white;
      }

      &-active {
        background-color: #FF7415;
        color: white;
      }
    }

    &__select {
      display: flex;
      position: relative;
      width: 32px;
      height: 32px;
      margin: auto 0;
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #FF7415;
      background-color: #F3F3F3;

      &:hover {
        & div {
          animation: 0.5s showWindow;
          animation-fill-mode: forwards;
        }
      }

      & p {
        margin: auto;
        color: #FF7415;
      }

      & img {
        width: 22px;
        margin: auto;
      }

      &__options {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 105%;
        left: -2px;
        width: 32px;
        border-radius: 15px;
        background-color: #F3F3F3;
        border: 2px solid #FF7415;

        z-index: -1;
        opacity: 0;
        pointer-events: none;

        & div {
          display: flex;
          width: 100%;
          border-radius: 13px;

          &:hover {
            background-color: #d3d3d3;
          }
        }

        & img, p {
          margin: 7px auto;
          color: #FF7415;
          width: 70%;
        }
      }
    }

    &-add {
      width: 32px;
      height: 32px;
      margin: auto 0;
      cursor: pointer;
      margin-left: auto;
      border-radius: 50%;
      transition: 0.22s;
      border: 2px solid #FF7415;
      background-image: url('@/assets/icons/plus_black.svg');
      background-position: center center;

      &:hover {
        transition: 0.22s;
        background-color: #FF7415;
        background-image: url('@/assets/icons/plus_white.svg');
      }
    }
  }

  &__btn {
    width: 10%;
    height: 34px;
    color: white;
    background-color: #FF7415;
  }
}

.complete-task {
  filter: grayscale(100%); 
  opacity: 0.6;

  & p {
    opacity: 0.4;
  }
}

.debt-task {
  border: 2px solid rgb(162, 49, 49);
  border-radius: 10px;
}
</style>