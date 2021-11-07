<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore,
  watch,
  reactive,
} from '@nuxtjs/composition-api'
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
export default defineComponent({
  components: {
    highcharts: Chart,
  },
  setup() {
    const store = useStore()
    Highcharts.setOptions({
      lang: { numericSymbols: undefined, thousandsSep: '' },
    })
    const chartOptions = reactive({
      title: {
        text: '',
      },
      lang: {
        numericSymbols: null,
      },
      yAxis: {
        title: {
          text: '人口数',
        },
      },
      xAxis: {
        title: {
          text: '年度',
          align: 'high',
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
        pointStart: '1965',
      },
      series: [],
    })

    const populations = computed(() => store.getters.populations)
    watch(populations, () => {
      chartOptions.series = populations.value
    })
    return {
      populations,
      chartOptions,
    }
  },
})
</script>

<style scoped></style>
