<template>
  <div>
    <page-title>
      <h1>Title</h1>
    </page-title>
    <prefectures-checkbox />
    <population-chart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PageTitle from '@/components/PageTitle.vue'
import PrefecturesCheckbox from '@/components/PrefecturesCheckbox.vue'
import PopulationChart from '@/components/PopulationChart.vue'

export default defineComponent({
  components: {
    PageTitle,
    PrefecturesCheckbox,
    PopulationChart,
  },
  setup() {
    return {}
  },
})
</script>
