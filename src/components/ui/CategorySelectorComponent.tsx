'use client'
import { FC, useState } from 'react'
import { Category } from '../../../sanity.types'
import { useRouter } from 'next/navigation'

interface CategorySelectorComponentProps {
  categories: Category[]
}

const CategorySelectorComponent: FC<CategorySelectorComponentProps> = ({ categories }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const router = useRouter()
  return <div>
    
  </div>
}

export default CategorySelectorComponent