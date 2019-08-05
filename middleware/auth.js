export default function(context) {
  console.log('[Middleware] Auth');
  if(context.store.getters.token == null)  {
    context.redirect('/admin/auth');
  }
}