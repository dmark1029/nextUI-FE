"use client";

import type { Selection, SortDescriptor } from "@heroui/react";
import type { ColumnsKey, Opex } from "./data";
import type { Key } from "@react-types/shared";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  RadioGroup,
  Radio,
  Chip,
  Pagination,
  Divider,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Alert,
  Textarea,
} from "@heroui/react";
import { CopyIcon, SearchIcon } from "@heroui/shared-icons";
import React, { useMemo, useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import { ArrowDownIcon } from "../shared/arrow-down";
import { ArrowUpIcon } from "../shared/arrow-up";
import { useMemoizedCallback } from "../shared/use-memoized-callback";
import { CopyDoneIcon } from "../shared/copy-text";

import { columns, INITIAL_VISIBLE_COLUMNS } from "./data";

interface OpexProp {
  opexData: Opex[];
}

export default function OpexTable({ opexData }: OpexProp) {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [copiedValue, setCopiedValue] = useState<string>("");

  const showSubnetDetails = (item: any) => {
    console.log("detail", item);
    setCopiedValue("");
    setSelectedRow(item);
    showInstanceDetailModal();
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setTimeout(() => {
      setCopiedValue(code);
    }, 1000);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isRemoveModalOpen,
    onOpenChange: onRemoveModalChange,
    onOpenChange: onPermissionModalChange,
    isOpen: isPermissionModalOpen,
  } = useDisclosure();

  const {
    isOpen: isOpexDetailModalOpen,
    onOpenChange: onShowOpexDetail,
    onClose: closeOpexDetailModal,
    onOpen: showInstanceDetailModal,
  } = useDisclosure();

  const {
    isOpen: isShowCreateNewSubnetModal,
    onOpenChange: onCreateNewSubnetModal,
    onClose: closeCreateNewSubnetModal,
    onOpen: showCreateNewSubnetModal,
  } = useDisclosure();

  const [mockUsers, setMockUsers] = useState([
    {
      id: 1,
      name: "Josh",
      instanceRead: true,
      instanceWrite: false,
      instanceDelete: false,
      minerRead: false,
      minerWrite: true,
      minerDelete: false,
    },
  ]);
  const handleToggle = (userId: number, field: keyof (typeof mockUsers)[0]) => {
    setMockUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: !user[field] } : user,
      ),
    );
  };

  const [backdrop, setBackdrop] = React.useState<
    "blur" | "transparent" | "opaque"
  >("blur");

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "username",
    direction: "ascending",
  });
  const [workerTypeFilter, setWorkerTypeFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [startDateFilter, setStartDateFilter] = React.useState("all");
  // const [avatar, setAvatar] = useState(null);
  // test

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns
      .map((item: any) => {
        if (item.uid === sortDescriptor.column) {
          return {
            ...item,
            sortDirection: sortDescriptor.direction,
          };
        }

        return item;
      })
      .filter((column: any) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  const itemFilter = useCallback(
    (col: Opex) => {
      let allWorkerType = workerTypeFilter === "all";
      let allStartDate = startDateFilter === "all";

      return allWorkerType && allStartDate;
    },
    [startDateFilter, workerTypeFilter],
  );

  const filteredItems = useMemo(() => {
    let filteredWallets = [...opexData];

    if (filterValue) {
      filteredWallets = filteredWallets.filter((wallet) =>
        wallet.subnetName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    filteredWallets = filteredWallets.filter(itemFilter);

    return filteredWallets;
  }, [filterValue, itemFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Opex, b: Opex) => {
      const col = sortDescriptor.column as keyof Opex;

      let first = a[col];
      let second = b[col];
      let cmp;

      cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const filterSelectedKeys = useMemo(() => {
    if (selectedKeys === "all") return selectedKeys;
    let resultKeys = new Set<Key>();

    if (filterValue) {
      filteredItems.forEach((item) => {
        const stringId = String(item.id);

        if ((selectedKeys as Set<string>).has(stringId)) {
          resultKeys.add(stringId);
        }
      });
    } else {
      resultKeys = selectedKeys;
    }

    return resultKeys;
  }, [selectedKeys, filteredItems, filterValue]);

  const getMemberInfoProps = useMemoizedCallback(() => ({
    onClick: handleMemberClick,
  }));

  const openModal = () => {
    showCreateNewSubnetModal();
  };

  const renderCell = useMemoizedCallback((opex: Opex, columnKey: React.Key) => {
    const opexKey = columnKey as ColumnsKey;
    const cellValue = opex[
      opexKey as unknown as keyof Opex
    ] as unknown as string;

    switch (opexKey) {
      case "subnetName":
        return <div className="text-default-foreground">{cellValue}</div>;
      case "opexBalance":
        return <div className="text-default-foreground">{cellValue}</div>;
      case "opexStakedAlpha":
        return <div className="text-default-foreground">{cellValue}</div>;
      case "opexWallet":
        return <div className="text-default-foreground">{cellValue}</div>;
      case "totalCollectableAlpha":
        return <div className="text-default-foreground">{cellValue}</div>;
      case "userSubnets":
        return (
          <div className="float-start flex gap-1">
            {opex[opexKey].map((wallet: any, index: number) => {
              if (index < 3) {
                return (
                  <Chip
                    key={wallet}
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                    color="primary"
                    size="sm"
                    variant="bordered"
                  >
                    {wallet}
                  </Chip>
                );
              }
              if (index < 4) {
                return (
                  <Chip
                    key={wallet}
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                    color="primary"
                    size="sm"
                    variant="bordered"
                  >
                    {`+${wallet.length - 3}`}
                  </Chip>
                );
              }

              return null;
            })}
          </div>
        );

      case "autoCollect":
        return <Checkbox isSelected={Boolean(cellValue)} />;
      default:
        return cellValue;
    }
  });

  const onNextPage = useMemoizedCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  });

  const onPreviousPage = useMemoizedCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  });

  const onSearchChange = useMemoizedCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  });

  const onSelectionChange = useMemoizedCallback((keys: Selection) => {
    if (keys === "all") {
      if (filterValue) {
        const resultKeys = new Set(
          filteredItems.map((item) => String(item.id)),
        );

        setSelectedKeys(resultKeys);
      } else {
        setSelectedKeys(keys);
      }
    } else if (keys.size === 0) {
      setSelectedKeys(new Set());
    } else {
      const resultKeys = new Set<Key>();

      keys.forEach((v) => {
        resultKeys.add(v);
      });
      const selectedValue =
        selectedKeys === "all"
          ? new Set(filteredItems.map((item) => String(item.id)))
          : selectedKeys;

      selectedValue.forEach((v) => {
        if (items.some((item) => String(item.id) === v)) {
          return;
        }
        resultKeys.add(v);
      });
      setSelectedKeys(new Set(resultKeys));
    }
  });

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center gap-4 overflow-auto px-[6px] py-[4px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <Input
              className="min-w-[200px]"
              endContent={
                <SearchIcon className="text-default-400" width={16} />
              }
              placeholder="Search"
              size="sm"
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <div>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:tuning-2-linear"
                        width={16}
                      />
                    }
                  >
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex w-full flex-col gap-6 px-2 py-4">
                    <RadioGroup
                      label="Role"
                      value={workerTypeFilter}
                      onValueChange={setWorkerTypeFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="employee">Employee</Radio>
                      <Radio value="contractor">Contractor</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Status"
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="active">Active</Radio>
                      <Radio value="inactive">Inactive</Radio>
                      <Radio value="paused">Paused</Radio>
                      <Radio value="vacation">Vacation</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Start Date"
                      value={startDateFilter}
                      onValueChange={setStartDateFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="last7Days">Last 7 days</Radio>
                      <Radio value="last30Days">Last 30 days</Radio>
                      <Radio value="last60Days">Last 60 days</Radio>
                    </RadioGroup>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter(
                    (c: any) =>
                      !["actions", "teams", "permission"].includes(c.uid),
                  )}
                >
                  {(item: any) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === "ascending"
                              ? "descending"
                              : "ascending",
                        });
                      }}
                    >
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={columns.filter(
                    (c: any) => !["actions"].includes(c.uid),
                  )}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item: any) => (
                    <DropdownItem key={item.uid}>{item.name}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Divider className="h-5" orientation="vertical" />
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    filterSelectedKeys,
    headerColumns,
    sortDescriptor,
    statusFilter,
    workerTypeFilter,
    startDateFilter,
    setWorkerTypeFilter,
    setStatusFilter,
    setStartDateFilter,
    onSearchChange,
    setVisibleColumns,
  ]);

  const topBar = useMemo(() => {
    return (
      <div className="mb-[18px] flex items-center justify-between">
        <div className="flex w-[226px] items-center gap-2">
          <h1 className="text-2xl font-[800] leading-[32px]">OpEx</h1>
          <Chip
            className="hidden items-center text-default-500 sm:flex"
            size="sm"
            variant="flat"
          >
            {opexData.length}
          </Chip>
        </div>
        <div className="flex items-center gap-2">
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            variant="shadow"
          >
            Sync
          </Button>
        </div>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-between gap-2 px-2 py-2 sm:flex-row">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex items-center justify-end gap-6">
          <span className="text-small text-default-400">
            {filterSelectedKeys === "all"
              ? "All items selected"
              : `${filterSelectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <div className="flex items-center gap-3">
            <Button
              isDisabled={page === 1}
              size="sm"
              variant="flat"
              onPress={onPreviousPage}
            >
              Previous
            </Button>
            <Button
              isDisabled={page === pages}
              size="sm"
              variant="flat"
              onPress={onNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterSelectedKeys,
    page,
    pages,
    filteredItems.length,
    onPreviousPage,
    onNextPage,
  ]);

  const handleMemberClick = useMemoizedCallback(() => {
    setSortDescriptor({
      column: "username",
      direction:
        sortDescriptor.direction === "ascending" ? "descending" : "ascending",
    });
  });

  return (
    <div className="h-full w-full p-6">
      {topBar}

      {/* Create New Wallet Modal */}
      <Modal
        backdrop={backdrop}
        classNames={{
          body: "rounded-[15px] border-1 m-[9px] m-5 py-5",
        }}
        isDismissable={false}
        isOpen={isShowCreateNewSubnetModal}
        placement="top-center"
        size="2xl"
        onOpenChange={onCreateNewSubnetModal}
      >
        <ModalContent>
          {(closeCreateNewSubnetModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Wallet
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap justify-end items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    key="wallet_name"
                    isRequired
                    label="Wallet Name"
                    type="text"
                  />

                  <Input
                    key="wallet_hotkey"
                    isRequired
                    label="Wallet Hotkey"
                    type="text"
                  />
                </div>
                <Textarea
                  disableAnimation
                  disableAutosize
                  isRequired
                  classNames={{
                    input: "resize-y min-h-[40px]",
                  }}
                  label="Description"
                  variant="bordered"
                />
                <div className="flex w-full flex-wrap justify-end items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input key="uid" isRequired label="UID" type="text" />
                  <Checkbox
                    classNames={{
                      label: "text-small",
                      base: cn(
                        "w-1/2 max-w-md",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary",
                      ),
                    }}
                    isSelected={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  >
                    Generate
                  </Checkbox>
                </div>
                {!isChecked && (
                  <div className="flex w-full flex-wrap justify-end items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      key="coldkey_seed"
                      isRequired
                      label="Coldkey Seed"
                      type="text"
                    />

                    <Input
                      key="hotkey_seed"
                      isRequired
                      label="Hotkey Seed"
                      type="text"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-center items-center">
                <Button color="primary" onPress={closeCreateNewSubnetModal}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop={backdrop}
        isDismissable={false}
        isOpen={isRemoveModalOpen}
        placement="top-center"
        onOpenChange={onRemoveModalChange}
      >
        <ModalContent>
          {(onRemoveModalClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <Alert
                  description="Are you sure you want to delete this user?"
                  variant="faded"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onRemoveModalClose}
                >
                  Close
                </Button>
                <Button color="primary" onPress={onRemoveModalClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Opex Detail Modal */}

      <Modal
        backdrop={backdrop}
        isDismissable={false}
        isOpen={isOpexDetailModalOpen}
        placement="top-center"
        size="2xl"
        onOpenChange={onShowOpexDetail}
      >
        <ModalContent>
          {(closeOpexDetailModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                OpEx Detail
              </ModalHeader>
              <ModalBody className="border-1 rounded-lg mx-4 p-4 gap-5">
                <div className="flex w-full items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[110px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    OpEx Balance:
                  </label>
                  <Input
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">tao</span>
                      </div>
                    }
                    labelPlacement="outside-left"
                    name="opexBalance"
                    type="number"
                    value={selectedRow.opexBalance}
                    variant="flat"
                  />
                  at
                  <Input
                    isReadOnly
                    className="max-w-[130px]"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    name="walletHotkey"
                    type="number"
                    value={selectedRow.opexBalance}
                    variant="flat"
                  />
                  <Button
                    className="text-sm min-w-[110px]"
                    color="danger"
                    onPress={closeOpexDetailModal}
                  >
                    Sync
                  </Button>
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[110px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Staked Alpha:
                  </label>
                  <Input
                    name="opex_staked_alpha"
                    type="number"
                    value={selectedRow.opexStakedAlpha}
                    variant="flat"
                  />
                  <Button
                    className="text-sm min-w-[110px]"
                    color="primary"
                    onPress={closeOpexDetailModal}
                  >
                    Upgrade
                  </Button>
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[110px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    OpEx Wallet:
                  </label>
                  <Input
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={() => copyCode(selectedRow.opexWallet)}
                      >
                        {selectedRow.opexWallet === copiedValue ? (
                          <CopyDoneIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <CopyIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    name="walletHotkey"
                    type="text"
                    value={selectedRow.opexWallet}
                    variant="flat"
                  />
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[180px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Total Collectable Alpha:
                  </label>
                  <Input
                    name="total_collectable_alpha"
                    type="number"
                    value={selectedRow.totalCollectableAlpha}
                    variant="flat"
                  />
                  <label
                    className="min-w-[200px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Total Collectable Wallets:
                  </label>
                  <Input
                    name="total_collectable_wallets"
                    type="number"
                    value={selectedRow.userSubnets.length}
                    variant="flat"
                  />
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[110px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Auto Collect:
                  </label>
                  <Checkbox isSelected={Boolean(selectedRow.autoCollect)} />
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[110px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Action:
                  </label>
                  <Button
                    className="min-w-[90px] text-sm"
                    color="secondary"
                    size="sm"
                    variant="shadow"
                    onPress={closeOpexDetailModal}
                  >
                    Restart
                  </Button>
                  <Button
                    className="min-w-[90px] text-sm"
                    color="primary"
                    size="sm"
                    variant="shadow"
                    onPress={closeOpexDetailModal}
                  >
                    Start
                  </Button>
                  <Button
                    className="min-w-[90px] text-sm"
                    color="warning"
                    size="sm"
                    variant="shadow"
                    onPress={closeOpexDetailModal}
                  >
                    Stop
                  </Button>
                  <Button
                    className="min-w-[90px] text-sm"
                    color="danger"
                    size="sm"
                    variant="shadow"
                    onPress={closeOpexDetailModal}
                  >
                    Delete
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                <Button color="danger" onPress={closeOpexDetailModal}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        color="primary"
        rowHeight={100}
        selectedKeys={filterSelectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={onSelectionChange}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "permission" ? "center" : "start"}
              className={cn([
                column.uid === "actions"
                  ? "flex items-center px-[20px] justify-center"
                  : "",
                "text-sm",
              ])}
            >
              {column.uid === "username" ? (
                <div
                  {...getMemberInfoProps()}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  {column.name}
                  {column.sortDirection === "ascending" ? (
                    <ArrowUpIcon className="text-default-400" />
                  ) : (
                    <ArrowDownIcon className="text-default-400" />
                  )}
                </div>
              ) : column.info ? (
                <div className="flex min-w-[108px] items-center justify-around">
                  {column.name}
                  <Tooltip content={column.info}>
                    <Icon
                      className="text-default-300"
                      height={16}
                      icon="solar:info-circle-linear"
                      width={16}
                    />
                  </Tooltip>
                </div>
              ) : (
                column.name
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow
              key={item.id}
              className="h-16"
              onClick={() => showSubnetDetails(item)}
            >
              {(columnKey) => (
                <TableCell className="text-base">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
