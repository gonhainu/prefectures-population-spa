import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Prefecture } from '@/types/prefecture'

export const state = () => ({
  prefectures: [] as Prefecture[],
  resasApiKey: '' as string,
  resasBaseUrl: '' as string,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  prefectures: (state) => state.prefectures,
}

export const mutations: MutationTree<RootState> = {
  SET_PREFECTURES: (state, prefectures: Prefecture[]) =>
    (state.prefectures = prefectures),
  SET_RESAS_API_KEY: (state, apiKey: string) => (state.resasApiKey = apiKey),
  SET_RESAS_BASE_URL: (state, baseUrl: string) =>
    (state.resasBaseUrl = baseUrl),
}

export const actions: ActionTree<RootState, RootState> = {
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
  initEnv({ commit }, $config) {
    commit('SET_RESAS_API_KEY', $config.resasApiKey)
    commit('SET_RESAS_BASE_URL', $config.resasBaseUrl)
  },
}
