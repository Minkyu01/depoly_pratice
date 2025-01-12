"use strict";
import { useState } from "react";

export default function Board() {
  // 예시 문장 데이터
  const sentences = [
    {
      english:
        "I would like to schedule a meeting to discuss the quarterly results.",
      korean: "분기 실적 보고를 논의하기 위해 회의를 잡고 싶습니다.",
    },
    {
      english:
        "I would like to schedule a meeting to discuss the quarterly results.",
      korean: "분기 실적 보고를 논의하기 위해 회의를 잡고 싶습니다.",
    },
    {
      english:
        "I would like to schedule a meeting to discuss the quarterly results.",
      korean: "분기 실적 보고를 논의하기 위해 회의를 잡고 싶습니다.",
    },
  ];

  // 한국어 문장 표시 여부 관리
  const [revealed, setRevealed] = useState(Array(sentences.length).fill(false));

  // 체크박스 클릭 시 해당 문장 한국어 표시 토글
  const handleToggle = (index) => {
    setRevealed((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 font-sans">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Language Study</h1>
        <p className="text-sm text-gray-600">Total Words: 150</p>
      </div>

      {/* 컨텍스트/진행 바 영역 */}
      <div className="flex items-center justify-between mb-4">
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>Select Context</option>
          <option>Business</option>
          <option>Travel</option>
          <option>Daily</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm">5/20</span>
          <div className="relative w-24 h-2 bg-gray-200 rounded">
            <div
              className="absolute left-0 top-0 h-full bg-blue-500 rounded"
              style={{ width: "25%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* 문장 카드 */}
      {sentences.map((sentence, index) => (
        <div key={index} className="border border-gray-300 rounded p-3 mb-3">
          <p className="text-base mb-2">{`"${sentence.english}"`}</p>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id={`check-${index}`}
              checked={revealed[index]}
              onChange={() => handleToggle(index)}
            />
            <label htmlFor={`check-${index}`} className="text-sm">
              확인
            </label>
            <button className="ml-auto text-xl">
              <span role="img" aria-label="audio">
                🔊
              </span>
            </button>
          </div>
          {/* 체크박스 true 시 한국어 문장 표시 */}
          {revealed[index] && (
            <p className="italic text-gray-700 text-sm">{sentence.korean}</p>
          )}
        </div>
      ))}

      {/* 이전/다음 버튼 */}
      <div className="flex justify-between mb-4">
        <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
          Previous
        </button>
        <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">
          Next &rarr;
        </button>
      </div>

      {/* 하단 메뉴 (예시) */}
      <div className="flex justify-around border-t border-gray-200 pt-3">
        <button className="text-blue-500 text-sm hover:underline">Study</button>
        <button className="text-blue-500 text-sm hover:underline">
          Progress
        </button>
        <button className="text-blue-500 text-sm hover:underline">Saved</button>
      </div>
    </div>
  );
}

// import { Select } from "@/components/Select";
// import { TextInput } from "@/components/TextInput";
// import { caseList, langList } from "@/constants/mock";
// import { lang } from "@/constants/type";
// import { useState } from "react";

// export default function Board() {
//   const [type, setType] = useState<string>("상황");

//   const handleSelect = (value: string) => {
//     setType(value);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center py-28 px-4">
//       <div className="w-10/12 max-w-2xl flex flex-col items-start justify-center">
//         <div className="w-full flex justify-between">
//           <Select
//             data={caseList}
//             onSelect={handleSelect}
//             type={type}
//             title={"상황 선택"}
//           />
//           <div className="stat w-auto">
//             {/* <div className="stat-figure text-secondary">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block h-8 w-8 stroke-current"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 ></path>
//               </svg>
//             </div> */}
//             {/* <div className="stat-title">Downloads</div> */}
//             <div className="stat-value">2 / 43</div>
//             {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
//           </div>
//         </div>

//         {lang.map((item) => (
//           <TextInput key={item.key} type={item.value} />
//         ))}

//         {/* 버튼 그룹 */}
//         <div className="flex justify-end w-full mt-4">
//           <button className="btn btn-outline btn-accent">Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// }
