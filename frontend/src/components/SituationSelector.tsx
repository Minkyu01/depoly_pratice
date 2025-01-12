"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface ISituation {
  id: number;
  name: string;
}

interface SituationSelectorProps {
  onSelectSituation: (id: number) => void;
}

export default function SituationSelector({
  onSelectSituation,
}: SituationSelectorProps) {
  const [situations, setSituations] = useState<ISituation[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");

  useEffect(() => {
    fetchSituations();
  }, []);

  const fetchSituations = async () => {
    try {
      const res = await axios.get<ISituation[]>(
        "http://localhost:3000/api/situation"
      );
      setSituations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedId(value);
    onSelectSituation(value);
    console.log("value", value);
  };

  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">상황 선택</span>
        </div>
        <select
          className="select select-bordered"
          value={selectedId}
          onChange={handleChange}
        >
          <option value="" disabled>
            -- 상황을 선택하세요 --
          </option>
          {situations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
