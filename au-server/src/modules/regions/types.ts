interface CreateRegionDTO {
  name: string 
  path: string 
}

interface EditRegionDTO extends CreateRegionDTO {
  id: string
}

export {
  CreateRegionDTO,
  EditRegionDTO
}