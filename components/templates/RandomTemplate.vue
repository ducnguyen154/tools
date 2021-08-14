<template>
  <b-container>
    <b-tabs class="mt-3" content-class="mt-3">
      <b-tab title="Random string">
        <random-string></random-string>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import RandomString from '@/components/organisms/Random/RandomString'
export default {
  components: {
    RandomString
  }
}
</script>
