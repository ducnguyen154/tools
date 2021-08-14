<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="https://tools.ducng.info">
        <span>Tools</span>
        <span>ducng.info</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .navbar {
    padding: 5px;
  }
  .navbar-brand {
    display: flex;
    flex-flow: column;
    padding: 0 22px;
    margin-top: -5px;

    span:nth-child(1) {
      font-size: 26px;
      font-weight: 600;
      letter-spacing: 4px;
    }

    span:nth-child(2) {
      font-size: 12px;
      padding: 0;
      margin-top: -10px;
      letter-spacing: 2px;
    }
  }
}
</style>
