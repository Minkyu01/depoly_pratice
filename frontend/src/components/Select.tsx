// "use client";
import { useState } from "react";

interface IDropdownItem {
  key: string;
  value: string;
}

interface IDropdownProps {
  title: string;
  data: IDropdownItem[];
  type?: string;
  onSelect: (value: string) => void;
}

export const Select = ({ data, type, onSelect }: IDropdownProps) => {
  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn m-1">
        {/* Click */}
        {type}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {data.map((item) => (
          <li key={item.key} value={item.value}>
            <a onClick={() => onSelect(item.value)}>{item.value}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
