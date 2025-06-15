import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      setReview("⚠️ Error getting review.")
    }
  }

  return (
    <>
      <main style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '20px',
        background: '#0f172a',
        minHeight: '100vh',
        height: '100vh',
        color: 'white',
        fontFamily: 'sans-serif'
      }}>
        {/* Code Editor Side */}
        <div className="left" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>🧑‍💻 Your Code</h2>
          <div className="code" style={{
            flexGrow: 1,
            border: '1px solid #333',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#1e293b'
          }}>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                height: '100%',
                width: '100%',
                color: '#fff'
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review"
            style={{
              marginTop: '10px',
              backgroundColor: '#06b6d4',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
              width: 'fit-content'
            }}
          >
            🔍 Review Code
          </div>
        </div>

        {/* Review Side */}
        <div className="right" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>🤖 AI Review</h2>
          <div style={{
            flexGrow: 1,
            border: '1px solid #333',
            borderRadius: '10px',
            padding: '16px',
            backgroundColor: '#1e1e2f',
            overflowY: 'auto'
          }}>
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
