"use client";

import { useState } from "react";
import AddSituation from "@/components/AddSituation";
import AddWord from "@/components/AddWord";
import AddConversation from "@/components/AddConversation";
import ViewSituations from "@/components/ViewSituations";

export default function Test() {
  // 예시 상태
  const [visible, setVisible] = useState(true);

  return (
    <main className="flex flex-col items-center justify-center py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Board Page</h1>

      {/* 상황 추가 폼 */}
      <AddSituation />

      {/* 단어 추가 폼 */}
      <AddWord />

      {/* 대화 추가 폼 */}
      <AddConversation />

      {/* 상황 조회 */}
      <ViewSituations />
    </main>
  );
}
