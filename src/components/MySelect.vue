<template>
  <div class="select-container">
    <div
      class="item"
      v-for="(v, i) in list"
      :key="v"
      :class="active === i && 'active'"
      @click="handleClick(v, i)"
    >
      {{ v.name }}
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
}
.item {
  padding: 12px 24px;
  flex: 1;
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
