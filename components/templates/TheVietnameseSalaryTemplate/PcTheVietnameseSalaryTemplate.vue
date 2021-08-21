<template>
  <b-container>
    <div class="template-box">
      <pc-the-vietnamese-salary
        class="salary-template"
      ></pc-the-vietnamese-salary>
      <the-fb-comment-area
        href="https://tinhluong.ducng.info"
        order-by="reverse_time"
        :num-posts="5"
        :width="700"
        :lazy="true"
        :mobile="false"
      ></the-fb-comment-area>
    </div>
  </b-container>
</template>

<script>
import TheFbCommentArea from '@/components/molecules/TheFbCommentArea'
import PcTheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary/PcTheVietnameseSalary'
export default {
  components: { PcTheVietnameseSalary, TheFbCommentArea }
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
