"use client";

import type { Selection, SortDescriptor } from "@heroui/react";
import type { ColumnsKey, StatusOptions, Users } from "./data";
import { columns, INITIAL_VISIBLE_COLUMNS } from "./data";
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
  User,
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
  Link,
  Select,
  SelectItem,
  Alert,
  Textarea,
  Spinner
} from "@heroui/react";
import { SearchIcon } from "@heroui/shared-icons";
import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";
import { CopyText } from "./copy-text";
import { EyeFilledIcon } from "./eye";
import { EditLinearIcon } from "./edit";
import { DeleteFilledIcon } from "./delete";
import { ArrowDownIcon } from "./arrow-down";
import { ArrowUpIcon } from "./arrow-up";

import { useMemoizedCallback } from "./use-memoized-callback";
import { Status } from "./Status";

interface UserProps {
  users: Users[];
}

interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
}
export const UserIcon: React.FC<UserIconProps> = ({ fill = "currentColor", size, height, width, ...props }) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
          data-name="Stroke 1"
        />
        <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
      </g>
    </svg>
  );
};


export const userRoles = [
  { key: "admin", label: "Admin" },
  { key: "manager", label: "Manager" },
  { key: "user", label: "User" },
];
export const MailIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function UserTable({ users }: UserProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isRemoveModalOpen,
    onOpen: onRemoveModalOpen,
    onClose: onRemoveModalClose,
    onOpenChange: onRemoveModalChange,
    onOpenChange: onPermissionModalChange,
    isOpen: isPermissionModalOpen
  } = useDisclosure();

  const [mockUsers, setMockUsers] = useState([
    { id: 1, name: "Josh", instanceRead: true, instanceWrite: false, instanceDelete: false, minerRead: false, minerWrite: true, minerDelete: false },
  ]);
  const handleToggle = (userId: number, field: keyof typeof mockUsers[0]) => {
    setMockUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: !user[field] } : user
      )
    );
  };

  const [backdrop, setBackdrop] = React.useState<"blur" | "transparent" | "opaque">("blur");

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
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
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isRemove, setIsRemove] = useState(false);
  const [showPermission, setPermissionModal] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };
  const handleSelectRole = (e: any) => {
    setSelectedRole(e.target.value);
  }
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
    (col: Users) => {
      let allWorkerType = workerTypeFilter === "all";
      let allStatus = statusFilter === "all";
      let allStartDate = startDateFilter === "all";

      return (
        (allWorkerType || workerTypeFilter === col.role.toLowerCase()) &&
        // (allStatus || statusFilter === col.status.toLowerCase()) &&
        (allStartDate ||
          new Date(
            new Date().getTime() -
            +(startDateFilter.match(/(\d+)(?=Days)/)?.[0] ?? 0) * 24 * 60 * 60 * 1000,
          ) <= new Date(col.createdAt))
      );
    },
    [startDateFilter, statusFilter, workerTypeFilter],
  );

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

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
    return [...items].sort((a: Users, b: Users) => {
      const col = sortDescriptor.column as keyof Users;

      let first = a[col];
      let second = b[col];

      if (col === "username") {
        first = a[col].name;
        second = b[col].name;
      } else if (sortDescriptor.column === "externalWorkerID") {
        first = +a.externalWorkerID.split("EXT-")[1];
        second = +b.externalWorkerID.split("EXT-")[1];
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;

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
    onOpen();
    setAvatarPreview('');
  }


  const confirmDelete = () => {
    onRemoveModalOpen();
    setIsRemove(true);
  }

  const setPermission = () => {
    onPermissionModalChange();
    setPermissionModal(true);
  }
  const renderCell = useMemoizedCallback((user: Users, columnKey: React.Key) => {
    const userKey = columnKey as ColumnsKey;

    const cellValue = user[userKey as unknown as keyof Users] as string;
    switch (userKey) {
      case "userID":
      case "externalWorkerID":
        return <CopyText>{cellValue}</CopyText>;
      case "username":
        return (
          <User
            avatarProps={{ radius: "lg", src: user[userKey].avatar }}
            classNames={{
              name: "text-default-foreground",
              description: "text-default-500",
            }}
            description={user[userKey].email}
            name={user[userKey].name}
          >
            {user[userKey].email}
          </User>
        );
      case "createdAt":
        return (
          <div className="flex items-center gap-1">
            <p className="text-nowrap text-small capitalize text-default-foreground">
              {new Intl.DateTimeFormat("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(cellValue as unknown as Date)}
            </p>
          </div>
        );
      case "subnets":
        return (
          <div className="flex items-center gap-2">
            <p className="text-nowrap text-small text-default-foreground">{user[userKey]}</p>
          </div>
        );
      // case "teams":
      //   return (
      //     <div className="float-start flex gap-1">
      //       {user[userKey].map((team: any, index: number) => {
      //         if (index < 3) {
      //           return (
      //             <Chip
      //               key={team}
      //               className="rounded-xl bg-default-100 px-[6px] capitalize text-default-800"
      //               size="sm"
      //               variant="flat"
      //             >
      //               {team}
      //             </Chip>
      //           );
      //         }
      //         if (index < 4) {
      //           return (
      //             <Chip key={team} className="text-default-500" size="sm" variant="flat">
      //               {`+${team.length - 3}`}
      //             </Chip>
      //           );
      //         }

      //         return null;
      //       })}
      //     </div>
      //   );
      case "role":
        return <div className="text-default-foreground">{cellValue}</div>;
      // case "status":
      //   return <Status status={cellValue as StatusOptions} />;
      case "actions":
        return (
          <div className="flex items-center justify-end gap-2">
            <Button color="success" startContent={<UserIcon />} variant="ghost" size="sm">
              Update
            </Button>
            <Button color="danger" startContent={<UserIcon />} variant="ghost" onPress={() => confirmDelete()} size="sm">
              Delete
            </Button>
          </div>
        );
      case "permission":
        return (
          <div className="flex items-center justify-end gap-2">
            <Button color="primary" variant="shadow" size="sm" onPress={() => setPermission()}>
              Permission
            </Button>
          </div>
        );
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
        const resultKeys = new Set(filteredItems.map((item) => String(item.id)));

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
              endContent={<SearchIcon className="text-default-400" width={16} />}
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
                      <Icon className="text-default-400" icon="solar:tuning-2-linear" width={16} />
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

                    <RadioGroup label="Status" value={statusFilter} onValueChange={setStatusFilter}>
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
                      <Icon className="text-default-400" icon="solar:sort-linear" width={16} />
                    }
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter((c: any) => !["actions", "teams", "permission"].includes(c.uid))}
                >
                  {(item: any) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === "ascending" ? "descending" : "ascending",
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
                  items={columns.filter((c: any) => !["actions"].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item: any) => <DropdownItem key={item.uid}>{item.name}</DropdownItem>}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Divider className="h-5" orientation="vertical" />

          <div className="whitespace-nowrap text-sm text-default-800">
            {filterSelectedKeys === "all"
              ? "All items selected"
              : `${filterSelectedKeys.size} Selected`}
          </div>

          {(filterSelectedKeys === "all" || filterSelectedKeys.size > 0) && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-default-100 text-default-800"
                  endContent={
                    <Icon className="text-default-400" icon="solar:alt-arrow-down-linear" />
                  }
                  size="sm"
                  variant="flat"
                >
                  Selected Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Selected Actions">
                <DropdownItem key="send-email">Send email</DropdownItem>
                <DropdownItem key="pay-invoices">Pay invoices</DropdownItem>
                <DropdownItem key="bulk-edit">Bulk edit</DropdownItem>
                <DropdownItem key="end-contract">End contract</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
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
          <h1 className="text-2xl font-[700] leading-[32px]">Users</h1>
          <Chip className="hidden items-center text-default-500 sm:flex" size="sm" variant="flat">
            {users.length}
          </Chip>
        </div>
        <Button color="primary" onPress={() => openModal()} endContent={<Icon icon="solar:add-circle-bold" width={20} />}>
          New User
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
            <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={page === pages} size="sm" variant="flat" onPress={onNextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterSelectedKeys, page, pages, filteredItems.length, onPreviousPage, onNextPage]);

  const handleMemberClick = useMemoizedCallback(() => {
    setSortDescriptor({
      column: "username",
      direction: sortDescriptor.direction === "ascending" ? "descending" : "ascending",
    });
  });

  return (
    <div className="h-full w-full p-6">
      {topBar}
      <Modal isDismissable={false} backdrop={backdrop} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rent New Model</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    isRequired
                    isClearable
                    errorMessage="Please enter a valid username"
                    label="Id"
                    name="username"
                    type="text"

                    variant="bordered"
                  />
                  <Input
                    isRequired
                    isClearable
                    label="Email"

                    type="email"
                    variant="bordered"
                  />
                </div>
                <Textarea
                  isRequired
                  disableAnimation
                  disableAutosize
                  classNames={{
                    input: "resize-y min-h-[40px]",
                  }}
                  label="Description"

                  variant="bordered"
                />
                {/* <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                /> */}
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    isRequired
                    isClearable
                    errorMessage="Please enter a valid username"
                    label="Ip"
                    name="username"
                    type="text"

                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Port"

                    type="number"
                    variant="bordered"
                  />
                  <Select className="max-w-xs" label="SSH Key" variant="bordered">
                    <SelectItem key="1">1</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                  </Select>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-start items-center">
                  <Select isRequired className="max-w-xs" label="GPU" variant="bordered">
                    <SelectItem key="1">1</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                  </Select>
                  <Select isRequired className="max-w-xs" label="CPU" variant="bordered">
                    <SelectItem key="1">1</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                  </Select>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-start items-center">
                  <Input
                    isRequired
                    label="RAM"

                    type="number"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="CPU"

                    type="number"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="HARD"

                    type="number"
                    variant="bordered"
                  />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-start items-center">
                  <Select isRequired className="max-w-xs" label="Provider" variant="bordered">
                    <SelectItem key="1">Shadeform</SelectItem>
                    <SelectItem key="2">Cloudzy</SelectItem>
                  </Select>
                  <Checkbox>Automatic</Checkbox>
                </div>

                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  Restart
                </Button>
                <Button color="primary" onPress={onClose}>
                  Start
                </Button>
                <Button color="success" onPress={onClose}>
                  Stop
                </Button>
                <Button color="danger" onPress={onClose}>
                  Unstake
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isDismissable={false} backdrop={backdrop} isOpen={isRemoveModalOpen} placement="top-center" onOpenChange={onRemoveModalChange}>
        <ModalContent>
          {(onRemoveModalClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <Alert description="Are you sure you want to delete this user?" variant="faded" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onRemoveModalClose}>
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
        isDismissable={false}
        backdrop={backdrop}
        isOpen={isPermissionModalOpen}
        placement="top-center"
        onOpenChange={onPermissionModalChange}
        classNames={{
          body: "rounded-[15px] border-1 border-white m-[9px] mx-5 444",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        }}
        size="2xl"
      >
        <ModalContent>
          {(onPermissionModalChange) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Set Permission</ModalHeader>
              <ModalBody className="max-h-[500px] overflow-auto max-w-[800px]">
                {/* <Table aria-label="Permissions Table">
                  <TableHeader>
                    <TableColumn className="text-center w-[150px]">User</TableColumn>
                    <TableColumn className="text-center">Read</TableColumn>
                    <TableColumn className="text-center">Write</TableColumn>
                    <TableColumn className="text-center">Delete</TableColumn>
                    <TableColumn className="text-center">Read</TableColumn>
                    <TableColumn className="text-center">Write</TableColumn>
                    <TableColumn className="text-center">Delete</TableColumn>
                    <TableColumn className="text-center">Read</TableColumn>
                    <TableColumn className="text-center">Write</TableColumn>
                    <TableColumn className="text-center">Delete</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-semibold">{user.name}</TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                {/* NextUI Table (Second Row & Data) */}
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
                        <TableCell className="font-semibold">{user.name}</TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                        <TableCell className="text-center"><Checkbox /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onPermissionModalChange}>
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
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          td: "before:bg-transparent",
        }}
        selectedKeys={filterSelectedKeys}
        selectionMode="multiple"
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
                column.uid === "actions" ? "flex items-center px-[20px] justify-center" : "",
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
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
