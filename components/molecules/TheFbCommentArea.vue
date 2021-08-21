<template>
  <div
    class="fb-comments"
    :data-href="href"
    :data-numposts="numPosts"
    :data-width="width"
    :data-lazy="lazy"
    :data-order-by="orderBy"
    :data-mobile="mobile"
  ></div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    numPosts: {
      type: Number,
      default: 5,
      required: false
    },
    // eslint-disable-next-line vue/require-prop-types
    width: {
      default: '100%',
      required: false
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false
    },
    orderBy: {
      type: String,
      required: false,
      default: 'reverse_time',
      validator(value) {
        return ['social', 'reverse_time', 'time'].includes(value)
      }
    },
    mobile: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
