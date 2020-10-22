<template>
  <div class="container">
    <global-ip-address-template
      :ip-address="ipAddress"
    ></global-ip-address-template>
  </div>
</template>

<script>
import GlobalIpAddressTemplate from '@/components/templates/GlobalIpAddressTemplate'
import publicIp from 'public-ip'
export default {
  components: {
    GlobalIpAddressTemplate,
  },
  async asyncData() {
    const ipAddress = await publicIp.v4()
    return {
      ipAddress,
    }
  },
}
</script>
