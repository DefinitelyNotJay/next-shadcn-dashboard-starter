// hooks/useDataFetcher.ts
import {
  useQuery,
  keepPreviousData, // ✨ import helper ตัวนี้มา
  UseQueryOptions,
  QueryKey
} from '@tanstack/react-query';

interface FetchResponse<T> {
  data: T[];
  totalItems: number;
}

export function useDataFetcherHook<T>(
  queryKey: QueryKey,
  fetchFn: () => Promise<FetchResponse<T>>,
  options?: Omit<
    UseQueryOptions<FetchResponse<T>, unknown, FetchResponse<T>, QueryKey>,
    'queryKey' | 'queryFn' | 'placeholderData'
  >
) {
  const query = useQuery<FetchResponse<T>, unknown, FetchResponse<T>, QueryKey>(
    {
      queryKey,
      queryFn: fetchFn,
      /**
       * แทน keepPreviousData: true
       * ให้ placeholderData รับข้อมูลก่อนหน้าไว้แสดงระหว่างรอ fetch ใหม่
       **/
      placeholderData: keepPreviousData,
      ...options
    }
  );

  return {
    data: query.data?.data ?? [],
    totalItems: query.data?.totalItems ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    /** เปลี่ยนชื่อตาม v5 */
    isPlaceholderData: query.isPlaceholderData
  };
}
