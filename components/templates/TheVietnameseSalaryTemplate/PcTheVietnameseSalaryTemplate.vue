<template>
  <b-container>
    <div class="template-box">
      <pc-the-vietnamese-salary
        class="salary-template"
      ></pc-the-vietnamese-salary>
      <div
        class="fb-comments"
        data-href="https://tinhluong.ducng.info"
        data-numposts="5"
        data-width="700"
        data-lazy
        data-order-by="reverse_time"
      ></div>
    </div>
  </b-container>
</template>

<script>
import PcTheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary/PcTheVietnameseSalary'
export default {
  components: { PcTheVietnameseSalary }
}
</script>

<style lang="scss" scoped>
.template-box {
  display: flex;
  flex-flow: column;
  align-items: center;

  .fb-comments {
    margin-top: 50px;
  }

  .salary-template {
    max-width: 700px;
  }
}
</style>
