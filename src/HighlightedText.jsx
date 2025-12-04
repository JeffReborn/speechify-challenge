import React, { useMemo } from "react";
// 这是一个辅助函数，用来把长句子拆成“单词对象”的数组
// 比如 "Hello World" -> [{word: "Hello", index: 0}, {word: " ", index: 5}, {word: "World", index: 6}]
const splitTextIntoWords = (text) => {
  const words = [];
  let currentIndex = 0;

  // 使用正则拆分：保留空格和单词
  // (\s+) 表示匹配空格并保留它作为独立的一项
  const parts = text.split(/(\s+)/);

  parts.forEach((part) => {
    if (part.length === 0) return;

    words.push({
      text: part,
      startIndex: currentIndex,
      endIndex: currentIndex + part.length,
    });

    currentIndex += part.length;
  });

  return words;
};
export const HighlightedText = ({ text, currentWordIndex, isSpeaking }) => {
  // 使用 useMemo 缓存拆分结果，避免每次高亮重绘时都重新计算拆分，优化性能
  const words = useMemo(() => splitTextIntoWords(text), [text]);
  return (
    <p style={{ lineHeight: "1.8", fontSize: "18px" }}>
      {words.map((item, i) => {
        //核心判断逻辑：
        // 如果当前正在播放，且 API 返回的 charIndex 刚好落在这个单词的区间内
        const isActive =
          isSpeaking &&
          currentWordIndex >= item.startIndex &&
          currentWordIndex < item.endIndex;

        // 如果是空格，就不需要背景色了，不然看起来像断层
        const isSpace = /^\s+$/.test(item.text);
        return (
          <span
            key={i}
            style={{
              backgroundColor: isActive && !isSpace ? "#ffeb3b" : "transparent", // 激活时显示黄色高亮
              transition: "background-color 0.1s ease", // 加个过渡动画，看起来更丝滑
              borderRadius: "2px",
            }}
          >
            {item.text}
          </span>
        );
      })}
    </p>
  );
};
