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

<script>
import {
  defineComponent,
  useStore,
  computed,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('fetchPrefectures')
    })
    const checkedPrefCode = ref([])
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
