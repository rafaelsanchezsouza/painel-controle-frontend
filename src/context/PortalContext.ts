import { createContext } from 'react';

type PortalContextData = {
  portal: Portal;
  escolhePortal: (portal: Portal) => void;
  loading: boolean;
};

export const PortalContext = createContext({} as PortalContextData);
