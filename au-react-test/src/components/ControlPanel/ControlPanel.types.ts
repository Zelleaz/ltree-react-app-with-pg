import { UseNodeDispatchesResult } from './../../hooks/useNodeDispatches';
import { Dispatch } from 'react';
import { BaseRegion } from "../../api/types";

interface _ControlPanelProps extends BaseRegion {
  isModalOpen: boolean 
  setIsModalOpen: Dispatch<boolean>

  setters: UseNodeDispatchesResult
} 

export type ControlPanelProps = Readonly<_ControlPanelProps>