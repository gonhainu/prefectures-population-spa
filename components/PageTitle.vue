<template>
  <div class="page-title">
    <slot>
      <h1>Title</h1>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped>
.page-title {
  width: 100%;
  background: #c4c4c4;
  text-align: center;
}
</style>
