import { useRef, useEffect, useState } from 'react';

/* packages */
import useSetState from 'react-use/lib/useSetState';

export function useSafeState(initialState) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => (mounted.current = false);

  }, []);

  const [state, setState] = useState(initialState);

  return [state, (...args) => mounted.current && setState(...args)];
}

export function useSafeSetState(initialState) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => (mounted.current = false);

  }, []);

  const [state, setState] = useSetState(initialState);

  return [state, (...args) => mounted.current && setState(...args)];
}
