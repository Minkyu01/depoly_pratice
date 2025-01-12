"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Situation {
  id: number;
  name: string;
}

const AddConversation = () => {
  const [situations, setSituations] = useState<Situation[]>([]);
  const [situationId, setSituationId] = useState<number | "">("");
  const [ko, setKo] = useState("");
  const [fr, setFr] = useState("");
  const [en, setEn] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSituations();
  }, []);

  const fetchSituations = async () => {
    try {
      const response = await axios.get<Situation[]>(
        "http://localhost:3000/api/situation"
      );
      console.log(response.data);
      setSituations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situationId || !ko || !fr) {
      setMessage("필수 필드를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/situations/${situationId}/conversations`,
        {
          ko,
          fr,
          en: en || null,
        }
      );
      setMessage("대화가 추가되었습니다.");
      setKo("");
      setFr("");
      setEn("");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("대화 추가 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-sm mx-auto my-4 p-4 border border-gray-300 rounded"
    >
      <label className="mb-1 font-semibold">상황 선택</label>
      <select
        value={situationId}
        onChange={(e) => setSituationId(Number(e.target.value))}
        className="border rounded p-2 mb-3"
      >
        <option value="">-- 상황을 선택하세요 --</option>
        {situations.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <label className="mb-1 font-semibold">한국어 대화</label>
      <textarea
        value={ko}
        onChange={(e) => setKo(e.target.value)}
        className="border rounded p-2 mb-3"
        rows={3}
      />

      <label className="mb-1 font-semibold">프랑스어 대화</label>
      <textarea
        value={fr}
        onChange={(e) => setFr(e.target.value)}
        className="border rounded p-2 mb-3"
        rows={3}
      />

      <label className="mb-1 font-semibold">영어 대화 (선택)</label>
      <textarea
        value={en}
        onChange={(e) => setEn(e.target.value)}
        className="border rounded p-2 mb-3"
        rows={3}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        // onClick={fetchSituations}
      >
        추가하기
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("오류") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default AddConversation;
