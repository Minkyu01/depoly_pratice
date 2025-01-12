import { notoSansKR } from "@/app/layout";

interface IChangeState {
  showWordInput: boolean;
  handleToggle: () => void;
}

export const ChangeState = ({ showWordInput, handleToggle }: IChangeState) => {
  return (
    <>
      {/* 토글 버튼 */}
      <div className="flex justify-center ">
        <label className="flex items-center cursor-pointer">
          {/* 라벨 */}
          <div className="flex flex-col gap-3">
            <div className={`mr-3 text-gray-700 font-bold text-sm`}>
              <span className="label-text">
                {showWordInput ? "단어" : "대화"}
              </span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={!showWordInput}
                onChange={handleToggle}
                // defaultChecked
              />
            </div>
          </div>
        </label>
      </div>
    </>
  );
};
