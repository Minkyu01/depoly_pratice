interface IDropdownItem {
  key: string;
  value: string;
}

interface IDropdownProps {
  title: string;
  data: IDropdownItem[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export const Dropdown = ({ title, data }: IDropdownProps) => {
  return (
    <label className="form-control w-full max-w-28">
      <div className="label">
        <span className="label-text">{title}</span>
        {/* <span className="label-text-alt">Alt label</span> */}
      </div>
      <select className="select select-bordered">
        <option disabled selected>
          Pick one
        </option>
        {data.map((item) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      {/* <div className="label">
        <span className="label-text-alt">Alt label</span>
        <span className="label-text-alt">Alt label</span>
      </div> */}
    </label>
  );
};
