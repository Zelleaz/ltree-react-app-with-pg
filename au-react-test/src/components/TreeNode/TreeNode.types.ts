import { Dispatch } from 'react';
import { DeleteChildsArgs } from './../../hooks';
import { BaseRegion } from "../../api";

interface _TreeNodeProps extends BaseRegion {
  create: (region: BaseRegion) => void 
  edit: (region: BaseRegion) => void
  deleteRoot: (id: string) => void
  deleteChilds: (args: DeleteChildsArgs) => void 
  root: BaseRegion[]
  setRoot: Dispatch<BaseRegion[]>
}



export type TreeNodeProps = Readonly<_TreeNodeProps>