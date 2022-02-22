import { useCallback } from 'react';
import { BaseRegion } from '../api/types';
import { UseNodeDispatchesArgs, DeleteChildsArgs } from './types';

export const useNodeDispatches = ({ setChilds, setRoot, root, childs }: UseNodeDispatchesArgs) => {
  const create = (region: BaseRegion) => setChilds([...childs, region])

  const edit = (region: BaseRegion) => setRoot(root.map(re => {
    if (re.id === region.id) return region

    return re
  }))

  const deleteRoot = (id: string) => setRoot(root.filter(region => region.id !== id))

  const deleteChilds = (args: DeleteChildsArgs) => {
    if (args.all) return setChilds([])

    setChilds(childs.filter(region => region.id !== args.id))
  }

  return {
    create,
    edit,
    deleteRoot,
    deleteChilds
  }
}

export type UseNodeDispatchesResult = ReturnType<typeof useNodeDispatches>