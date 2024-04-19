import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

// list all pages that do not require authentication
const publicPages = ['/', '/login', '/logout', '/signup'];

export const authValidatePageAccess: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;

  // TODO
  // @docs https://kit.svelte.dev/docs/modules#$app-paths-resolveroute
  // import { resolveRoute } from '$app/paths';
  // for advanced use cases use path === resolveRoute(publicPages.#.pageId, event.params)
  // the publicPages must contain unresolved paths

  if (!publicPages.includes(path) && !event.locals.user) {
    return redirect(302, '/login');
  }

  return resolve(event);
};
