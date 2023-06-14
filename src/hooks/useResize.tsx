import { useEffect } from 'react';

const useResize = (cb: Function, extraCondition = true, intentSize = 640) => {
  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > intentSize && extraCondition) {
        cb();
      }
    };

    window.addEventListener('resize', resizeFunction);

    return () => window.removeEventListener('resize', resizeFunction);
  }, [extraCondition]);

  return null;
};
export default useResize;
