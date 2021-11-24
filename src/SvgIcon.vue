<template>
  <svg
    aria-hidden="true"
    :style="style"
  >
    <use :xlink:href="`#${prefix}-${props.name}`" />
  </svg>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: null,
    required: true
  }
})

const app = getCurrentInstance()
const prefix = app.appContext.config.globalProperties.$prefix

const style = {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  strokeWidth: 0,
  fill: 'currentColor',
  verticalAlign: 'middle'
}
</script>
