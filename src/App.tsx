import { useTextSelection } from "./hooks/useTextSelection.js";
import { useSpeech } from "./hooks/useSpeech.js";

import "./App.css";

function App() {
  const { text, showButtons, position } = useTextSelection();
  const { speak, cancel, isSpeaking, currentWordIndex } = useSpeech();
  console.log("当前选中文本:", text);
  console.log("播放按钮显示状态:", showButtons, "位置:", position);
  const handlePlayClick = () => {
    if (isSpeaking) {
      cancel(); // 如果在说话，点击就是“停止”
    } else {
      speak(text); // 如果没说话，点击就是“播放选中的文字”
    }
  };
  return (
    <div
      className="container"
      style={{ padding: "50px", maxWidth: "800px", margin: "0 auto" }}
    >
      <div
        style={{
          background: "#f0f0f0",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "12px",
        }}
      >
        <strong>Debug Info:</strong>
        <div>Is Speaking: {isSpeaking ? "Yes 🔊" : "No"}</div>
        <div>Current Char Index: {currentWordIndex}</div>
      </div>
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
          onClick={handlePlayClick}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -100%)", // 这一步很关键！让按钮中心对准坐标，且位于坐标上方
            // 根据状态改变颜色：正在读显示红色(停止)，没读显示黑色(播放)
            backgroundColor: isSpeaking ? "#ff4444" : "black",

            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 12px",
            cursor: "pointer",
            zIndex: 1000, // 确保浮在最上层
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          {isSpeaking ? "■ Stop" : "▶ Play"}
        </button>
      )}
    </div>
  );
}

export default App;
