"use client";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import "@/styles/study.css"; // 페이지 전용 스타일
import { ChangeState } from "@/components/ChangeState";
import SituationSelector from "@/components/SituationSelector";

// 배열을 무작위로 섞는 함수
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export default function Page2() {
  const [situations, setSituations] = useState<any[]>([]);
  const [selectedSituationId, setSelectedSituationId] = useState<number | "">(
    ""
  );
  // const [mode, setMode] = useState<"word" | "conversation" | "">("");
  const [mode, setMode] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]); // word or conversation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFrench, setShowFrench] = useState(false);

  useEffect(() => {
    // 상황 목록 불러오기
    fetchSituations();
  }, []);

  const fetchSituations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/situation");
      setSituations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModeSelect = async () => {
    if (!selectedSituationId) {
      alert("상황을 먼저 선택하세요.");
      return;
    }

    setCurrentIndex(0);
    setShowFrench(false);

    // 해당 상황 + 모드로 데이터 불러오기
    try {
      let fetchedItems: any[] = [];
      if (!mode) {
        const res = await axios.get(
          `http://localhost:3000/api/situations/${selectedSituationId}/words`
        );
        fetchedItems = res.data;
      } else {
        const res = await axios.get(
          `http://localhost:3000/api/situations/${selectedSituationId}/conversations`
        );
        fetchedItems = res.data;
      }
      // 데이터 랜덤하게 섞기
      const shuffledItems = shuffleArray(fetchedItems);
      console.log("shuffledItems", shuffledItems);
      setItems(shuffledItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowFrench(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowFrench(false);
    }
  };

  const handleToggleFrench = () => {
    setShowFrench((prev) => !prev);
  };

  // 상황 토글 (단어/대화)
  const handleToggle = () => {
    setMode((prev) => !prev);
    handleModeSelect();
  };

  const currentItem = items[currentIndex];

  const handleSelectSituation = (id: number) => {
    setSelectedSituationId(id);
  };

  return (
    <main className="page2-container">
      <h1 className="page1-title">공부하기</h1>

      <div className="selector-row">
        {/* 상황 선택 컴포넌트 */}
        <SituationSelector onSelectSituation={handleSelectSituation} />

        {/* 상태 변경 */}
        <ChangeState handleToggle={handleToggle} showWordInput={mode} />
      </div>

      {items.length > 0 && (
        <div className="study-view">
          <p className="study-count">
            현재 {currentIndex + 1} / 총 {items.length} 개
          </p>
          <div className="study-item">
            <p className="ko-text">KR: {currentItem.ko}</p>

            {/** 불어는 터치 or 클릭으로 보이게 */}
            {showFrench ? (
              <p className="fr-text">FR: {currentItem.fr}</p>
            ) : (
              <div className="fr-placeholder" onClick={handleToggleFrench}>
                <span>프랑스어 보기</span>
              </div>
            )}
          </div>

          <div className="navigation-buttons">
            {/* <button className="btn btn-active btn-secondary">이전</button> */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="nav-button btn btn-outline btn-neutral"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
              className="nav-button btn btn-outline btn-neutral"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
