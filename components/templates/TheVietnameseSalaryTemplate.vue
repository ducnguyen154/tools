<template>
  <div>
    <the-vietnamese-salary class="salary-template"></the-vietnamese-salary>
  </div>
</template>

<script>
import TheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary'
export default {
  components: { TheVietnameseSalary }
}
</script>

<style lang="scss" scoped>
.salary-template {
  max-width: 700px;
  margin: 0 auto;
}
</style>
