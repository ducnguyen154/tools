<template>
  <div class="container">
    <!--cmty-->
    <pc-the-vietnamese-salary-template
      v-if="isPc"
    ></pc-the-vietnamese-salary-template>
    <sp-the-vietnamese-salary-template
      v-else
    ></sp-the-vietnamese-salary-template>
  </div>
</template>

<script>
import PcTheVietnameseSalaryTemplate from '@/components/templates/TheVietnameseSalaryTemplate/PcTheVietnameseSalaryTemplate'
import SpTheVietnameseSalaryTemplate from '@/components/templates/TheVietnameseSalaryTemplate/SpTheVietnameseSalaryTemplate'
import { mapGetters } from 'vuex'
export default {
  components: { PcTheVietnameseSalaryTemplate, SpTheVietnameseSalaryTemplate },
  computed: {
    ...mapGetters({
      isPc: 'user/isPc'
    })
  }
}
</script>
