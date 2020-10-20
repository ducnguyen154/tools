export default function (context) {
  if (process.server) {
    const { req, redirect } = context
    if (req.url === '/') {
      return redirect('/random')
    }
  }
}
