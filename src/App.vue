<template>
  <div id="app">
    <!-- <h2>{{ $translate("test.hello") }}</h2> -->
    <h1>{{ season }}</h1>
    <Group :list="teamS" :data="dataS" title="S组" />
    <Group :list="teamA" :data="dataA" title="A组" />
    <Group v-if="dataB.length" :list="teamB" :data="dataB" title="B组" />
  </div>
</template>

<script>
import Group from "./components/Group.vue";

export default {
  name: "app",
  components: {
    Group,
  },
  created() {
    fetch(
      "/api/openapi/tgabank/getSchedules?appid=10005&sign=K8tjxlHDt7HHFSJTlxxZW4A%2BalA%3D&seasonid=KPL2024S1&stage=cgs1"
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
      season: "",
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
          score2: 0,
        };
      });
      data.forEach((v) => {
        if (v.host_score == 3) {
          obj[v.hname].score = obj[v.hname].score + 1;
          obj[v.gname].score2 = obj[v.gname].score2 + 1;
        }
        if (v.guest_score == 3) {
          obj[v.gname].score = obj[v.gname].score + 1;
          obj[v.hname].score2 = obj[v.hname].score2 + 1;
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
            return this.spc(a, b);
          }
          return b.count - a.count;
        } else {
          return b.score - a.score;
        }
      });
      // console.log(tar);
      return tar;
    },
    spc(a, b) {
      console.log(a, b);
      const res = this.oragin.find((v) => {
        // if (v.gname === a.name || v.gname === b.name) {
        //   console.log(v.gname, v.hname);
        // }
        return (
          (v.gname === a.name && v.hname === b.name) ||
          (v.gname === b.name && v.hname === a.name)
        );
      });
      console.log(res);
      if (res) {
        const as = res.hname === a.name ? res.host_score : res.guest_score;
        const bs = res.hname === b.name ? res.host_score : res.guest_score;
        return bs - as;
      }
    },
    init(arr) {
      this.season = arr[0].season + arr[0].stage_name;
      document.title = this.season;
      this.oragin = arr;
      console.log(arr);
      arr.forEach((obj) => {
        if (obj.guest_group == "S") {
          this.dataS.push(obj);
        }
        if (obj.guest_group == "A") {
          this.dataA.push(obj);
        }
        if (obj.guest_group == "B") {
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
  user-select: none;
}
</style>