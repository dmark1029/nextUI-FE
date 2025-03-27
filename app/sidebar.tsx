"use client";
import SidebarDrawer from "@/components/sidebar/sidebar-drawer";
import { Avatar, Button, cn, ScrollShadow, Spacer, Tooltip, useDisclosure } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { AcmeIcon } from "./signin/acme";
import { Icon } from "@iconify/react";
import SubSidebar from "@/components/sidebar/sidebar";
import messagingSidebarItems from "@/components/sidebar/messaging-sidebar-items";

export default function Sidebar() {
  const [[page, direction], setPage] = useState([0, 0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isOpen: isProfileSidebarOpen, onOpenChange: onProfileSidebarOpenChange } = useDisclosure();

  const isCompact = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);
  const [isSignInPage, setIsSignInPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    setIsSignInPage(pathname.includes("signin"));
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage((prev) => {
        if (!isCompact) return prev;

        const currentPage = prev[0];

        if (currentPage < 0 || currentPage > 2) return [currentPage, prev[1]];

        return [currentPage + newDirection, newDirection];
      });
    },
    [isCompact],
  );
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    console.log('123', currentPath)
    setCurrentPath(window.location.pathname);
  }, []);

  if (isSignInPage) {
    return null;
  }

  return (
    !isSignInPage && (
      <SidebarDrawer
        className={cn("min-w-[288px]", { "min-w-[76px]": isCollapsed })}
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <div
          className={cn(
            "will-change relative flex h-full max-h-screen w-72 flex-col bg-default-100 p-6 transition-width",
            {
              "w-[83px] items-center px-[6px] py-6 4444": isCollapsed,
            },
          )}
        >
          <div
            className={cn("flex items-center gap-3 pl-2", {
              "justify-center gap-0 pl-0": isCollapsed,
            })}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
              <AcmeIcon className="text-background" />
            </div>
            <span
              className={cn("w-full text-base font-bold uppercase opacity-100", {
                "w-0 opacity-0": isCollapsed,
              })}
            >
              TaoMaker
            </span>
            <div className={cn("flex-end flex", { hidden: isCollapsed })}>
              <Icon
                className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                icon="solar:round-alt-arrow-left-line-duotone"
                width={24}
                onClick={isMobile ? onOpenChange : onToggle}
              />
            </div>
          </div>
          <Spacer y={6} />
          <div className="flex items-center gap-3 px-3">
            <Avatar
              isBordered
              size="sm"
              src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg"
            />
            <div className={cn("flex max-w-full flex-col", { hidden: isCollapsed })}>
              <p className="text-small font-medium text-foreground">Kate Moore</p>
              <p className="text-tiny font-medium text-default-400">Customer Support</p>
            </div>
          </div>

          <Spacer y={6} />
          <ScrollShadow className="-mr-6 h-full max-h-full py-6 w-full">
            <SubSidebar
              defaultSelectedKey=""
              iconClassName="group-data-[selected=true]:text-default-50"
              isCompact={isCollapsed}
              itemClasses={{
                base: "px-3 rounded-large data-[selected=true]:bg-foreground dark:data-[selectable=true]:focus:bg-white data-[selectable=true]:focus:bg-default-700 dark:data-[selectable=true]:focus:text-black data-[selectable=true]:focus:text-white",
                title: "group-data-[selected=true]:text-default-50",
              }}
              items={messagingSidebarItems.map((item) => ({
                ...item,
                className: currentPath.includes(item.href ?? "") ? "dark:data-[selectable=true]:bg-white dark:data-[selectable=true]:text-black data-[selectable=true]:bg-default-700 data-[selectable=true]:text-white" : "", // Highlight selected item
              }))}
            />
          </ScrollShadow>

          <Spacer y={8} />

          <div
            className={cn("mt-auto flex flex-col", {
              "items-center": isCollapsed,
            })}
          >
            {isCollapsed && (
              <Button
                isIconOnly
                className="flex h-10 w-10 text-default-600"
                size="sm"
                variant="light"
                onPress={() => paginate && paginate(page - 1)}
              >
                <Icon
                  className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                  height={24}
                  icon="solar:round-alt-arrow-right-line-duotone"
                  width={24}
                  onClick={onToggle}
                />
              </Button>
            )}
            <Tooltip content="Support" isDisabled={!isCollapsed} placement="right">
              <Button
                fullWidth
                className={cn(
                  "justify-start truncate text-default-600 data-[hover=true]:text-foreground",
                  {
                    "justify-center": isCollapsed,
                  },
                )}
                isIconOnly={isCollapsed}
                startContent={
                  isCollapsed ? null : (
                    <Icon
                      className="flex-none text-default-600"
                      icon="solar:info-circle-line-duotone"
                      width={24}
                    />
                  )
                }
                variant="light"
              >
                {isCollapsed ? (
                  <Icon
                    className="text-default-500"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                ) : (
                  "Support"
                )}
              </Button>
            </Tooltip>
            <Tooltip content="Log Out" isDisabled={!isCollapsed} placement="right">
              <Button
                className={cn("justify-start text-default-500 data-[hover=true]:text-foreground", {
                  "justify-center": isCollapsed,
                })}
                isIconOnly={isCollapsed}
                startContent={
                  isCollapsed ? null : (
                    <Icon
                      className="flex-none rotate-180 text-default-500"
                      icon="solar:minus-circle-line-duotone"
                      width={24}
                    />
                  )
                }
                variant="light"
              >
                {isCollapsed ? (
                  <Icon
                    className="rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                ) : (
                  "Log Out"
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </SidebarDrawer>
    )

  )
};