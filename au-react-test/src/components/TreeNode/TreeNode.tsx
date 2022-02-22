import React, { useContext, useEffect, useMemo, useState } from 'react' 

import { Api, BaseRegion } from '../../api'
import { PathContext } from '../../App'
import { useNodeDispatches } from '../../hooks'
import { TreeNodeProps } from './TreeNode.types'

import ArrowRight from '../../icons/arrow-right.svg'
import Cube from '../../icons/object.svg'
import ControlPanel from '../ControlPanel/ControlPanel'

import './TreeNode.css'


const TreeNode: React.FC<TreeNodeProps> = ({ id, name, path, root, setRoot }) => {
  const [childrens, setChildrens] = useState<BaseRegion[]>([])
  const [isOpened, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    return () => {
      setChildrens([])
    }
  }, [])

  const setters = useNodeDispatches({
    childs: childrens,
    setChilds: setChildrens,
    root,
    setRoot
  })
  

  const ctx = useContext(PathContext)
  const depth = path.split('.').length - 1

  const onClickHandler = async () => {

    const { data } = await Api.getRegionById(id)
    ctx.pathRef.current = { id, name, path }

    if (Array.isArray(data.childrens)) setChildrens(data.childrens)
    setIsOpen(prev => !prev)
  }

  return (
    <div style={{
      marginLeft: `${depth > 0 ? 30 : 0}px`
    }} className='node-wrapper'>

      {
        (isOpened && childrens.length > 0 && <div className="node-line"/>)
      }

      <div className='node-root'>
        <ArrowRight 
          onClick={onClickHandler} 
          className={
            `
            node__arrow 
            ${isOpened ? 'node__arrow_active' : ''}
            `
          } 
        />
        <Cube onClick={onClickHandler} className='node__cube' />
        <span onClick={onClickHandler}>{name}</span>

        <div className='node__btn node__btn_edit' onClick={() => setIsModalOpen(true)}>
          +
        </div>

        <button onClick={async () => {
          await Api.deleteRegion(id)
          setters.deleteRoot(id)
        }} className='node__btn node__btn_delete'>
          X
        </button>
      </div>

      <div>
        { 
          (isOpened && childrens.map(child => <TreeNode root={childrens} setRoot={setChildrens} {...setters} key={child.id} {...child} />))
        }
      </div>

      {
        (isModalOpen && 
        <ControlPanel  
          setters={setters}
          id={id}
          isModalOpen={isModalOpen}
          name={name}
          path={path}
          setIsModalOpen={setIsModalOpen}
        />)
      }
    </div>
  )
}

export default TreeNode