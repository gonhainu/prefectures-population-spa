import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Prefecture, PrefecturePopulation } from '@/types/prefecture'

export const state = () => ({
  prefectures: [] as Prefecture[],
  populations: [] as PrefecturePopulation[],
  resasApiKey: '' as string,
  resasBaseUrl: '' as string,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  prefectures: (state) => state.prefectures,
  populations: (state) => {
    // state.populations
    const series = []
    for (const population of state.populations) {
      const prefCode = population.prefCode
      let prefName: string | undefined = ''
      if (state.prefectures.length > 0) {
        prefName =
          state.prefectures.find((item) => item.prefCode === prefCode)
            ?.prefName || ''
      }
      series.push({
        name: prefName,
        data: population.populations.map((item) => [item.year, item.value]),
      })
    }
    return series
  },
}

export const mutations: MutationTree<RootState> = {
  SET_PREFECTURES: (state, prefectures: Prefecture[]) =>
    (state.prefectures = prefectures),
  SET_POPULATION: (state, prefecturePopulation: PrefecturePopulation) => {
    const index = state.populations.findIndex(
      (item) => item.prefCode === prefecturePopulation.prefCode
    )
    if (index < 0) {
      state.populations.push(prefecturePopulation)
    } else {
      state.populations.splice(index, 1, prefecturePopulation)
    }
  },
  DELETE_POPULATION: (state, prefCode: number) => {
    const index = state.populations.findIndex(
      (item) => item.prefCode === prefCode
    )
    if (index >= 0) {
      state.populations.splice(index, 1)
    }
  },
  SET_RESAS_API_KEY: (state, apiKey: string) => (state.resasApiKey = apiKey),
  SET_RESAS_BASE_URL: (state, baseUrl: string) =>
    (state.resasBaseUrl = baseUrl),
}

export const actions: ActionTree<RootState, RootState> = {
  /**
   * 都道府県取得
   */
  async fetchPrefectures({ commit, state }) {
    await this.$axios
      .$get(`${state.resasBaseUrl}/api/v1/prefectures`, {
        headers: {
          'X-API-KEY': state.resasApiKey,
        },
      })
      .then((res) => {
        const prefectures = res.result
        commit('SET_PREFECTURES', prefectures)
      })
  },
  async fetchPrefecturePopulation({ commit, state }, prefCode: number) {
    await this.$axios
      .$get(`${state.resasBaseUrl}/api/v1/population/composition/perYear`, {
        params: {
          prefCode,
          cityCode: '-',
        },
        headers: {
          'X-API-KEY': state.resasApiKey,
        },
      })
      .then((res) => {
        const population = res.result.data.find(
          (item: { label: string; data: any }) => item.label === '総人口'
        ).data
        commit('SET_POPULATION', { prefCode, populations: population })
      })
  },
  deletePrefecturePopulation({ commit }, prefCode: number) {
    commit('DELETE_POPULATION', prefCode)
  },
  /**
   * 環境変数取得
   * @param $config
   */
  initEnv({ commit }, $config) {
    commit('SET_RESAS_API_KEY', $config.resasApiKey)
    commit('SET_RESAS_BASE_URL', $config.resasBaseUrl)
  },
}
