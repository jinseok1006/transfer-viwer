import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";

interface AsyncState<T> {
  loading: boolean;
  data: null | T;
  error: null | unknown;
}

const initialState: AsyncState<any> = {
  loading: true,
  data: null,
  error: null,
};

const RelatedDeptContext = createContext<AsyncState<any>>(initialState);

// function ProviderFactory<T>(fetchData: () => Promise<T>) {
// }

export function RelatedDeptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [relatedDept, setRelatedDept] = useState<AsyncState<any>>(initialState);

  const fetchData = useCallback(async () => {
    setRelatedDept({ data: null, loading: true, error: null });
    try {
      const resp = await fetch(
        "https://transfer-static.inging.app/department-links.json"
      );
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const data = await resp.json();
      setRelatedDept({ data, loading: false, error: null });
    } catch (err) {
      setRelatedDept({ data: null, loading: false, error: err });
    }
  }, []);

  useEffect(() => {
    if (!relatedDept.data) {
      fetchData();
    }
  }, []);

  return (
    <RelatedDeptContext.Provider value={relatedDept}>
      {children}
    </RelatedDeptContext.Provider>
  );
}

export function useRelatedDept() {
  return useContext(RelatedDeptContext);
}
