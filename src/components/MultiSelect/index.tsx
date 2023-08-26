import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  SingleValue,
  StylesConfig,
} from "react-select";
import makeAnimated from "react-select/animated";

interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  closeMenuOnSelect?: boolean;
  label: string;
  placeholder: string;
  disabled?: boolean;
  options: Option[];
  isMulti?: IsMulti;
  group?: Group;
  components?: any;
  className?: string;
  value: MultiValue<Option> | SingleValue<Option>;
  required?:any;
  onChange: (
    option: IsMulti extends true ? MultiValue<Option> : SingleValue<Option>,
    { action, removedValue }: ActionMeta<any>
  ) => // actionMeta?: ActionMeta<Option>
  void;
}
const animatedComponents = makeAnimated();

const selectStyles: StylesConfig<any> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#F9F9F9",
    background: "#F9F9F9",
    fontFamily: "Poppins",
    fontSize: "14px",
    border: "1px solid #C4C4C4",
    boxShadow: "0 0 0 0px #484848",
    borderRadius: "0.5rem",
    maxHeight: "100%",
    width: "100%",
    maxWidth: "56rem",
    padding: "0.1rem ",
    letterSpacing: "0em",
    outline: "2px solid transparent",
    outlineOffset: "2px",
    margin:"0.5rem 0",
    ":hover": {
      ...styles[":hover"],
      border: "1px solid #C4C4C4",
      boxShadow: "0 0 0 0px #484848",
    },
    ":focus-within": {
      ...styles[":focus"],
      border: "1px solid #000000",
      boxShadow: "0 0 0 0px #000000",
    },
    ":focus": {
      ...styles[":focus"],
      border: "1px solid #000000",
      boxShadow: "0 0 0 0px #000000",
    },
  }),
  menu: (styles) => {
    return {
      ...styles,
      padding: "4px 8px",
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      minWidth: "50px",
    };
  },
  option: (styles) => {
    return {
      // ...styles,
      backgroundColor: "#fff",
      color: "#141414",
      fontFamily: "Poppins",
      padding: "6px 12px",
      fontSize: "12px",
      ":hover": {
        ...styles[":hover"],
        color: "#202020",
        borderRadius: "8px",
        backgroundColor: "#E0F8F6",
        cursor: "pointer",
        zIndex: 99,
      },
    };
  },
  input: (styles) => {
    return {
      ...styles,
      border: "none",
      // display:"none"
    };
  },
  indicatorSeparator: (styles) => {
    return {
      ...styles,
      border: "none",
      display: "none",
    };
  },
};



function MultiSelect<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
  const { label, disabled, components, className,required, ...rest } = props;
  return (
    <div className={`col-span-6 w-full my-5 ${className ?? ""}`}>
      <label className="relative items-center justify-center">
        {/* <div className="max-h-full w-full max-w-4xl rounded border px-3 py-3 font-body text-sm font-semibold tracking-normal outline-none placeholder:text-sm placeholder:font-normal placeholder:text-greyGrey04 focus:outline-none focus:ring-0"> */}
        <Select
          {...rest}
          components={components || animatedComponents}
          styles={selectStyles}
          name={label}
          isDisabled={disabled}
          // className="max-h-full w-full max-w-4xl rounded border px-3 py-3 font-body text-sm font-semibold tracking-normal outline-none placeholder:text-sm placeholder:font-normal placeholder:text-greyGrey04 focus:outline-none focus:ring-0"
          theme={(theme) => ({ ...theme, borderRadius: 4 })}
        />

        <div className="absolute bottom-11 left-0 flex pb-1">
          <span
            className="text-sm leading-[15px] font-medium text-gray-900"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </span>
        </div>
      </label>
    </div>
  );
}

export default MultiSelect;
