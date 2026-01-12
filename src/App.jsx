// import { useState } from 'react'
// import './App.css'

// function App() {
//   const pokemon = "Bulbasaur"
//   const size = 5

//   const tepo = () => {
//     console.log("tipo!!!")
//   }

//   return (
//     <>
//       <h1>POKEDEX</h1>
//       <h2>Name of my pokemon is {pokemon}</h2>
//       <h2>Its size is {size}</h2>
//       <button onClick={tepo}>Click me!</button>
//     </>
//   )
// }

// export default App






import { useState } from 'react'
import './App.css'

function App() {
  const [parson, setParson] = useState("Sadikul Seikh")
  const [count, setCount] = useState(0)

  const changeName = () => {
    setParson("Sadik")
  }
  const countIncress = () => {
    setCount(count + 1)
  }
  const countDicress = () => {
    setCount(count - 1)
  }

  return (
    <>
      <h2>My name is {parson}</h2>
      <button onClick={changeName}>Change Name</button>
      <p>Count : {count}</p>
      <button onClick={countIncress}>+</button>
      <button onClick={countDicress}>-</button>
    </>
  )
}

export default App
