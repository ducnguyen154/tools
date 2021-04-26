<template>
  <div>
    <b-tabs class="mt-3" content-class="mt-3">
      <b-tab title="Random string">
        <random-string></random-string>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import RandomString from '@/components/organisms/String/RandomString'
export default {
  components: {
    RandomString,
  },
}
</script>
