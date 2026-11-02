import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/* False while rendering on the server and during hydration, true afterwards.

   For things that need `document`/`window` to exist (portals, measurements)
   and so cannot be part of the prerendered HTML. useSyncExternalStore is the
   hydration-safe way to ask "am I in the browser?" - React renders the
   server snapshot first so the markup matches, then re-renders with the
   client one. Setting state in an effect would do the same with an extra
   render pass and trips react-hooks/set-state-in-effect. */
export default function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
