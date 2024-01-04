// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { RouterProvider } from "react-router-dom"; // import react-router-dom terlebih dahulu
import router from "./routers"; // Panggil si router
// import "bulma/css/bulma.min.css";
import "./App.css"; // Untuk styling nantinya
// const CLIENT_ID = "c6f05921bdf810999249"



export default function App() {
  // function loginWithGithub(){
  //   window.location.assign("http://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  // }
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
