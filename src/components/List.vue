<template>
  <div class="list">
    <div class="lists">
      <div class="line" v-for="item in list" :key="item.match_timestamp">
        <div class="time">{{ item.match_time }}</div>
        <img :src="item.hname === name ? item.hlogo : item.glogo" />
        <div class="name">{{ name }}</div>
        <div :class="makeClass(item)">
          {{ item.hname === name ? item.host_score : item.guest_score }}
        </div>
        <div class="dash">-</div>
        <img :src="item.hname === name ? item.glogo : item.hlogo" />
        <div class="name">
          {{ item.hname !== name ? item.hname : item.gname }}
        </div>
        <div class="score" :class="makeClass(item, 1)">
          {{ item.hname !== name ? item.host_score : item.guest_score }}
        </div>
      </div>
    </div>
    <div class="count">
      <div class="line">胜 {{ win }} / 负 {{ lose }}</div>
      <div class="line">
        积分：
        <div class="win">{{ score }}</div>
        &nbsp;&nbsp;
        <div>净胜分：{{ count }}</div>
      </div>
      <div class="line">
        还剩{{ rest }}场, 最高<span class="win">{{ score + rest }}</span
        >积分
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    data: Array,
    name: String,
    win: Number,
    lose: Number,
    score: Number,
    count: Number,
  },
  computed: {
    list() {
      const res = [];
      this.data.forEach((obj) => {
        if (obj.hname === this.name || obj.gname === this.name) {
          res.push(obj);
        }
      });
      // console.log(res);
      return res;
    },
    rest() {
      let res = 0;
      this.list.forEach((obj) => {
        if (obj.host_score == 0 && obj.guest_score == 0) {
          res = res + 1;
        }
      });
      return res;
    },
  },
  methods: {
    makeClass(item, type) {
      let score = item.hname === this.name ? item.host_score : item.guest_score;
      if (type) {
        score = item.hname !== this.name ? item.host_score : item.guest_score;
      }
      return score == 3 ? "win" : "";
    },
  },
};
</script>

<style scoped>
.list {
  background: linear-gradient(35deg, #ccffff, #ffcccc);
  color: #333;
  padding: 20px;
}
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
}
.time {
  margin-right: 20px;
}
img {
  display: block;
  width: 30px;
  margin-right: 10px;
}
.name {
  margin-right: 10px;
}
.score {
  flex: 1;
  text-align: right;
}
.win {
  font-weight: bolder;
  color: red;
}
.dash {
  width: 20px;
  font-weight: bolder;
}
.count {
  margin-top: 20px;
}
</style>