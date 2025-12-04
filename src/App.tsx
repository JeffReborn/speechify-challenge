import { useTextSelection } from "./hooks/useTextSelection.js";

import "./App.css";

function App() {
  const { text, showButtons, position } = useTextSelection();
  console.log("当前选中文本:", text);
  console.log("播放按钮显示状态:", showButtons, "位置:", position);
  const handlePlay = () => {
    console.log("播放被点击，准备朗读:", text);
    // 明天我们将在这里接入 SpeechSynthesis API
    alert(`Play clicked! Text: ${text.substring(0, 20)}...`);
  };
  return (
    <div
      className="container"
      style={{ padding: "50px", maxWidth: "800px", margin: "0 auto" }}
    >
      <h1>Speechify Tech Lead Interview Mock</h1>
      <p style={{ lineHeight: "1.8", fontSize: "18px" }}>
        {/* 这里的文字模拟网页正文，你可以随便复制一大段英文进来 */}
        Speechify is the #1 text-to-speech app. It allows you to listen to docs,
        articles, pdfs, email, and various other formats. Our goal is to make
        reading accessible to everyone. When you select this text, a magic
        button should appear right above it. This is the core behavior of the
        Chrome Extension. Try selecting different parts of this paragraph,
        including spanning multiple lines. Make sure the button position is
        always correct!
      </p>
      {/* 这是一个模拟的“悬浮播放条” */}
      {showButtons && (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -100%)", // 这一步很关键！让按钮中心对准坐标，且位于坐标上方
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 12px",
            cursor: "pointer",
            zIndex: 1000, // 确保浮在最上层
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          ▶ Play
        </button>
      )}
    </div>
  );
}

export default App;
