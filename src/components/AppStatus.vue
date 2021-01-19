<template>
  <span class="badge" :class="color">
    {{ type }}
  </span>
</template>

<script>
export default {
  props: {
    type: { type: String, default: '', required: true },
  },
  computed: {
    color() {
      if(this.type === 'Отменен') return 'danger'
      if(this.type === 'Выполняется') return 'warning'
      return 'primary'
    }
  },
}
</script>