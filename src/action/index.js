import { useState, useEffect, useRef, useLayoutEffect } from 'react'

const useCallbackRef = (callback) => {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])
  return callbackRef
}

export const useFetch = (options) => {
  console.log(options.url)
  const [data, setData] = useState(null)

  const savedOnSuccess = useCallbackRef(options.onSuccess)

  useEffect(() => {
    if (options.url) {
      let isCancelled = false
      fetch(options.url)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json)
          if (!isCancelled) {
            savedOnSuccess.current?.(json)
            setData(json.data)
          }
        })
      return () => {
        isCancelled = true
      }
    }
  })

  return {
    data,
  }
}
