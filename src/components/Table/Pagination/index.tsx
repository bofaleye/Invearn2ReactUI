"use client";

import React, { FC, ReactElement, useState } from "react";
import { NavState, PageState } from "./enum";
import { PagerLeft, PagerRight } from "@/assets";
import PageSize from "./PageSize";
import { PaginationProps } from "./model";

const Pagination: FC<PaginationProps> = ({
  pages,
  pageSize,
  rowsLength,
  _activeIndex = 1,
  _setActiveIndex,
  showPageSize,
  expand,
  handleExpand,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(_activeIndex);

  const setPage = (): ReactElement[] => {
    let limit = 0;
    if (pages > 5) {
      if (activeIndex <= pages - 4) {
        limit = activeIndex;
      } else {
        limit = pages - 4;
      }
    } else {
      limit = 1;
    }
    const pageComponents: ReactElement[] = [];
    for (let i = limit; i <= pages; i++) {
      if (
        pages > 5 &&
        i === activeIndex + 2 &&
        activeIndex + 2 < pages - 1 &&
        !expand
      ) {
        i = pages - 2;
        pageComponents.push(
          <span
            onClick={() => handleExpand(true)}
            key={"span"}
            className={PageState.INACTIVE}
          >
            ...
          </span>
        );
      } else {
        pageComponents.push(
          <div
            data-testid={"rob-table-navigation"}
            key={i}
            onClick={() => navigate(i)}
            className={
              activeIndex === i ? PageState.ACTIVE : PageState.INACTIVE
            }
          >
            {i}
          </div>
        );
      }
    }
    return pageComponents;
  };

  const navigate = (index: number): void => {
    handleExpand(false);
    setActiveIndex(index);
    _setActiveIndex(index);
  };

  return (
    <div className={"flex items-center justify-between pt-4 px-4"}>
      {showPageSize ? (
        <PageSize
          start={(activeIndex - 1) * pageSize + 1}
          end={
            activeIndex * pageSize < rowsLength
              ? activeIndex * pageSize
              : (activeIndex - 1) * pageSize +
                (rowsLength - (activeIndex - 1) * pageSize)
          }
          length={rowsLength}
        />
      ) : (
        <div></div>
      )}
      <div>
        <nav className={"inline-flex items-center -space-x-px cursor-pointer"}>
          <div
            onClick={() => activeIndex !== 1 && navigate(activeIndex - 1)}
            className={
              activeIndex === 1 ? NavState.LEFTINACTIVE : NavState.LEFTACTIVE
            }
          >
            <PagerLeft className="w-5 h-5" />
          </div>
          {setPage()}
          <div
            onClick={() => activeIndex !== pages && navigate(activeIndex + 1)}
            className={
              activeIndex === pages
                ? NavState.RIGHTINACTIVE
                : NavState.RIGHTACTIVE
            }
          >
            <PagerRight className="w-5 h-5" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
