import { BaseRegion, CreateRegionArgs, DeleteResult, EditRegionArgs, RegionWithChildrens, Response } from "./types"

class Api {
  private baseUrl: string 
  private cacheManager: Map<string, unknown>

  constructor() {
    this.baseUrl = 'http://localhost:4000/api/regions/'
    this.cacheManager = new Map()
  }

  private buildStringifiedKey (url?: string, options?: RequestInit) {
    return JSON.stringify({ url, options })
  }

  private checkCache<T = unknown>(key: string) {
    const cache = this.cacheManager.get(key) as T

    if (!cache) return false

    return true
  }

  private setCache(key: string, data: unknown) {
    if (this.checkCache(key)) return false

    this.cacheManager.set(key, data)
    return true
  }

  private async manageRequest<ResponseType = unknown>(url = '', options?: RequestInit) {
    const key = this.buildStringifiedKey(url, options)
    const haveCache = this.checkCache(key)

    if (haveCache) {
      const cached = this.cacheManager.get(key) as ResponseType
      
      return Promise.resolve({
        status: 'success',
        data: cached
      })
    }

    const data = await this.fetcher<Response<ResponseType>>(url, options)
    this.setCache(key, data)

    return data
  }

  private clearCache() {
    this.cacheManager.clear()
  }

  private async fetcher<T = any>(url = '', options?: RequestInit): Promise<T> {
    const res = await fetch(this.baseUrl + url, options)
    const data = await res.json()

    return data
  }

  public async getAllRegions() {
    return this.manageRequest<BaseRegion[]>()
  }

  public getRegionById(id: string) {
    return this.manageRequest<RegionWithChildrens>(id)
  }

  public deleteRegion(id: string): Promise<DeleteResult> {
    this.clearCache()

    return this.fetcher(id, {
      method: 'delete'
    })
  }

  public editRegion(args: EditRegionArgs): Promise<Response<BaseRegion>> {
    this.clearCache()

    return this.fetcher(args.id, {
      method: 'put',
      body: JSON.stringify(args),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  public createRegion(args: CreateRegionArgs): Promise<Response<BaseRegion>> {
    this.clearCache()

    return this.fetcher('', {
      method: 'post',
      body: JSON.stringify(args),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }
}

export default new Api()