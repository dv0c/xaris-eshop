'use client'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '../../../sanity.types'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'


interface CategorySelectorComponentProps {
  categories: Category[]
}

const CategorySelector: FC<CategorySelectorComponentProps> = ({ categories }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const router = useRouter()


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by Category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) => c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/categories=${selectedCategory.slug.current}`)
                  setOpen(false)
                }
              }
            }}
          />
          <CommandList>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={(currentValue) => {
                    setValue(value == category._id ? "" : category._id)
                    router.push(`/categories=${category.slug?.current}`)
                    setOpen(false)
                  }}
                >
                  {category.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              <CommandEmpty>No category found.</CommandEmpty>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

  )
}

export default CategorySelector