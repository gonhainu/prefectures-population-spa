<template>
  <div>
    <page-title>
      <h1>Title</h1>
    </page-title>
    <prefectures-checkbox />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PageTitle from '@/components/PageTitle.vue'
import PrefecturesCheckbox from '@/components/PrefecturesCheckbox.vue'

export default defineComponent({
  components: {
    PageTitle,
    PrefecturesCheckbox,
  },
  setup() {
    return {}
  },
})
</script>
