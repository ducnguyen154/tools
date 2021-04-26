<template>
  <div class="container">
    <global-ip-address-template
      :ip-address="ipAddress"
    ></global-ip-address-template>
  </div>
</template>

<script>
import GlobalIpAddressTemplate from '@/components/templates/GlobalIpAddressTemplate'
import { mapGetters } from 'vuex'
export default {
  components: {
    GlobalIpAddressTemplate,
  },
  asyncData(context) {
    // eslint-disable-next-line
    console.log(context.req.headers)
    const publicIp = context.req.headers['x-forwarded-for']
    context.store.commit('ipAddress/setIpAddress', publicIp)
  },
  computed: {
    ...mapGetters({
      ipAddress: 'ipAddress/getIpAddress',
    }),
  },
}
</script>
