<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">DucngTools</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/random" :active="isActive('/random')"
            >Random</b-nav-item
          >
          <b-nav-item href="/tinhluong" :active="isActive('/tinhluong')"
            >Tính lương</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    isActive(path) {
      return this.$route.path === path
    }
  }
}
</script>
