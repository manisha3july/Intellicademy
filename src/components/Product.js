
import { useState } from 'react'
function Product(props) {

 const  [Count, setCount] = useState(5)


  return (
    <div>Product {props.productName}  
    <h1>count {Count}</h1>
    <button onClick={() => setCount(Count + 1)}>Increment</button>
      <button onClick={() => setCount(Count - 1)}>Decrement</button>
    </div>
  )
}

export default Product