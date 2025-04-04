"use client";

import type { Selection, SortDescriptor } from "@heroui/react";
import type { ColumnsKey, Instances } from "./data";
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
  useButton,
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
  Select,
  SelectItem,
  Alert,
  Spinner,
  Textarea,
} from "@heroui/react";
import { CopyIcon, SearchIcon } from "@heroui/shared-icons";
import React, { useMemo, useRef, useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import { ArrowDownIcon } from "../shared/arrow-down";
import { ArrowUpIcon } from "../shared/arrow-up";
import { useMemoizedCallback } from "../shared/use-memoized-callback";
import { CopyDoneIcon } from "../shared/copy-text";

import { columns, INITIAL_VISIBLE_COLUMNS } from "./data";

interface InstanceProps {
  instances: Instances[];
}

export default function InstanceTable({ instances }: InstanceProps) {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [copiedValue, setCopiedValue] = useState<string>("");

  const showSubnetDetails = (item: any) => {
    setCopiedValue("");
    setSelectedRow((prevRow: { id: any }) =>
      prevRow && prevRow.id === item.id ? null : item,
    );
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
    isOpen: isShowSubnetDetails,
    onOpenChange: onShowSubnetDetails,
    onClose: closeSubnetDetailModal,
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
  const [selectedRole, setSelectedRole] = useState("");
  const [workerTypeFilter, setWorkerTypeFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [startDateFilter, setStartDateFilter] = React.useState("all");
  // const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isRemove, setIsRemove] = useState(false);
  const [showPermission, setPermissionModal] = useState(false);
  // test
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setAvatarPreview(previewUrl);
    }
  };
  const handleSelectRole = (e: any) => {
    setSelectedRole(e.target.value);
  };
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
    (col: Instances) => {
      let allWorkerType = workerTypeFilter === "all";
      let allStartDate = startDateFilter === "all";

      return allWorkerType && allStartDate;
    },
    [startDateFilter, workerTypeFilter],
  );

  const filteredItems = useMemo(() => {
    let filteredUsers = [...instances];

    if (filterValue) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    filteredUsers = filteredUsers.filter(itemFilter);

    return filteredUsers;
  }, [filterValue, itemFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Instances, b: Instances) => {
      const col = sortDescriptor.column as keyof Instances;

      let first = a[col];
      let second = b[col];
      let cmp;

      if (col === "username") {
        const firstStr = first.toString();
        const secondStr = second.toString();

        cmp = firstStr < secondStr ? -1 : firstStr > secondStr ? 1 : 0;
      }

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

  const eyesRef = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const { getButtonProps: getEyesProps } = useButton({ ref: eyesRef });
  const { getButtonProps: getEditProps } = useButton({ ref: editRef });
  const { getButtonProps: getDeleteProps } = useButton({ ref: deleteRef });
  const getMemberInfoProps = useMemoizedCallback(() => ({
    onClick: handleMemberClick,
  }));

  const openModal = () => {
    setAvatarPreview("");
    showCreateNewSubnetModal();
  };

  const setPermission = () => {
    onPermissionModalChange();
    setPermissionModal(true);
  };
  const renderCell = useMemoizedCallback(
    (user: Instances, columnKey: React.Key) => {
      const userKey = columnKey as ColumnsKey;

      const cellValue = user[
        userKey as unknown as keyof Instances
      ] as unknown as string;

      switch (userKey) {
        // case "username":
        //   return (
        //     <User
        //       avatarProps={{ radius: "lg", src: user[userKey].avatar }}
        //       classNames={{
        //         name: "text-default-foreground",
        //         description: "text-default-500",
        //       }}
        //       description={user[userKey].email}
        //       name={user[userKey].name}
        //     >
        //       {user[userKey].email}
        //     </User>
        //   );
        case "ip":
          return <div className="text-default-foreground">{cellValue}</div>;
        case "username":
          return <div className="text-default-foreground">{cellValue}</div>;
        case "instanceId":
          return <div className="text-default-foreground">{cellValue}</div>;
        case "provider":
          return <div className="text-default-foreground">{cellValue}</div>;
        case "type":
          return <div className="text-default-foreground">{cellValue}</div>;
        case "port":
          return <div className="text-default-foreground">{cellValue}</div>;
        default:
          return cellValue;
      }
    },
  );

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
          <h1 className="text-2xl font-[700] leading-[32px]">Instances</h1>
          <Chip
            className="hidden items-center text-default-500 sm:flex"
            size="sm"
            variant="flat"
          >
            {instances.length}
          </Chip>
        </div>
        <Button
          color="primary"
          endContent={<Icon icon="solar:add-circle-bold" width={20} />}
          onPress={() => openModal()}
        >
          Rent New
        </Button>
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

      {/* Create New Subnet Modal */}
      <Modal
        backdrop={backdrop}
        classNames={{
          body: "rounded-[15px] border-1 m-[9px] m-5 py-5",
        }}
        isDismissable={false}
        isOpen={isShowCreateNewSubnetModal}
        placement="top-center"
        size="xl"
        onOpenChange={onCreateNewSubnetModal}
      >
        <ModalContent>
          {(closeCreateNewSubnetModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Subnet
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap justify-end items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    key="subnet_no"
                    isRequired
                    label="Subnet No"
                    labelPlacement="outside-left"
                    type="text"
                  />

                  <Input
                    key="subnet_name"
                    isRequired
                    label="Subnet Name"
                    labelPlacement="outside-left"
                    type="text"
                  />
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    key="subnet_emission"
                    isRequired
                    endContent={<p>%</p>}
                    label="Subnet Emission"
                    labelPlacement="outside-left"
                    type="number"
                  />
                  <Input
                    key="reg_cost"
                    isRequired
                    endContent={<p>tao</p>}
                    label="Reg Cost"
                    labelPlacement="outside-left"
                    type="number"
                  />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap pl-2 mb-6 md:mb-0 gap-4 justify-start items-center">
                  <Select
                    isRequired
                    className="max-w-full"
                    label="Engineers"
                    labelPlacement="outside-left"
                  >
                    <SelectItem key="1">1</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center">
                <Button color="danger" onPress={closeCreateNewSubnetModal}>
                  Cancel
                </Button>
                <Button color="primary" onPress={closeCreateNewSubnetModal}>
                  Submit
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
      <Modal
        backdrop={backdrop}
        classNames={{
          body: "rounded-[15px] border-1 m-[9px] mx-5",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        }}
        isDismissable={false}
        isOpen={isPermissionModalOpen}
        placement="top-center"
        size="2xl"
        onOpenChange={onPermissionModalChange}
      >
        <ModalContent>
          {(onPermissionModalChange) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Set Permission
              </ModalHeader>
              <ModalBody className="max-h-[500px] overflow-auto max-w-[800px]">
                <Table aria-label="Permissions Table">
                  <TableHeader>
                    <TableColumn className="text-center min-w-36 max-w-36">
                      <p className="text-base">User</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 invisible">Instance</p>
                      <p className="mb-2">Read</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 text-green-500">Instance</p>
                      <p className="mb-2">Write</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 invisible">Instance</p>
                      <p className="mb-2">Delete</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 invisible">Miner</p>
                      <p className="mb-2">Read</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 text-green-500">Miner</p>
                      <p className="mb-2">Write</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 invisible">Miner</p>
                      <p className="mb-2">Delete</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 invisible">Wallet</p>
                      <p className="mb-2">Read</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 text-green-500">Wallet</p>
                      <p className="mb-2">Write</p>
                    </TableColumn>
                    <TableColumn className="text-center">
                      <p className="text-xl my-2 invisible">Wallet</p>
                      <p className="mb-2">Delete</p>
                    </TableColumn>
                  </TableHeader>
                  <TableBody loadingContent={<Spinner label="Loading..." />}>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-semibold">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onPermissionModalChange}
                >
                  Close
                </Button>
                <Button color="primary" onPress={onPermissionModalChange}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Subnet Detail Modal */}

      <Modal
        backdrop={backdrop}
        isDismissable={false}
        isOpen={isShowSubnetDetails}
        placement="top-center"
        size="xl"
        onOpenChange={onShowSubnetDetails}
      >
        <ModalContent>
          {(closeSubnetDetailModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Instance Detail
              </ModalHeader>
              <ModalBody className="border-1 rounded-lg mx-4 p-4">
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    isReadOnly
                    errorMessage="Please enter a valid username"
                    label="Subnet Name: "
                    labelPlacement="outside-left"
                    name="username"
                    type="text"
                    value={selectedRow.username}
                    variant="bordered"
                  />
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <p className="px-2 text-sm">SPEC: </p>
                  <Chip
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                    variant="shadow"
                  >
                    CPU
                  </Chip>
                  <Chip
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                    variant="shadow"
                  >
                    VRAM
                  </Chip>
                  <Chip
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                    variant="shadow"
                  >
                    RAM
                  </Chip>
                  <Chip
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                    variant="shadow"
                  >
                    HARD
                  </Chip>
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <p className="px-2 text-sm">Usage: </p>
                  <Input
                    key="ram"
                    isReadOnly
                    className="max-w-[120px]"
                    color="success"
                    endContent={<p>%</p>}
                    label="RAM"
                    labelPlacement="outside-left"
                    size="sm"
                    type="text"
                    value="7"
                  />
                  <Input
                    key="cpu"
                    isReadOnly
                    className="max-w-[120px]"
                    color="success"
                    endContent={<p>%</p>}
                    label="CPU"
                    labelPlacement="outside-left"
                    size="sm"
                    type="text"
                    value="9"
                  />
                </div>
                <Textarea
                  disableAnimation
                  disableAutosize
                  isReadOnly
                  classNames={{
                    input: "resize-y min-h-[40px]",
                  }}
                  label="Description"
                  value="hello world"
                  variant="bordered"
                />
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <p className="px-2 w-20 text-sm">PEM: </p>
                  <Button
                    color="primary"
                    size="sm"
                    variant="shadow"
                    onPress={closeSubnetDetailModal}
                  >
                    Download
                  </Button>
                  <p className="px-2 text-sm">System Action: </p>
                  <Button
                    color="danger"
                    size="sm"
                    variant="shadow"
                    onPress={closeSubnetDetailModal}
                  >
                    Delete
                  </Button>
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <p className="px-2 w-20 text-sm">Action: </p>
                  <Button
                    color="success"
                    size="sm"
                    variant="shadow"
                    onPress={closeSubnetDetailModal}
                  >
                    Hibernate
                  </Button>
                  <Button
                    color="warning"
                    size="sm"
                    variant="shadow"
                    onPress={closeSubnetDetailModal}
                  >
                    Reboot
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="shadow"
                    onPress={closeSubnetDetailModal}
                  >
                    Shutdown
                  </Button>
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    isReadOnly
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={() => copyCode(selectedRow.serviceLink)}
                      >
                        {selectedRow.serviceLink === copiedValue ? (
                          <CopyDoneIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <CopyIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    errorMessage="Please enter a valid username"
                    label="Login Command:"
                    labelPlacement="outside-left"
                    name="username"
                    type="text"
                    value="ssh -i test.com XXXX XXXX"
                    variant="bordered"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={closeSubnetDetailModal}>
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
            <TableRow key={item.id} onClick={() => showSubnetDetails(item)}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
