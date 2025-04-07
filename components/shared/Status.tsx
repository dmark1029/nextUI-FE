import React, { forwardRef, memo } from "react";
import { cn } from "@heroui/react";
import { DangerCircleSvg } from "../shared/danger-circle";
import { DefaultCircleSvg } from "../shared/default-circle";
import { SuccessCircleSvg } from "../shared/success-circle";
import { WarningCircleSvg } from "../shared/warning-circle";

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
] as const;

export type StatusOptions = (typeof statusOptions)[number]["name"];

export const statusColorMap: Record<StatusOptions, JSX.Element> = {
  Active: SuccessCircleSvg,
  Inactive: DefaultCircleSvg,
  Paused: DangerCircleSvg,
  Vacation: WarningCircleSvg,
};

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  status: StatusOptions;
}

export const Status = memo(
  forwardRef<HTMLDivElement, StatusProps>((props, forwardedRef) => {
    const { className, status } = props;
    const statusColor = statusColorMap[status];

    return (
      <div
        ref={forwardedRef}
        className={cn(
          "flex w-fit items-center gap-[2px] rounded-lg bg-default-100 px-2 py-1 justify-around",
          className,
        )}
      >
        {statusColor}
        <span className="px-1 text-default-800">{status}</span>
      </div>
    );
  }),
);

Status.displayName = "Status";
