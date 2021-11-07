<template>
  <div class="prefectures-checkbox-container">
    <template v-for="prefecture in prefectures">
      <div :key="prefecture.prefCode">
        <input
          :id="`code-${prefecture.prefCode}`"
          v-model="checkedPrefCode"
          type="checkbox"
          :value="prefecture.prefCode"
        />
        <label :for="`code-${prefecture.prefCode}`">
          {{ prefecture.prefName }}
        </label>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed,
  ref,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('fetchPrefectures')
    })
    const checkedPrefCode = ref([] as number[])
    watch(checkedPrefCode, (newValue, oldValue) => {
      if (newValue.length > oldValue.length) {
        // 新たにチェックをつけられたなら
        // TODO: 毎回APIコールをしていいか
        store.dispatch(
          'fetchPrefecturePopulation',
          newValue[newValue.length - 1]
        )
      } else {
        // 新たにチェックが外れたなら
        const diffArray = oldValue.filter((item) => !newValue.includes(item))
        for (const prefCode of diffArray) {
          store.dispatch('deletePrefecturePopulation', prefCode)
        }
      }
    })
    return {
      prefectures: computed(() => store.getters.prefectures),
      checkedPrefCode,
    }
  },
})
</script>

<style scoped>
.prefectures-checkbox-container {
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
}
</style>
