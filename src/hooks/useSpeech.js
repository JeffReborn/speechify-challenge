import { useState, useEffect, useRef, useCallback } from "react";

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // 记录读到第几个字了
  // 使用 useRef 保存 utterance 实例，防止闭包问题
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);

  const speak = useCallback(
    (text) => {
      // 1. 如果正在读，先停下来（防抖/重置）
      if (synth.speaking) {
        synth.cancel();
      }
      // 2. 创建语音实例
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0; // 语速，Speechify 的核心功能就是调节这个
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      // 3. 【Tech Lead 考点】事件监听
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentWordIndex(0);
      };
      // 【核心中的核心】onboundary 事件
      // 浏览器每读到一个单词，就会触发一次这个事件
      // event.charIndex 告诉我们当前读到了第几个字符
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          // 我们把这个索引存起来，下一步做高亮就靠它！
          setCurrentWordIndex(event.charIndex);
        }
      };
      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setIsSpeaking(false);
      };
      utteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [synth]
  );

  const cancel = useCallback(() => {
    synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  // 4. 【Tech Lead 考点】清理副作用
  // 如果组件卸载了（比如用户关掉了网页），必须强制停止朗读
  useEffect(() => {
    return () => {
      synth.cancel();
    };
  }, [synth]);
  return {
    speak,
    cancel,
    isSpeaking,
    currentWordIndex, // 把这个暴露出去
  };
};
