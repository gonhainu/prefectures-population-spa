import { createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import Vuex from 'vuex'
import * as storeIndex from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

let url = ''
let config = {}
const mockError = false
jest.mock('axios', () => ({
  $get: (_url, _config) => {
    return new Promise((resolve) => {
      if (mockError) throw new Error('Mock error')
      url = _url
      config = _config
      resolve({
        result: {
          data: [
            {
              label: '総人口',
              data: [],
            },
          ],
        },
      })
    })
  },
}))

const prefectures = [
  {
    prefCode: 1,
    prefName: '北海道',
  },
  {
    prefCode: 2,
    prefName: '青森県',
  },
  {
    prefCode: 3,
    prefName: '岩手県',
  },
  {
    prefCode: 4,
    prefName: '宮城県',
  },
  {
    prefCode: 5,
    prefName: '秋田県',
  },
  {
    prefCode: 6,
    prefName: '山形県',
  },
  {
    prefCode: 7,
    prefName: '福島県',
  },
  {
    prefCode: 8,
    prefName: '茨城県',
  },
  {
    prefCode: 9,
    prefName: '栃木県',
  },
  {
    prefCode: 10,
    prefName: '群馬県',
  },
  {
    prefCode: 11,
    prefName: '埼玉県',
  },
  {
    prefCode: 12,
    prefName: '千葉県',
  },
  {
    prefCode: 13,
    prefName: '東京都',
  },
  {
    prefCode: 14,
    prefName: '神奈川県',
  },
  {
    prefCode: 15,
    prefName: '新潟県',
  },
  {
    prefCode: 16,
    prefName: '富山県',
  },
  {
    prefCode: 17,
    prefName: '石川県',
  },
  {
    prefCode: 18,
    prefName: '福井県',
  },
  {
    prefCode: 19,
    prefName: '山梨県',
  },
  {
    prefCode: 20,
    prefName: '長野県',
  },
  {
    prefCode: 21,
    prefName: '岐阜県',
  },
  {
    prefCode: 22,
    prefName: '静岡県',
  },
  {
    prefCode: 23,
    prefName: '愛知県',
  },
  {
    prefCode: 24,
    prefName: '三重県',
  },
  {
    prefCode: 25,
    prefName: '滋賀県',
  },
  {
    prefCode: 26,
    prefName: '京都府',
  },
  {
    prefCode: 27,
    prefName: '大阪府',
  },
  {
    prefCode: 28,
    prefName: '兵庫県',
  },
  {
    prefCode: 29,
    prefName: '奈良県',
  },
  {
    prefCode: 30,
    prefName: '和歌山県',
  },
  {
    prefCode: 31,
    prefName: '鳥取県',
  },
  {
    prefCode: 32,
    prefName: '島根県',
  },
  {
    prefCode: 33,
    prefName: '岡山県',
  },
  {
    prefCode: 34,
    prefName: '広島県',
  },
  {
    prefCode: 35,
    prefName: '山口県',
  },
  {
    prefCode: 36,
    prefName: '徳島県',
  },
  {
    prefCode: 37,
    prefName: '香川県',
  },
  {
    prefCode: 38,
    prefName: '愛媛県',
  },
  {
    prefCode: 39,
    prefName: '高知県',
  },
  {
    prefCode: 40,
    prefName: '福岡県',
  },
  {
    prefCode: 41,
    prefName: '佐賀県',
  },
  {
    prefCode: 42,
    prefName: '長崎県',
  },
  {
    prefCode: 43,
    prefName: '熊本県',
  },
  {
    prefCode: 44,
    prefName: '大分県',
  },
  {
    prefCode: 45,
    prefName: '宮崎県',
  },
  {
    prefCode: 46,
    prefName: '鹿児島県',
  },
  {
    prefCode: 47,
    prefName: '沖縄県',
  },
]

const population = {
  prefCode: 1,
  population: [{ year: 1985, value: 10000 }],
}

describe('index store', () => {
  describe('actions', () => {
    let store
    beforeEach(() => {
      store = new Vuex.Store(cloneDeep(storeIndex))
      store.$axios = axios
      store.commit = jest.fn()
    })
    it('fetch prefectures', async () => {
      await store.dispatch('fetchPrefectures')
      expect(url).toBe('/api/v1/prefectures')
      store.commit('SET_PREFECTURES', prefectures)
      expect(store.commit).toHaveBeenCalledWith('SET_PREFECTURES', prefectures)
    })
    it('fetch population', async () => {
      await store.dispatch('fetchPrefecturePopulation', 1)
      expect(url).toBe('/api/v1/population/composition/perYear')
      expect(config.params).toEqual({ prefCode: 1, cityCode: '-' })
      store.commit('SET_POPULATION', population)
      expect(store.commit).toHaveBeenCalledWith('SET_POPULATION', population)
    })
  })
  describe('mutation', () => {
    let store
    beforeEach(() => {
      store = new Vuex.Store(cloneDeep(storeIndex))
    })
    it('SET_POPULATION', () => {
      // 1個目の追加
      store.commit('SET_POPULATION', population)
      expect(store.state.populations).toEqual([population])
      // 2個目の追加
      const population2 = {
        prefCode: 2,
        population: [{ year: 1985, value: 10000 }],
      }
      store.commit('SET_POPULATION', population2)
      expect(store.state.populations).toEqual([population, population2])
      // 2個目の再追加 prefCode: 2の内容が書き換わる
      const population3 = {
        prefCode: 2,
        population: [{ year: 1995, value: 10000 }],
      }
      store.commit('SET_POPULATION', population3)
      expect(store.state.populations).toEqual([population, population3])
    })
    it('DELETE_POPULATION', () => {
      // 1個目の追加
      store.commit('SET_POPULATION', population)
      expect(store.state.populations).toEqual([population])
      // prefCode: 1 の削除
      store.commit('DELETE_POPULATION', 1)
      expect(store.state.populations).toEqual([])
      // 存在しないprefCode: 2 の削除
      store.commit('DELETE_POPULATION', 2)
      expect(store.state.populations).toEqual([])
    })
  })

  describe('getters', () => {
    const populations = [
      {
        prefCode: 1,
        populations: [
          { year: 1985, value: 10000 },
          { year: 1990, value: 12000 },
        ],
      },
      {
        prefCode: 2,
        populations: [
          { year: 1985, value: 10000 },
          { year: 1990, value: 12000 },
        ],
      },
    ]
    const state = {
      populations,
      prefectures: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ],
    }
    it('populations', () => {
      const actual = storeIndex.getters.populations(state)
      expect(actual).toEqual([
        {
          name: '北海道',
          data: [
            [
              populations[0].populations[0].year,
              populations[0].populations[0].value,
            ],
            [
              populations[0].populations[1].year,
              populations[0].populations[1].value,
            ],
          ],
        },
        {
          name: '青森県',
          data: [
            [
              populations[1].populations[0].year,
              populations[1].populations[0].value,
            ],
            [
              populations[1].populations[1].year,
              populations[1].populations[1].value,
            ],
          ],
        },
      ])
    })
  })
})
