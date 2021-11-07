import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { nextTick } from '@vue/composition-api'
import PopulationChart from '@/components/PopulationChart.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: { populations: [] },
  getters: {
    populations: (state) => state.populations,
  },
})

describe('PopulationChart component', () => {
  it('watchの検証', async () => {
    const wrapper = shallowMount(PopulationChart, { store, localVue })
    // 空の場合
    store.replaceState({ populations: [] })
    await nextTick() // 監視が完了するのを待つ
    expect(wrapper.vm.chartOptions.series).toEqual([])

    // stateが更新されたとき
    const populations = [
      {
        name: '北海道',
        data: [
          [1965, 10000],
          [1980, 10200],
        ],
      },
    ]
    store.replaceState({ populations })
    await nextTick() // 監視が完了するのを待つ
    expect(wrapper.vm.chartOptions.series).toEqual(populations)
  })
})
