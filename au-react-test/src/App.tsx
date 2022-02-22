import React, { useRef } from 'react' 
import { BaseRegion } from './api'
import { TreeNodeList } from './components'

export const PathContext = React.createContext<PathCtx>({ pathRef: {current: {
  id: '',
  name: '',
  path: ''
}} })

interface PathCtx {
  pathRef: React.MutableRefObject<BaseRegion>
}

export const App: React.FC = () => {
  const pathRef = useRef<BaseRegion>({
    id: '',
    name: '',
    path: ''
  })

  return (
    <PathContext.Provider value={{ pathRef }}>
      <TreeNodeList />
    </PathContext.Provider>
  )
}