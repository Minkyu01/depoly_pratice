"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Word {
  id: number;
  situation_id: number;
  ko: string;
  fr: string;
  en: string | null;
}

interface Conversation {
  id: number;
  situation_id: number;
  ko: string;
  fr: string;
  en: string | null;
}

interface Situation {
  id: number;
  name: string;
  words: Word[];
  conversations: Conversation[];
}

const ViewSituations = () => {
  const [situations, setSituations] = useState<Situation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSituations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Situation[]>(
        "http://localhost:3000/api/situation"
      );
      setSituations(response.data);
    } catch (err) {
      console.error(err);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSituations();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-4">
      <h2 className="text-xl font-bold mb-2">상황별 단어 및 대화 조회</h2>
      {loading && <p className="text-gray-500">로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading &&
        !error &&
        situations.map((situation) => (
          <div
            key={situation.id}
            className="border rounded p-4 mb-6 shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold mb-3">
              상황: {situation.name}
            </h3>

            {/* 단어 섹션 */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">단어</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">한국어</th>
                    <th className="border p-2">프랑스어</th>
                    <th className="border p-2">영어</th>
                  </tr>
                </thead>
                <tbody>
                  {situation.words.map((word) => (
                    <tr key={word.id} className="hover:bg-gray-50">
                      <td className="border p-2">{word.id}</td>
                      <td className="border p-2">{word.ko}</td>
                      <td className="border p-2">{word.fr}</td>
                      <td className="border p-2">{word.en || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 대화 섹션 */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">대화</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">한국어</th>
                    <th className="border p-2">프랑스어</th>
                    <th className="border p-2">영어</th>
                  </tr>
                </thead>
                <tbody>
                  {situation.conversations.map((conv) => (
                    <tr key={conv.id} className="hover:bg-gray-50">
                      <td className="border p-2">{conv.id}</td>
                      <td className="border p-2">{conv.ko}</td>
                      <td className="border p-2">{conv.fr}</td>
                      <td className="border p-2">{conv.en || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewSituations;
