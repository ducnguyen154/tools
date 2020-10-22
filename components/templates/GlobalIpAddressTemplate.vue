<template>
  <div>
    <b-tabs class="mt-3" content-class="mt-3">
      <b-tab title="My Public IP">
        {{ ipAddress }}
      </b-tab>
    </b-tabs>
  </div>
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
