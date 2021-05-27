import api from './api';
import { useEffect, useState } from 'react';

export default function GetStatusList() {
  const [statusList, setStatusList] = useState<string[]>(['0']);

  useEffect(() => {
    const request = `/status`;
    api.get(request).then((response) => {
      setStatusList(response.data);
    });
  }, []);

  return statusList;
}
