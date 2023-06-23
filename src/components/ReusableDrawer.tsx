"use client";

import { initModals } from "flowbite";
import FormButton from "./FormElements/FormButton";
import {
  ForwardRefRenderFunction,
  createRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Drawer } from "flowbite";
import type { DrawerOptions, DrawerInterface } from "flowbite";

export interface DrawerProps {
  drawerId: string;
  placement: string;
  drawerTitle: string;
  subTitle?: string;
  children: any;
  onDrawerHide?: () => void;
}

export interface ReusableDrawerRef {
  showDrawer: () => void;
  hideDrawer: () => void;
}

const _ReusableDrawer: ForwardRefRenderFunction<
  ReusableDrawerRef,
  DrawerProps
> = (props, ref) => {
  const { drawerId, placement, drawerTitle, subTitle, children, onDrawerHide } =
    props;

  const drawerRef = createRef<HTMLDivElement>();
  let drawer: Drawer | null = null;
  const options: DrawerOptions = {
    placement: "right",
    // backdrop: true,
    // bodyScrolling: false,
    // edge: false,
    // edgeOffset: '',
    // backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
    onHide: () => {
      if (onDrawerHide) {
        onDrawerHide();
      }
    },
    // onShow: () => {
    //     console.log('drawer is shown');
    // },
    // onToggle: () => {
    //     console.log('drawer has been toggled');
    // }
  };

  useImperativeHandle(ref, () => ({
    showDrawer,
    hideDrawer,
  }));

  useEffect(() => {
    if (drawerRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      drawer = new Drawer(drawerRef.current, options);
    }
  }, [drawerRef]);

  const showDrawer = () => {
    drawer?.show();
  };

  const hideDrawer = () => {
    drawer?.hide();
  };
  return (
    <div
      ref={drawerRef}
      id={drawerId}
      className={`fixed top-0 ${placement}-0 z-40 h-screen transition-transform translate-x-full bg-white w-2/5 dark:bg-gray-800 overflow-y-scroll no-scrollbar`}
      aria-labelledby={drawerId}
      tabIndex={-1}
    >
      <div className="flex items-center justify-between px-10 py-4 mb-5 border-b border-gray-200 dark:border-gray-700">
        <h5
          id={`${drawerId}-label`}
          className="inline-flex items-center text-xl font-bold text-gray-900 dark:text-gray-400"
        >
          {drawerTitle}
        </h5>

        <button
          type="button"
          onClick={hideDrawer}
          data-drawer-hide={drawerId}
          aria-controls={drawerId}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L13 13.5M1 13.5L13 1.5L1 13.5Z"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <div className="px-10">
        <div className="col-span-6 sm:col-full mb-4">
          <h5
            id="drawer-right-label"
            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400"
          >
            {subTitle}
          </h5>
        </div>
        {children}
      </div>
    </div>
  );
};

const ReusableDrawer = forwardRef<ReusableDrawerRef, DrawerProps>(
  _ReusableDrawer
);
export default ReusableDrawer;
