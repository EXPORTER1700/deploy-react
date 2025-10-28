import './App.css'

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const nodeEnv = import.meta.env.VITE_NODE_ENV;

    return (
        <>
            <p>Большой текст 123</p>
            <p>API URL: {apiUrl}</p>
            <p>NODE ENV: {nodeEnv}</p>
        </>
    )
}

export default App
