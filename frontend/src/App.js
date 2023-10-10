import styles from './App.module.css'
import Router from './Router/Router'
import { AuthProvider } from './Contexts/auth'

function App() {
    return (
        <AuthProvider>
            <div className={styles.app}>
                <Router />
            </div>
        </AuthProvider>
    )
}

export default App
