<template>
  <div class="container">
    <global-ip-address-template
      :ip-address="ipAddress"
    ></global-ip-address-template>
  </div>
</template>

<script>
import GlobalIpAddressTemplate from '@/components/templates/GlobalIpAddressTemplate'
import RequestIp from 'request-ip'
import { mapGetters } from 'vuex'
export default {
  components: {
    GlobalIpAddressTemplate,
  },
  asyncData(context) {
    const requestIp = RequestIp.getClientIp(context.req)
    context.store.commit('ipAddress/setIpAddress', requestIp)
  },
  computed: {
    ...mapGetters({
      ipAddress: 'ipAddress/getIpAddress',
    }),
  },
}
</script>
