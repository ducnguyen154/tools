<template>
  <div>
    <b-tabs class="mt-3" content-class="mt-3">
      <b-tab title="Random string generator">
        <random-string></random-string>
      </b-tab>
      <b-tab title=".htpasswd generator">
        <htpasswd-generator></htpasswd-generator>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import RandomString from '@/components/organisms/String/RandomString'
import HtpasswdGenerator from '@/components/organisms/String/HtpasswdGenerator'
export default {
  components: {
    RandomString,
    HtpasswdGenerator,
  },
}
</script>
