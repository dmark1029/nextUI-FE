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
