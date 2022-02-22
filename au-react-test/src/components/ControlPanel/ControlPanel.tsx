import React, { useContext, useEffect, useState } from 'react' 
import { Api } from '../../api'
import { ControlPanelProps } from './ControlPanel.types'
import './ControlPanel.css'

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const [title, setTitle] = useState('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data } = await Api.createRegion({
      name: title,
      path: props.path
    })
    setTitle('')

    props.setters.create(data)
    props.setIsModalOpen(false)
  }

  const editHandler = async () => {
    const { data } = await Api.editRegion({
      id: props.id,
      name: title,
      path: props.path
    })

    setTitle('')
    props.setters.edit(data)
    props.setIsModalOpen(false)
  }

  const closeHandler = () => {
    setTitle('')
    props.setIsModalOpen(false)
  }

  return (
    <div className='panel-wrapper'>
      <form 
        className='panel-form'
        onSubmit={onSubmitHandler}
      >

        <div onClick={closeHandler} className="panel-form__close">
          X
        </div>

        {
          (props.id.length > 0 && <h2 className='panel-title'>Активный регион: <span className="panel-title_active">{props.name}</span></h2>)
        }

        <input placeholder='Название региона...' value={title} onChange={e => setTitle(e.target.value)} className='panel__input' type="text" />

        <div>
          <button className='panel__btn panel__btn_create'  type='submit' disabled={title.trim().length === 0}>
            Создать
          </button>

          <button className='panel__btn panel__btn_edit' type='button' onClick={editHandler} disabled={title.trim().length === 0 || props.id.length === 0}>
            Сменить название
          </button>
        </div>
      </form>
    </div>
  )
}

export default ControlPanel