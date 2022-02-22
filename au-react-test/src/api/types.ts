interface BaseRegion {
  id: string 
  path: string 
  name: string 
}

interface RegionWithChildrens extends BaseRegion {
  childrens: BaseRegion[]
}

interface Response<T = any> {
  status: string
  data: T
}

interface DeleteResult {
  raw: any 
  affected: number
}

interface CreateRegionArgs {
  name: string 
  path: string 
}

type EditRegionArgs = BaseRegion

export type {
  BaseRegion, 
  RegionWithChildrens,
  CreateRegionArgs,
  EditRegionArgs,
  DeleteResult,
  Response
}