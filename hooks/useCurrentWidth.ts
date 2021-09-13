import { useState, useEffect } from 'react';

const getWidth = () =>
  typeof window !== 'undefined' &&
  (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

function useCurrentWidth() {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId: NodeJS.Timeout;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return width;
}

export default useCurrentWidth;
