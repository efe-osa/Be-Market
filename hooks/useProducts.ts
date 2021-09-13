import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ProductResponse } from 'types';
import getData from 'utils/getData';

export default function useProducts() {
  const queryStr = stringify(useRouter().query);
  const { data, isValidating: loading } = useSWR<ProductResponse>(
    `/api/products${queryStr ? `?${queryStr}` : ''}`,
    getData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    loading,
    data,
  };
}
