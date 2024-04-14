<template>
  <div class="select-container" @keydown.down="handleDown" @keydown.up="handleUp" tabindex="0">
    <div class="item" v-for="(v, i) in list" :key="v" :class="active === i && 'active'" @click="handleClick(v, i)">
      {{ v.name }}: {{ v.score }}-{{ v.score2 }}
    </div>
  </div>
</template>

<script>
export default {
  name: "mySelect",
  components: {},
  emits: ['handleClick', 'handleDown', 'handleUp'],
  props: {
    list: Array,
  },
  data() {
    return {
      active: 0,
    };
  },
  mounted() { },
  computed: {},
  watch: {},
  methods: {
    handleClick(v, i) {
      this.active = i;
      this.$emit("handleClick", v);
    },
    handleDown() {
      const len = this.list.length - 1
      if (this.active < len) {
        this.active++
        this.$emit("handleClick", this.list[this.active]);
      }
    },
    handleUp() {
      if (this.active !== 0) {
        this.active--;
        this.$emit("handleClick", this.list[this.active]);
      }
    },
  },
};
</script>

<style scoped>
.select-container {
  border: #4a69cc 1px solid;
  border-radius: 6px;
  margin: 41px 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 162px;
  outline: none;
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
