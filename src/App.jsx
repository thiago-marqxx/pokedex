import './app.scss'
import { ThemeProvider } from './contexts/ThemeContext'
import { Router } from './pages/Routes'

function App() {

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App