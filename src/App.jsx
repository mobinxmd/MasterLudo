import Footer from "./components/footer"
import Navbar from "./components/navbar"
import GameBoard from "./pages/gameBoard"

import './app.css'


function App() {


  return (
       
        <div className="app">
        <div className="topView">
          <Navbar />
        </div>
          <GameBoard />
        <Footer />
        </div>
       
     
  )
}

export default App
