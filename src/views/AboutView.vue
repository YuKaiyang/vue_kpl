<template>
  <div class="about">
    <h3>{{ count }}</h3>
    <h3>{{ doubleCount }}</h3>
    <div>
      <button @click="increment">增加</button>
      <button @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { increment } = store

store.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart' 

  console.log(mutation)

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})

function reset() {
  store.$patch({
    count: 0
  })
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
