import { Button, Tooltip } from "@heroui/react";
import React, { forwardRef, memo, useMemo } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  textClassName?: string;
  copyText?: string;
  children: string;
}

export const CopyIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5"
      fill="currentColor"
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
    </svg>
  );
};

export const CopyDoneIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
      fill="none"
      viewBox="0 0 16 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.917 5.724 10.5 15 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const CopyText = memo(
  forwardRef<HTMLDivElement, CopyTextProps>((props, forwardedRef) => {
    const { className, textClassName, children, copyText = "Copy" } = props;
    const [copied, setCopied] = React.useState(false);
    const [copyTimeout, setCopyTimeout] = React.useState<ReturnType<
      typeof setTimeout
    > | null>(null);
    const onClearTimeout = () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
    };

    const handleClick = () => {
      onClearTimeout();
      navigator.clipboard.writeText(children);
      setCopied(true);

      setCopyTimeout(
        setTimeout(() => {
          setCopied(false);
        }, 3000),
      );
    };

    const content = useMemo(
      () => (copied ? "Copied" : copyText),
      [copied, copyText],
    );

    return (
      <div
        ref={forwardedRef}
        className={cn("flex items-center gap-3 text-default-500", className)}
      >
        <span className={textClassName}>{children}</span>
        <Tooltip className="text-foreground" content={content}>
          <Button
            isIconOnly
            className="h-7 w-7 min-w-7 text-default-400"
            size="sm"
            variant="light"
            onPress={handleClick}
          >
            {!copied && (
              <Icon className="h-[14px] w-[14px]" icon="solar:copy-linear" />
            )}
            {copied && (
              <Icon
                className="h-[14px] w-[14px]"
                icon="solar:check-read-linear"
              />
            )}
          </Button>
        </Tooltip>
      </div>
    );
  }),
);

CopyText.displayName = "CopyText";
