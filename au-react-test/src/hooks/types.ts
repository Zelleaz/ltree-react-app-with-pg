import { Dispatch } from 'react';
import { BaseRegion } from '../api/types';

type RootDispatch = Dispatch<BaseRegion[]>
type ChildsDispatch = Dispatch<BaseRegion[]>

export type UseNodeDispatchesArgs = Readonly<{
  root: BaseRegion[]
  setRoot: RootDispatch,
  setChilds: ChildsDispatch
  childs: BaseRegion[]
}>

export interface DeleteChildsArgs {
  all?: boolean
  id?: string 
}