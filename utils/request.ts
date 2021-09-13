const request = async <T = unknown>(url: string, init?: RequestInit) => {
  let config: RequestInit = {};

  if (init) {
    config = {
      ...init,
      headers: {
        ...init.headers,
      },
    };
  }
  const res = await fetch(url, config);

  if (res.status >= 500) {
    throw new Error('Server Error!');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: T = await res.json();

  if (!res.ok) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    throw new Error(data.message as string);
  }

  return data;
};

export default request;
