"use client";

import React, { useState } from "react";

interface ConversationInputProps {
  onSave: (data: any) => void;
  enableEnglish: boolean;
}

export default function ConversationInput({
  onSave,
  enableEnglish,
}: ConversationInputProps) {
  const [ko, setKo] = useState("");
  const [fr, setFr] = useState("");
  const [en, setEn] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ko, fr, en: enableEnglish ? en : null });
    setKo("");
    setFr("");
    setEn("");
  };

  return (
    <form onSubmit={handleSubmit} className="conversation-input-form">
      <h2>대화 추가</h2>

      <label>한국어 대화</label>
      <textarea value={ko} onChange={(e) => setKo(e.target.value)} required />

      <label>프랑스어 대화</label>
      <textarea value={fr} onChange={(e) => setFr(e.target.value)} required />

      {enableEnglish && (
        <>
          <label>영어 대화 (선택)</label>
          <textarea value={en} onChange={(e) => setEn(e.target.value)} />
        </>
      )}

      <button type="submit">저장</button>
    </form>
  );
}
