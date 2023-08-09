import type { SelectProps } from 'antd';
import { Select, Space } from 'antd';
import { FieldErrors, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
export interface ItemProps {
    label: string;
    value: string;
  }

export interface MultiSelectProps{
  label: string;
  options: Array<ItemProps>;
  errors:  string;
  required: boolean;
  name: string;
  defaultValue?: string[];
 onChange:  (values: string[])=> void
}
const MultiSelect =({ label, onChange, required, options, errors, defaultValue=[], ...props}: MultiSelectProps)=>{
    const selectProps: SelectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        options,
        placeholder: label,
        maxTagCount: 'responsive',
      };
      console.log(defaultValue);
    return(<div>
         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
        <Select defaultValue={[...defaultValue]} className='' {...selectProps} onChange={onChange}  {...props} status={errors? 'error': ""} size='large' />
                {errors && 
        <small className="text-red-500">
          <ErrorMessage errors={[{[props?.name]: errors}]} name={props?.name} />
        </small>
      }
           </div>)
}
export default MultiSelect;