<template>
  <div>
    <!--cmty-->
    <the-nav-bar page="tinhluong" variant="danger" />
    <pc-the-vietnamese-salary-template
      v-if="isPc"
    ></pc-the-vietnamese-salary-template>
    <sp-the-vietnamese-salary-template
      v-else
    ></sp-the-vietnamese-salary-template>
  </div>
</template>

<script>
import TheNavBar from '@/components/atoms/TheNavBar'
import PcTheVietnameseSalaryTemplate from '@/components/templates/TheVietnameseSalaryTemplate/PcTheVietnameseSalaryTemplate'
import SpTheVietnameseSalaryTemplate from '@/components/templates/TheVietnameseSalaryTemplate/SpTheVietnameseSalaryTemplate'
import { mapGetters } from 'vuex'
export default {
  components: {
    PcTheVietnameseSalaryTemplate,
    SpTheVietnameseSalaryTemplate,
    TheNavBar
  },
  head: {
    title: this.metaTitle,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
      },
      {
        name: 'title',
        content: this.metaTitle
      },
      {
        hide: 'description',
        name: 'description',
        content: this.metaDescription
      },
      { name: 'twitter:title', content: this.metaTitle },
      { name: 'twitter:description', content: this.metaDescription },
      { name: 'facebook:title', content: this.metaTitle },
      { name: 'facebook:description', content: this.metaDescription }
    ]
  },
  computed: {
    ...mapGetters({
      isPc: 'user/isPc'
    }),
    metaTitle() {
      return 'Tính lương GROSS - NET'
    },
    metaDescription() {
      return 'Hỗ trợ tính lương GROSS - NET, cung cấp công cụ chuyển đổi lương GROSS - NET nhanh chóng, chính xác, cập nhật chính xác theo luật hiện hành. Tính các khoản bảo hiểm, thuế thu nhập các nhân... chí phí mà doanh nghiệp phải bỏ ra khi trả lương cho một nhân viên...'
    }
  }
}
</script>
