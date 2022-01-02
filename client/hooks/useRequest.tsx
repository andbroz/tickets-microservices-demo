import axios from 'axios';
import { useState } from 'react';

const AXIOS_METHOD = ['get', 'post', 'put', 'delete', 'patch'] as const;

interface Props<DataType> {
  request: {
    url: string;
    method: typeof AXIOS_METHOD[number];
    body: Record<string, unknown>;
  };
  onSuccess?: (data: DataType) => void;
}

type Error = {
  message: string;
};

type UseRequestReturn<DataType> = {
  doRequest: () => Promise<DataType | undefined>;
  errors: Error[] | null;
};

const useRequest = <DataType,>({
  request: { url, method, body },
  onSuccess,
}: Props<DataType>): UseRequestReturn<DataType> => {
  const [errors, setErrors] = useState<Error[] | null>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data as DataType);
      }
      return response.data as DataType;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data.errors);
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
