import { createConnection } from 'typeorm';
import { Regions } from '.';
import { getConnectionManager, getRepository, Repository } from 'typeorm';
import { CreateRegionDTO, EditRegionDTO } from './types';

class RegionsService {
  private regionsRepo: Repository<Regions>

  constructor() {
    if (!getConnectionManager().has('default')) {
      createConnection({
        type: 'postgres',
        host: process.env.DB_HOST || 'host.docker.internal',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'afyfncshrjd228',
        database: process.env.DB_NAME || 'postgres',
        entities: [
          Regions
        ],
        synchronize: true,
      }).then(() => {
        this.regionsRepo = getRepository(Regions)
      })
    }

    else {
      this.regionsRepo = getRepository(Regions)
    }
  }

  private ltreeGetter(path: string = ''): Promise<Regions[]> {
    return this.regionsRepo.query(`select * from regions where path ~ '${path.length > 0 ? `${path}.` : ''}*{1}' `)
  }

  public getAllRegions() {
    return this.ltreeGetter()
  }

  public async getRegionById(id: string) {
    const region = await this.regionsRepo.findOne(id)

    const childrens = await this.ltreeGetter(region.path)

    return {
      ...region,
      childrens
    }
  } 

  public async createRegion(dto: CreateRegionDTO) {
    const region = new Regions()
    region.name = dto.name 
    region.path = dto.path.trim().length > 0 ? `${dto.path}.${dto.name}` : dto.name
    
    const data = await this.regionsRepo.save(region)
      
    return data
  }

  public async editRegion(dto: EditRegionDTO) {
    const region = await this.regionsRepo.findOne(dto.id)
    region.name = dto.name
    region.path = dto.path

    return this.regionsRepo.save(region)
  }

  public async deleteRegion(id: string) {
    const { path } = await this.regionsRepo.findOne(id)

    await this.regionsRepo.query(`delete from regions where path ~ '${path.length > 0 ? `${path}.` : ''}*{1,}' `)
  
    return this.regionsRepo.delete(id)
  }
}

export default new RegionsService()