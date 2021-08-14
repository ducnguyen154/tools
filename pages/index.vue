<template>
  <div>
    <!--cmty-->
    <the-home-nav-bar />
    <the-tools-template />
  </div>
</template>

<script>
import TheHomeNavBar from '@/components/atoms/TheHomeNavBar'
import TheToolsTemplate from '@/components/templates/TheToolsTemplate'
export default {
  components: { TheHomeNavBar, TheToolsTemplate }
}
</script>
