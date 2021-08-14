<template>
  <div>
    <!--cmty-->
    <the-nav-bar page="random" variant="info" />
    <random-template></random-template>
  </div>
</template>

<script>
import TheNavBar from '@/components/atoms/TheNavBar'
import RandomTemplate from '@/components/templates/RandomTemplate'
export default {
  components: {
    RandomTemplate,
    TheNavBar
  }
}
</script>
