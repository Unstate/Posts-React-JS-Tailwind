import { useState } from "react"

export const Counter = () => {
    let [count, setCount] = useState(0)

    const increment = () => {
        setCount(count += 1)
    }

    const decrement = () => {
        setCount(count -= 1)
    }
    return (
        <div>
            <div>{count}</div>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}