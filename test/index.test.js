import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import IndexPage from '@/pages/index.vue'
import PageTitle from '@/components/PageTitle.vue'
import PrefecturesCheckbox from '@/components/PrefecturesCheckbox.vue'
import PopulationChart from '@/components/PopulationChart.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({})
store.dispatch = jest.fn()

describe('index page', () => {
  it('必要なcomponentが使用されているか', () => {
    const wrapper = mount(IndexPage, { store, localVue })
    expect(wrapper.findComponent(PageTitle).exists()).toBe(true)
    expect(wrapper.findComponent(PrefecturesCheckbox).exists()).toBe(true)
    expect(wrapper.findComponent(PopulationChart).exists()).toBe(true)
  })
})
