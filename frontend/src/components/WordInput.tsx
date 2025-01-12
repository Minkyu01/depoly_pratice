"use client";

import React, { useState } from "react";

interface WordInputProps {
  onSave: (data: any) => void;
  enableEnglish: boolean;
}

export default function WordInput({ onSave, enableEnglish }: WordInputProps) {
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
    <form onSubmit={handleSubmit} className="word-input-form">
      {/* <h2>단어 추가</h2> */}

      <label>한국어</label>
      <input value={ko} onChange={(e) => setKo(e.target.value)} required />

      <label>프랑스어</label>
      <input value={fr} onChange={(e) => setFr(e.target.value)} required />

      {enableEnglish && (
        <>
          <label>영어 (선택)</label>
          <input value={en} onChange={(e) => setEn(e.target.value)} />
        </>
      )}

      <button type="submit">저장</button>
    </form>
  );
}
