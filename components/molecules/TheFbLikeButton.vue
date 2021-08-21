<template>
  <div
    class="fb-like"
    :data-action="action"
    :data-href="href"
    data-width=""
    :data-layout="layout"
    :data-size="size"
    :data-share="share"
    :data-ref="dateRef"
    :data-kid-directed-site="kidDirectedSite"
  ></div>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: 'like',
      required: true,
      validator(value) {
        return ['like', 'recommend'].includes(value)
      }
    },
    href: {
      type: String,
      required: true
    },
    kidDirectedSite: {
      type: Boolean,
      default: false,
      required: false
    },
    layout: {
      type: String,
      default: 'standard',
      required: false,
      validator(value) {
        return ['standard', 'button_count', 'button', 'box_count'].includes(
          value
        )
      }
    },
    lazy: {
      type: Boolean,
      default: false,
      required: false
    },
    dateRef: {
      type: String,
      default: '',
      required: false
    },
    share: {
      type: Boolean,
      default: true,
      required: true
    },
    size: {
      type: String,
      default: 'small',
      required: false,
      validator(value) {
        return ['small', 'large'].includes(value)
      }
    }
  }
}
</script>
