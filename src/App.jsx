import { useState } from 'react'
import LoginOverlay from './components/LoginOverlay'
import Dashboard from './components/Dashboard'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200 selection:text-blue-900">
            {!isAuthenticated ? (
                <LoginOverlay onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <Dashboard />
            )}
        </div>
    )
}

export default App
