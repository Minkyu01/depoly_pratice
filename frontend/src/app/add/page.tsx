"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import "@/styles/add.css"; // 페이지 전용 스타일

// 상황 선택을 위한 공통 컴포넌트
import SituationSelector from "@/components/SituationSelector";
import WordInput from "@/components/WordInput";
import ConversationInput from "@/components/ConversationInput";
import { ChangeState } from "@/components/ChangeState";

export default function Page1() {
  // 토글: 단어 or 대화
  const [showWordInput, setShowWordInput] = useState(true);
  // 상황(Selector)에서 선택된 ID
  const [selectedSituationId, setSelectedSituationId] = useState<number | null>(
    null
  );
  // 영어 입력창 표시 여부
  const [enableEnglish, setEnableEnglish] = useState<boolean>(false);
  // 새 상황 추가를 위한 상태
  const [newSituationName, setNewSituationName] = useState("");
  // SituationSelector에 접근하기 위한 ref
  const situationSelectorRef = useRef<any>(null);

  // 상황 토글 (단어/대화)
  const handleToggle = () => {
    setShowWordInput((prev) => !prev);
  };

  // 언어 추가 토글 (영어)
  const handleEnglishToggle = () => {
    setEnableEnglish((prev) => !prev);
  };

  // SituationSelector에서 상황 선택 시
  const handleSelectSituation = (id: number) => {
    setSelectedSituationId(id);
  };

  // 단어 or 대화 저장
  const handleSave = async (data: any) => {
    if (!selectedSituationId) {
      alert("상황을 먼저 선택해주세요!");
      return;
    }
    try {
      if (showWordInput) {
        // 단어 저장 API
        await axios.post(
          `http://localhost:3000/api/situations/${selectedSituationId}/words`,
          data
        );
      } else {
        // 대화 저장 API
        await axios.post(
          `http://localhost:3000/api/situations/${selectedSituationId}/conversations`,
          data
        );
      }
      alert("저장 성공!");
    } catch (error) {
      console.error(error);
      alert("저장 실패!");
    }
  };

  // **새 상황 추가하기**
  const handleAddSituation = async () => {
    if (!newSituationName.trim()) {
      alert("상황 이름을 입력하세요.");
      return;
    }
    try {
      // 예) POST /api/situation  => { name: "..." }
      await axios.post("http://localhost:3000/api/situations", {
        name: newSituationName,
      });
      alert("새 상황이 추가되었습니다.");

      // 입력 필드 비우기
      setNewSituationName("");

      // SituationSelector 목록 재로드
      if (situationSelectorRef.current?.reloadSituations) {
        situationSelectorRef.current.reloadSituations();
      }
    } catch (error) {
      console.error(error);
      alert("상황 추가 실패");
    }
  };

  return (
    <main className="page1-container">
      <h1 className="page1-title">단어/대화 추가하기</h1>

      <div className="collapse collapse-plus bg-base-200">
        <input type="checkbox" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">상황 추가하기</div>
        <div className="collapse-content">
          <div className="add-situation-row">
            <input
              type="text"
              placeholder="새 상황 이름"
              value={newSituationName}
              onChange={(e) => setNewSituationName(e.target.value)}
            />
            <button onClick={handleAddSituation}>추가</button>
          </div>
        </div>
      </div>

      {/* 상황 선택 컴포넌트 */}
      <SituationSelector
        onSelectSituation={handleSelectSituation}
        // ref={situationSelectorRef}
      />

      {/* 토글 버튼 */}
      <div className="flex justify-between mt-4">
        <ChangeState
          handleToggle={handleToggle}
          showWordInput={showWordInput}
        />

        <div className="flex justify-center gap-3">
          <div className="form-control " onClick={handleEnglishToggle}>
            <label className="label cursor-pointer flex flex-col gap-2">
              <span className="label-text">영어</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                // defaultChecked
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label cursor-pointer flex flex-col gap-2">
              <span className="label-text">일본어</span>
              <input
                type="checkbox"
                className="toggle toggle-secondary"
                // defaultChecked
              />
            </label>
          </div>
        </div>
      </div>

      {/* 입력 폼 표시 */}
      {showWordInput ? (
        <WordInput onSave={handleSave} enableEnglish={enableEnglish} />
      ) : (
        <ConversationInput onSave={handleSave} enableEnglish={enableEnglish} />
      )}
    </main>
  );
}
