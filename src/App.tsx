import './App.css'

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const nodeEnv = import.meta.env.VITE_NODE_ENV;

    return (
        <div style={{background: 'red', padding: '2rem'}}>
            <p>Большой текст 123</p>
            <p>API URL: {apiUrl}</p>
            <p>NODE ENV: {nodeEnv}</p>
            <p>TEST</p>
        </div>
    )
}

export default App
