import { useState, useEffect } from 'react';

const INAPP_AGENTS = ['kakaotalk', 'everytimeapp'];

export default function useAgent() {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (INAPP_AGENTS.some((agent) => userAgent.includes(agent))) {
      setIsInApp(true);
    }
  }, []);

  return isInApp;
}
