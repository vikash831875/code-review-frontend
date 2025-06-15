import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import './App.css'; // Or './index.css' if you're putting styles there

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(
        'https://code-review-backend-hutj.onrender.com/ai/get-review',
        { code }
      );
      setReview(response.data);
    } catch (error) {
      setReview('⚠️ Error getting review.');
    }
  }

  return (
    <main>
      {/* Code Editor Side */}
      <div className="left">
        <h2>🧑‍💻 Your Code</h2>
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, 'javascript')
            }
            padding={16}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: '100%',
              width: '100%',
              color: '#fff',
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">
          🔍 Review Code
        </div>
      </div>

      {/* Review Side */}
      <div className="right">
        <h2>🤖 AI Review</h2>
        <div className="review-box">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </div>
    </main>
  );
}

export default App;
