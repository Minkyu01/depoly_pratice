import { Dropdown } from "@/components/Dropdown";
import { TextInput } from "@/components/TextInput";

const caseList = [
  { key: "1", value: "음식점" },
  { key: "2", value: "인사" },
  { key: "3", value: "숙박" },
  { key: "4", value: "공항" },
  { key: "5", value: "쇼핑" },
  { key: "6", value: "코딩" },
  { key: "7", value: "길 묻기" },
  { key: "8", value: "기타" },
];

const langList = [
  { key: "1", value: "한국어" },
  { key: "2", value: "영어" },
  { key: "3", value: "불어" },
];

export const Test = () => {
  return (
    <div className="flex flex-col content-center items-center py-6 w-5/6 bg-lightGray gap-4 rounded-xl">
      <Dropdown />
      {langList.map((item) => (
        <TextInput key={item.key} info={item.value} />
      ))}

      <div className="bg-subColor px-2.5 py-2.5 rounded text-xl font-semibold ">
        제출
      </div>
    </div>
  );
};
