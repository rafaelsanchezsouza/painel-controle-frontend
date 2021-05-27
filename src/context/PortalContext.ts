import { createContext } from 'react';

type PortalContextData = {
  portal: Portal;
  statusList: Array<string>;
  loading: boolean;
  escolhePortal: (portal: Portal) => void;
  defineStatus: (statusList: Array<string>) => void;
};

export const PortalContext = createContext({} as PortalContextData);
