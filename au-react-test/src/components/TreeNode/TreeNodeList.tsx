import React, { useEffect, useState } from 'react'

import { Api, BaseRegion } from '../../api'
import { useNodeDispatches } from '../../hooks'

import TreeNode from './TreeNode'

const TreeNodeList: React.FC = () => {
  const [baseRegions, setBaseRegions] = useState<BaseRegion[]>([])
  const [title, setTitle] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  const setters = useNodeDispatches({
    childs: [],
    root: baseRegions,
    setRoot: setBaseRegions,
    setChilds: setBaseRegions
  })
  
  const titleRegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  const isTitleCorrect = titleRegExp.test(title)

  useEffect(() => {
    fetcher()
  }, [])

  const fetcher = async () => {
    const { data } = await Api.getAllRegions()

    if (Array.isArray(data)) setBaseRegions(data)
    setIsFetching(false)
  }


  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data } = await Api.createRegion({
      name: title,
      path: ''
    })
    setTitle('')
    setBaseRegions([...baseRegions, data])
  }

  return (
    <>
      <div className='node-list'>
        {
          baseRegions.map(region => <TreeNode root={baseRegions} setRoot={setBaseRegions} {...setters} key={region.id} {...region} />)
        }

        {
          (baseRegions.length === 0 && !isFetching && <h2>Регионы не найдены, создайте первый!</h2>)
        }

          <form className='list-form' onSubmit={onSubmitHandler} >
            <input className='list-form__input' value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Создайте регион' />
            <button className='list-form__btn' disabled={title.trim().length === 0 || isTitleCorrect}>
              Создать
            </button>
          </form> 
      </div>
    </>
  )
}

export default TreeNodeList