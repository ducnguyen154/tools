<template>
  <b-container fluid class="salary-box">
    <sp-the-vietnamese-salary></sp-the-vietnamese-salary>
    <the-fb-comment-area
      href="https://tinhluong.ducng.info"
      order-by="reverse_time"
      :num-posts="5"
      :lazy="true"
    ></the-fb-comment-area>
  </b-container>
</template>

<script>
import TheFbCommentArea from '@/components/molecules/TheFbCommentArea'
import SpTheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary/SpTheVietnameseSalary'
export default {
  components: { SpTheVietnameseSalary, TheFbCommentArea }
}
</script>

<style lang="scss" scoped>
.salary-box {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
