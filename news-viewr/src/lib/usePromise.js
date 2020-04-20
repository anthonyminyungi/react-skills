import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 커스텀 Hook
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API를 연동하여 개발할 때 절대 잊지 말아야 할 유의사항은
    // useEffect에 등록하는 함수는 async로 작성하면 안되고
    // 대신에 함수 내부에 async함수를 따로 만들어주고 호출하는 방식을 취해야 한다.
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, deps);

  return [loading, resolved, error];
}
