"use client"
import React from 'react'

type Props = {
  query: string
  onQuery: (q: string) => void
}

export default function FilterBar({ query, onQuery }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search notes or category" className="flex-1 p-2 border rounded" />
    </div>
  )
}
