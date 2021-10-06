<template>
  <div id="app">
    <h1>2021年KPL秋季赛</h1>
    <MySelect :list="teamS" :data="dataS" title="S组" />
    <MySelect :list="teamA" :data="dataA" title="A组" />
    <MySelect :list="teamB" :data="dataB" title="B组" />
  </div>
</template>

<script>
import MySelect from "./components/MySelect.vue";

export default {
  name: "app",
  components: {
    MySelect,
  },
  created() {
    fetch(
      "/openapi/tgabank/getSchedules?appid=10005&sign=K8tjxlHDt7HHFSJTlxxZW4A%2BalA%3D&seasonid=KPL2021S2&stage=cgs1"
    )
      .then((response) => response.json())
      .then((json) => this.init(json.data))
      .catch((err) => console.log("Request Failed", err));
  },
  data() {
    return {
      dataS: [],
      dataA: [],
      dataB: [],
    };
  },
  computed: {
    teamS() {
      const titles = [];
      this.dataS.forEach((v) => {
        this.test(titles, v.hname) && titles.push(v.hname);
        this.test(titles, v.gname) && titles.push(v.gname);
      });
      return this.cal(titles, this.dataS);
    },
    teamA() {
      const titles = [];
      this.dataA.forEach((v) => {
        this.test(titles, v.hname) && titles.push(v.hname);
        this.test(titles, v.gname) && titles.push(v.gname);
      });
      return this.cal(titles, this.dataA);
    },
    teamB() {
      const titles = [];
      this.dataB.forEach((v) => {
        this.test(titles, v.hname) && titles.push(v.hname);
        this.test(titles, v.gname) && titles.push(v.gname);
      });
      return this.cal(titles, this.dataB);
    },
  },
  methods: {
    test(arr, name) {
      return arr.indexOf(name) === -1;
    },
    cal(arr, data) {
      const obj = {};
      const tar = [];
      arr.forEach((key) => {
        obj[key] = {
          name: key,
          win: 0,
          lose: 0,
          score: 0,
          count: 0,
        };
      });
      data.forEach((v) => {
        if (v.host_score == 3) {
          obj[v.hname].score = obj[v.hname].score + 1;
        }
        if (v.guest_score == 3) {
          obj[v.gname].score = obj[v.gname].score + 1;
        }
        obj[v.hname].win = obj[v.hname].win + v.host_score;
        obj[v.gname].win = obj[v.gname].win + v.guest_score;
        obj[v.hname].lose = obj[v.hname].lose + v.guest_score;
        obj[v.gname].lose = obj[v.gname].lose + v.host_score;
      });
      Object.keys(obj).forEach((key) => tar.push(obj[key]));
      tar.forEach((v) => {
        v.count = v.win - v.lose;
      });
      tar.sort((a, b) => {
        if (b.score === a.score) {
          if (b.count === a.count) {
            return this.spc();
          }
          return b.count - a.count;
        } else {
          return b.score - a.score;
        }
      });
      console.log(tar);
      return tar;
    },
    spc() {},
    init(arr) {
      arr.forEach((obj) => {
        if (obj.match_group == "S") {
          this.dataS.push(obj);
        }
        if (obj.match_group == "A") {
          this.dataA.push(obj);
        }
        if (obj.match_group == "B") {
          this.dataB.push(obj);
        }
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "微软雅黑", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-bottom: 60px;
}
</style>