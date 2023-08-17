import { useState, useEffect } from 'react'
import { getRecipes } from '../../firebase/config'
import RecipeList from '../../components/RecipeList'
import React from 'react'; 

// styles
import './Home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(async () => {
    try {
      setIsPending(true)
      const recipes = await getRecipes()
      setData(recipes)
    } catch (error) {
      setError(error.message)
      throw new Error(error)
    } finally {
      setIsPending(false)
    }
  }, [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}