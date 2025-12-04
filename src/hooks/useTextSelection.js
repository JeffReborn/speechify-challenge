import { useState, useEffect, useCallback } from "react";

export const useTextSelection = () => {
  const [selectionState, setSelectionState] = useState({
    text: "",
    showButtons: false,
    position: { x: 0, y: 0 },
  });

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    // Debug 日志 1: 看看鼠标松开时，函数跑了没？
    console.log("Mouse up triggered!");

    // Debug 日志 2: 看看浏览器认为你选没选中？
    console.log("Selection info:", {
      text: selection.toString(),
      isCollapsed: selection.isCollapsed,
      rangeCount: selection.rangeCount,
    });
    // boundary check
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      console.log("未选中有效文字，隐藏按钮"); // Debug 日志 3
      setSelectionState((prev) => ({ ...prev, showButtons: false }));
      return;
    }
    console.log("选中成功！计算坐标中..."); // Debug 日志 4
    const range = selection.getRangeAt(0);
    const text = selection.toString();
    const rect = range.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + window.scrollY - 10,
    };

    setSelectionState({ text, showButtons: true, position });
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, [handleSelection]);

  return selectionState;
};
