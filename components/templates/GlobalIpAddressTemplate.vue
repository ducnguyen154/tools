<template>
  <div>{{ ipAddress }}</div>
</template>

<script>
export default {
  props: {
    ipAddress: {
      type: String,
      required: true,
    },
  },
}
</script>
