import { notoSansKR } from "@/app/layout";

export const TextInput = ({ type }: { type: string }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{type}</span>
        {/* <span className="label-text-alt">Top Right label</span> */}
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-full"
      />
    </label>
  );
};
