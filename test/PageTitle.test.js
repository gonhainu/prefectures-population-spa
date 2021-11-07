import { mount } from '@vue/test-utils'
import PageTitle from '@/components/PageTitle.vue'

describe('PageTitle', () => {
  it('slot', () => {
    const wrapper = mount(PageTitle, {
      slots: {
        default: '<p />',
      },
    })
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
