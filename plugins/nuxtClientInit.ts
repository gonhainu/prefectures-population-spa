import { Context } from '@nuxt/types'

export default function (context: Context) {
  context.store.dispatch('initEnv', context.$config)
}
