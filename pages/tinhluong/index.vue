<template>
  <div>
    <div id="fb-root"></div>
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
  head() {
    return {
      title: `${this.metaTitle}`,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
        },
        {
          name: 'title',
          content: 'Tính lương GROSS - NET'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Hỗ trợ tính lương GROSS - NET, cung cấp công cụ chuyển đổi lương GROSS - NET nhanh chóng, chính xác, cập nhật chính xác theo luật hiện hành. Tính các khoản bảo hiểm, thuế thu nhập các nhân... chí phí mà doanh nghiệp phải bỏ ra khi trả lương cho một nhân viên...'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'lương GROSS, lương NET, tính lương, bảo hiểm, tính lương gross - net, thuế TNCN, thuế thu nhập cá nhân, doanh nghiệp, tra cứu lương'
        },
        { name: 'twitter:title', content: 'Tính lương GROSS - NET' },
        {
          name: 'twitter:description',
          content:
            'Hỗ trợ tính lương GROSS - NET, cung cấp công cụ chuyển đổi lương GROSS - NET nhanh chóng, chính xác, cập nhật chính xác theo luật hiện hành. Tính các khoản bảo hiểm, thuế thu nhập các nhân... chí phí mà doanh nghiệp phải bỏ ra khi trả lương cho một nhân viên...'
        },
        { name: 'facebook:title', content: 'Tính lương GROSS - NET' },
        {
          name: 'facebook:description',
          content:
            'Hỗ trợ tính lương GROSS - NET, cung cấp công cụ chuyển đổi lương GROSS - NET nhanh chóng, chính xác, cập nhật chính xác theo luật hiện hành. Tính các khoản bảo hiểm, thuế thu nhập các nhân... chí phí mà doanh nghiệp phải bỏ ra khi trả lương cho một nhân viên...'
        }
      ],
      script: [
        {
          url: 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=2202461329875962&autoLogAppEvents=1',
          async: true,
          defer: true,
          crossorigin: 'anonymous',
          nonce: '79Af5EZT'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isPc: 'user/isPc'
    }),
    metaTitle() {
      return 'Tính lương GROSS - NET, Chuyển đổi lương GROSS - NET, Bảo hiểm, Thuế TNCN'
    }
  }
}
</script>
