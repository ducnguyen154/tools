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
    console.log(context.req.headers['x-forwarded-for'])
    context.store.commit('ipAddress/setIpAddress', context.req.headers['x-forwarded-for'])
  },
  computed: {
    ...mapGetters({
      ipAddress: 'ipAddress/getIpAddress',
    }),
  },
}
</script>
