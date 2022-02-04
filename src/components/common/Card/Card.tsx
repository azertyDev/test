import { FC } from 'react'
import './Card.css'

type CardProps = {
  title: string
  body: string
  userId: number
}

export const Card: FC<CardProps> = (props) => {
  const { title, body } = props

  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  )
}
