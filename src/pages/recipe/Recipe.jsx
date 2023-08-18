import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { getRecipes } from '../../firebase/config'
import React from 'react'; 
// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)

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
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>ing</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}