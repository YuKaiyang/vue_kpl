<template>
  <div class="select-container">
    <div class="item" v-for="(v, i) in list" :key="v" :class="active === i && 'active'" @click="handleClick(v, i)">
      {{ v.name }}: {{ v.score }}-{{ v.score2 }}
    </div>
  </div>
</template>

<script>
export default {
  name: "mySelect",
  components: {},
  props: {
    list: Array,
  },
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    // console.log(this.list)
  },
  computed: {},
  watch: {},
  methods: {
    handleClick(v, i) {
      this.active = i;
      this.$emit("handleClick", v);
    },
  },
};
</script>

<style  scoped>
.select-container {
  border: #4a69cc 1px solid;
  border-radius: 6px;
  margin: 41px 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 162px;
}

.item {
  padding: 12px 0px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item:hover {
  color: #fff;
  background: #4a69cc;
  cursor: pointer;
}

.active {
  color: #fff;
  background: #4a69cc;
}
</style>
