export default function ({ req, redirect }) {
  if (req.path === '/') {
    return redirect('/random')
  }
}
