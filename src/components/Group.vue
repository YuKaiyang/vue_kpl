<template>
  <div class="container">
    <!-- <select v-model="name" v-if="list.length">
      <option v-for="item in list" :key="item.name">{{ item.name }}</option>
    </select> -->
    <MySelect :list="list" @handleClick="handleClick" />
    <div class="right">
      <div class="rank">
        <span>目前排名</span>
        <span class="bold font-red">{{ rank }}</span>
      </div>
      <List :name="name" :win="win" :lose="lose" :score="score" :count="count" :data="data" />
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import MySelect from "./MySelect.vue";

export default {
  components: {
    List,
    MySelect,
  },
  props: {
    list: Array,
    data: Array,
    title: String,
  },
  data() {
    return {
      name: "",
    };
  },
  computed: {
    win() {
      let res = 0;
      this.list.forEach((v) => {
        if (v.name == this.name) {
          res = v.win;
        }
      });
      return res;
    },
    lose() {
      let res = 0;
      this.list.forEach((v) => {
        if (v.name == this.name) {
          res = v.lose;
        }
      });
      return res;
    },
    score() {
      let res = 0;
      this.list.forEach((v) => {
        if (v.name == this.name) {
          res = v.score;
        }
      });
      return res;
    },
    count() {
      let res = 0;
      this.list.forEach((v) => {
        if (v.name == this.name) {
          res = v.count;
        }
      });
      return res;
    },
    rank() {
      let index = 0;
      this.list.forEach((v, i) => {
        if (v.name == this.name) {
          index = `${this.title}第${i + 1}`;
        }
      });
      return index;
    },
  },
  watch: {
    list: {
      handler() {
        this.name = this.list[0].name;
      },
      immediate: true,
    },
  },
  methods: {
    handleClick(i) {
      this.name = i.name;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 42px auto;
  display: flex;
}

.right {
  flex: 1;
}

.bold {
  font-weight: bolder;
}

.rank {
  margin-bottom: 20px;
}

.font-red {
  color: red;
}
</style>
