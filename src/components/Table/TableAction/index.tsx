import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { createRef } from "react";
import { DropdownOptions, Dropdown } from "flowbite";

export interface TableActionItem {
  text: string;
  icon: React.ReactNode;
  action: () => void;
  disabled: boolean;
  visible: true | boolean;
  bodyCss?: string;
}

interface TableActionProps {
  index: string;
  actionItems:  TableActionItem[];
  onDropShow?: () => void;
  onDropHide?: () => void;
}

const TableAction: React.FC<TableActionProps> = ({ index, actionItems, onDropShow, onDropHide }) => {
  const dropDownRef = createRef<HTMLDivElement>();
  const buttonRef = createRef<HTMLButtonElement>();
  let dropDown: Dropdown | null = null;
  const options: DropdownOptions = {
    placement: "bottom",
    triggerType: "click",
    onHide: () => {
      onDropHide? onDropHide(): null;
    },
    onShow: () => {
      onDropShow? onDropShow(): null;
    },
  };

  useEffect(() => {
    if (dropDownRef.current && buttonRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dropDown = new Dropdown(dropDownRef.current, buttonRef.current, options);
    }
  }, [dropDownRef, buttonRef]);

  const showMenu = () => dropDown?.show();

  const hideMenu = () => dropDown?.hide();

  return (
    <>
      <button 
        ref={buttonRef}
        type="button"
        onClick={showMenu}
        id={`dropdown-button-${index}`}
        data-dropdown-toggle={`dropdown-${index}`}
        className="flex items-center cursor-pointer"
      >
        <BsThreeDots size={24} />
      </button>
      <div
        ref={dropDownRef}
        id={`dropdown-${index}`}
        // className="absolute border border-muted rounded-md z-10 right-0 top-full px-3 w-max bg-white"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-auto min-w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={`unit-dropdown-button-${index}`}
        >
          {actionItems?.filter((item)=>item.visible).map((item, index) => {
            return <li key={index}>
              <button disabled={item.disabled} onClick={item.action} className="w-full flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {item?.icon}
                {item?.text}
              </button>
            </li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default TableAction;
