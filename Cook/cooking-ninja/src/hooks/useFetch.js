import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
     
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

       
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          
          setError('Could not fetch the data')
        }
      }
    }

    // invoke the function

    if (method === "GET") {
      setIsPending(true)
      fetchData().finally(() => {
        setIsPending(false)
      })
    }
    if (method === "POST" && options) {
      setIsPending(true)
      fetchData(options).finally(() => {
        setIsPending(false)
      })
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, isPending, error, postData }
}