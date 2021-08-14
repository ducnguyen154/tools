<template>
  <div>
    <b-navbar toggleable="lg" type="dark" :variant="variant">
      <b-navbar-brand href="https://tools.ducng.info">
        <span>Tools</span>
        <span>ducng.info</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="https://random.ducng.info"
            :active="page === 'random'"
            >Random</b-nav-item
          >
          <b-nav-item
            href="https://tinhluong.ducng.info"
            :active="page === 'tinhluong'"
            >Tính lương</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
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
    },
    variant: {
      type: String,
      default: 'info',
      validator(value) {
        return [
          'info',
          'primary',
          'secondary',
          'danger',
          'warning',
          'light',
          'dark',
          'success'
        ].includes(value)
      }
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
