import { FC } from 'react'

interface pageProps {
  searchParams: {
    query: string
  }
}

const page: FC<pageProps> = async ({searchParams}) => {
    const {query} = await searchParams
  return <div>
    <h1>Search results for {query}</h1>
  </div>
}

export default page