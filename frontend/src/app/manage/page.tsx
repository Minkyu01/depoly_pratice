"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/manage.css"; // 페이지 전용 스타일

interface ISituation {
  id: number;
  name: string;
}

interface IWord {
  id: number;
  ko: string;
  fr: string;
  en?: string | null;
  situation_id: number;
}

interface IConversation {
  id: number;
  ko: string;
  fr: string;
  en?: string | null;
  situation_id: number;
}

export default function Manage() {
  const [situations, setSituations] = useState<ISituation[]>([]);
  const [selectedSituationId, setSelectedSituationId] = useState<number | null>(
    null
  );

  // 단어/대화 데이터
  const [words, setWords] = useState<IWord[]>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  // 토글: "word" 또는 "conversation"
  const [mode, setMode] = useState<"word" | "conversation">("word");

  // 수정 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<{
    type: "word" | "conversation";
    id: number;
    ko: string;
    fr: string;
    en?: string | null;
    situation_id: number;
  } | null>(null);

  // 모든 상황 목록 (수정 모달에서 '상황 변경' 선택 시 사용)
  const [allSituations, setAllSituations] = useState<ISituation[]>([]);

  useEffect(() => {
    fetchSituations();
    fetchAllSituations();
  }, []);

  // 현재 페이지에서 사용하는 "상황 태그" 리스트
  const fetchSituations = async () => {
    try {
      const res = await axios.get<ISituation[]>(
        "http://localhost:3000/api/situation"
      );
      // 위 API는 상황들만 가져오는 용도 (아래 app.js 예시 참고)
      setSituations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 수정 모달에서 "상황 변경" 드롭다운에 사용될 전체 상황
  const fetchAllSituations = async () => {
    try {
      const res = await axios.get<ISituation[]>(
        "http://localhost:3000/api/situation"
      );
      setAllSituations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 상황 태그 클릭
  const handleTagClick = async (id: number) => {
    setSelectedSituationId(id);
    setMode("word"); // 상황 다시 선택 시, word 모드로 초기화

    try {
      // 상황별 단어/대화 가져오기
      const wordRes = await axios.get<IWord[]>(
        `http://localhost:3000/api/situations/${id}/words`
      );
      setWords(wordRes.data);

      const convRes = await axios.get<IConversation[]>(
        `http://localhost:3000/api/situations/${id}/conversations`
      );
      setConversations(convRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 토글: 단어 <-> 대화
  const handleModeToggle = (newMode: "word" | "conversation") => {
    setMode(newMode);
  };

  // 수정 버튼 클릭 → 모달 열기
  const handleEditClick = (
    type: "word" | "conversation",
    id: number,
    ko: string,
    fr: string,
    en: string | null,
    situation_id: number
  ) => {
    setIsModalOpen(true);
    setEditItem({ type, id, ko, fr, en, situation_id });
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  // 수정 모달 "저장" 버튼
  const handleEditSave = async () => {
    if (!editItem || !selectedSituationId) return;

    const { type, id, ko, fr, en, situation_id } = editItem;
    try {
      if (type === "word") {
        await axios.patch(`http://localhost:3000/api/words/${id}`, {
          ko,
          fr,
          en,
          situationId: situation_id, // 상황 변경 가능
        });
      } else {
        await axios.patch(`http://localhost:3000/api/conversations/${id}`, {
          ko,
          fr,
          en,
          situationId: situation_id,
        });
      }

      // 다시 데이터 불러오기
      handleTagClick(selectedSituationId);
      // 모달 닫기
      handleModalClose();
    } catch (error) {
      console.error(error);
      alert("수정 실패!");
    }
  };

  // 단어 -> 대화 이동 예시
  const handleMoveToConversation = async (word: IWord) => {
    console.log("word", word);
    if (!selectedSituationId) return;

    try {
      // 1) wordId 삭제
      await axios.delete(`http://localhost:3000/api/words/${word.id}`);
      // 2) conversation 테이블에 새로 insert
      await axios.post(
        `http://localhost:3000/api/situations/${selectedSituationId}/conversations`,
        {
          ko: word.ko,
          fr: word.fr,
          en: word.en,
        }
      );
      // 다시 로딩
      handleTagClick(selectedSituationId);
    } catch (error) {
      console.error(error);
    }
  };

  // 대화 -> 단어 이동 예시
  const handleMoveToWord = async (conv: IConversation) => {
    if (!selectedSituationId) return;

    try {
      // 1) convId 삭제
      await axios.delete(`http://localhost:3000/api/conversations/${conv.id}`);
      // 2) word 테이블에 새로 insert
      await axios.post(
        `http://localhost:3000/api/situations/${selectedSituationId}/words`,
        {
          ko: conv.ko,
          fr: conv.fr,
          en: conv.en,
        }
      );
      // 다시 로딩
      handleTagClick(selectedSituationId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="page3-container">
      <h1 className="page3-title">관리 페이지</h1>

      {/* 상황 태그 목록 */}
      <div className="tag-list">
        {situations.map((s) => (
          <button
            key={s.id}
            className={`btn btn-active btn-ghost tag-item 
              ${selectedSituationId === s.id ? "active" : ""}
            `}
            onClick={() => handleTagClick(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* 토글 버튼 */}
      {selectedSituationId && (
        <div className="toggle-buttons">
          <button
            className={mode === "word" ? "active" : ""}
            onClick={() => handleModeToggle("word")}
          >
            단어 보기
          </button>
          <button
            className={mode === "conversation" ? "active" : ""}
            onClick={() => handleModeToggle("conversation")}
          >
            대화 보기
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="hover">
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedSituationId && mode === "word" && (
        <div className="manage-content">
          <h2>단어 목록</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>한국어</th>
                <th>프랑스어</th>
                <th>영어</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {words.map((w) => (
                <tr key={w.id}>
                  <td>{w.ko}</td>
                  <td>{w.fr}</td>
                  <td>{w.en || ""}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleEditClick(
                          "word",
                          w.id,
                          w.ko,
                          w.fr,
                          w.en || null,
                          w.situation_id
                        )
                      }
                    >
                      수정
                    </button>
                    <button onClick={() => handleMoveToConversation(w)}>
                      대화로 이동
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSituationId && mode === "conversation" && (
        <div className="manage-content">
          <h2>대화 목록</h2>
          <table className="table">
            <thead className="test">
              <tr className="hover">
                <th>한국어</th>
                <th>프랑스어</th>
                <th>영어</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((c) => (
                <tr key={c.id}>
                  <td>{c.ko}</td>
                  <td>{c.fr}</td>
                  <td>{c.en || ""}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleEditClick(
                          "conversation",
                          c.id,
                          c.ko,
                          c.fr,
                          c.en || null,
                          c.situation_id
                        )
                      }
                    >
                      수정
                    </button>
                    <button onClick={() => handleMoveToWord(c)}>
                      단어로 이동
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSituationId && mode === "conversation" && (
        <div className="manage-content">
          <h2>대화 목록</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>한국어</th>
                <th>프랑스어</th>
                <th>영어</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((c) => (
                <tr key={c.id}>
                  <td>{c.ko}</td>
                  <td>{c.fr}</td>
                  <td>{c.en || ""}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleEditClick(
                          "conversation",
                          c.id,
                          c.ko,
                          c.fr,
                          c.en || null,
                          c.situation_id
                        )
                      }
                    >
                      수정
                    </button>
                    <button onClick={() => handleMoveToWord(c)}>
                      단어로 이동
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 수정 모달 */}
      {isModalOpen && editItem && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>수정하기</h3>
            <div className="modal-inputs">
              <label>한국어</label>
              <input
                value={editItem.ko}
                onChange={(e) =>
                  setEditItem({ ...editItem, ko: e.target.value })
                }
              />

              <label>프랑스어</label>
              <input
                value={editItem.fr}
                onChange={(e) =>
                  setEditItem({ ...editItem, fr: e.target.value })
                }
              />

              <label>영어</label>
              <input
                value={editItem.en || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, en: e.target.value })
                }
              />

              <label>상황 변경</label>
              <select
                value={editItem.situation_id}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    situation_id: Number(e.target.value),
                  })
                }
              >
                {allSituations.map((sit) => (
                  <option key={sit.id} value={sit.id}>
                    {sit.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-buttons">
              <button onClick={handleEditSave}>저장</button>
              <button onClick={handleModalClose}>취소</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
