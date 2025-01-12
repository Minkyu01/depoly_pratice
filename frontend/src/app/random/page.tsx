"use client";
import { Select } from "@/components/Select";
import { caseList } from "@/constants/mock";
import { useState } from "react";

export default function Random() {
  const [type, setType] = useState<string>("상황");
  const [showContent, setShowContent] = useState<boolean>(false); // 상태 변수 추가

  const handleSelect = (value: string) => {
    setType(value);
  };

  const handleToggleContent = () => {
    setShowContent(!showContent); // 클릭 시 상태 변경
  };

  return (
    <div className="flex flex-col items-center justify-center py-28 px-4">
      <div className="w-10/12 max-w-2xl flex flex-col items-start justify-center">
        <div className="flex w-full flex-col">
          {/* korea */}
          <div className="label text-base">
            <span className="label-text">korea</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </div>
          <div className="card bg-base-300 rounded-box grid min-h-20 place-items-center px-3 break-words py-2">
            Je asf wefawef a faw faweflbaw fa faiowef jawef awelf ale falf
            awehfa awjelfhawf akwlefj klaweflka wfawf elawf awefaw kjfha fawlef
            alwefal kjawle fal f
          </div>
          <div className="divider"></div>
          {/* korea */}
          <div className="label text-base">
            <span className="label-text">français</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </div>
          {/* france */}
          <div
            className="card bg-base-300 rounded-box grid min-h-20 place-items-center px-3 break-words py-2 cursor-pointer"
            onClick={handleToggleContent} // 클릭 이벤트 핸들러 추가
          >
            {showContent ? "content" : "touch!!"} {/* 상태에 따라 내용 변경 */}
          </div>
        </div>
      </div>
    </div>
  );
}
