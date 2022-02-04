import { FC } from 'react'
import { useGetPostsQuery } from '@src/redux/postApi'
import { Card } from '@src/components/common/Card/Card'
import './Home.css'

type HomeProps = {}

export const Home: FC<HomeProps> = () => {
  const { data: posts, isLoading } = useGetPostsQuery(10)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!posts) {
    return <div>No posts</div>
  }

  return (
    <div className="container">
      <div className="cards">
        {posts?.map(({ id, ...post }) => (
          <Card key={id} {...post} />
        ))}
      </div>
    </div>
  )
}
