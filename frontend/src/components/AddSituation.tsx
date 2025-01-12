"use client";

import React, { useState } from "react";
import axios from "axios";

const AddSituation = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setMessage("상황 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/situations",
        {
          name,
        }
      );
      setMessage(`상황 "${response.data.name}"이(가) 추가되었습니다.`);
      setName("");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("상황 추가 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-sm mx-auto my-4 p-4 border border-gray-300 rounded"
    >
      <label className="mb-1 font-semibold">상황 이름</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded p-2 mb-3"
        placeholder="예: 음식"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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

export default AddSituation;
