export default function ({ req, redirect }) {
  if (req.url === '/') {
    return redirect('/random')
  }
}
