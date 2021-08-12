import UserAgent from 'express-useragent'

export default function (context) {
  // detect device is smart phone or pc
  try {
    context.ua = {}
    const userAgent = process.server
      ? context.req.headers['user-agent']
      : navigator.userAgent

    context.ua = UserAgent.parse(userAgent)
    context.isSp = context.ua.isMobile && !context.ua.isTablet

    context.store.commit('user/updateDeviceState', {
      ua: context.ua,
      isSp: context.isSp
    })
  } catch (err) {
    const message = `Useragent is Invalid. Try restart or reload. ${err}`

    if (process.server) {
      // eslint-disable-next-line no-console
      console.warning(message)
    }
  }
}
