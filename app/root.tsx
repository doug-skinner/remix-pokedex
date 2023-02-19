import { Scripts } from '@remix-run/react'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <html>
      <head>
        <title>My First Remix App</title>
      </head>
      <body>
        <p>This is a remix app. Hooray!</p>
        <button onClick={() => setCount(c => c + 1)}>{count}</button>
        <Scripts />
      </body>
    </html>
  )
}