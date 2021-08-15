<template>
  <b-container fluid>
    <pc-the-vietnamese-salary
      class="salary-template"
    ></pc-the-vietnamese-salary>
  </b-container>
</template>

<script>
import PcTheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary/PcTheVietnameseSalary'
export default {
  components: { PcTheVietnameseSalary }
}
</script>

<style lang="scss" scoped>
.salary-template {
  max-width: 700px;
  margin: 0 auto;
}
</style>
