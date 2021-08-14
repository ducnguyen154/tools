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
    title: 'Tính lương GROSS - NET',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
      },
      {
        hide: 'description',
        name: 'description',
        content:
          'Trang hỗ trợ chuyển đổi lương GROSS - NET trên hệ thống tín thuế và bảo hiểm ở VN. Cập nhật 08/2021'
      }
    ]
  },
  computed: {
    ...mapGetters({
      isPc: 'user/isPc'
    })
  }
}
</script>
