<template>
  <div class="page-title">
    <slot>
      <h1>Title</h1>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
.page-title {
  width: 100%;
  background: #c4c4c4;
  text-align: center;
}
</style>
