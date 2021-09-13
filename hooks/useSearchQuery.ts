import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { QueryObj } from 'types';

export default function useSearchQuery() {
  const { query, pathname } = useRouter();
  const [productQuery, setProductQuery] = useState<QueryObj>({
    cat: '',
    max: '',
    min: '',
    page: 1,
  });

  useEffect(() => {
    const queriedCategory = query.cat ? query.cat : [];
    const queriedMin = query.min ? (query.min as string) : '';
    const queriedMax = query.max ? (query.max as string) : '';
    const queriedPage = query.page ? +(query.page as string) : 1;
    setProductQuery({
      cat: queriedCategory,
      max: queriedMax,
      min: queriedMin,
      page: queriedPage,
    });
  }, [query.cat, query.max, query.min, query.page]);

  const applyFilters = ({
    cat = productQuery.cat,
    min = productQuery.min,
    max = productQuery.max,
    page = productQuery.page,
  }: QueryObj) => {
    const params = {
      cat,
      min,
      max,
      page,
    };
    setProductQuery(params);
    const q = stringify(params)
      .replace(/[^?=&]+=(&|$)/g, '')
      .replace(/&$/, '');
    const { origin } = window.location;

    const url = `${origin}${pathname}${q ? `?${q}` : ''}`;
    const newUrl = new URL(url);
    window.history.pushState({}, '', newUrl as unknown as string);
  };

  return {
    applyFilters,
    productQuery,
  };
}
