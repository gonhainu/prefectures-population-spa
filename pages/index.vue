<template>
  <div>
    <page-title>
      <h1>Title</h1>
    </page-title>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PageTitle from '@/components/PageTitle.vue'

export default defineComponent({
  components: {
    PageTitle,
  },
  setup() {
    return {}
  },
})
</script>
