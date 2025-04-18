"use client";

import type { Selection, SortDescriptor } from "@heroui/react";
import type { ColumnsKey, Subnets } from "./data";
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
  Link,
  Select,
  SelectItem,
  Alert,
  Spinner,
} from "@heroui/react";
import { SearchIcon } from "@heroui/shared-icons";
import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import { ArrowDownIcon } from "../shared/arrow-down";
import { ArrowUpIcon } from "../shared/arrow-up";
import { useMemoizedCallback } from "../shared/use-memoized-callback";

import { columns, INITIAL_VISIBLE_COLUMNS } from "./data";

interface SubnetProps {
  users: Subnets[];
}

interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
}
export const UserIcon: React.FC<UserIconProps> = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
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
        <path
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
          data-name="Stroke 3"
        />
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

export default function SubnetTable({ users }: SubnetProps) {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedUserName, setSelectedUserName] = useState<any>(null);
  const [selectedEmission, setSelectedEmission] = useState<any>(null);
  const [selectedRegCost, setSelectedRegCost] = useState<any>(null);
  const [selectedEngineers, setSelectedEngineers] = useState<any>([]);
  const [isModified, setIsModified] = useState(false);

  const engineerRoles = [
    "Design",
    "Product",
    "Marketing",
    "Management",
    "Engineering",
    "Sales",
    "Support",
    "Other",
    "Alex",
    "Danijel",
  ];
  const engineers = engineerRoles.map((role) => ({ key: role, label: role }));
  const showSubnetDetails = (item: any) => {
    setSelectedRow(item);
    setSelectedUserName(item.username);
    setSelectedEmission(item.emission);
    setSelectedRegCost(item.reg_cost);
    setSelectedEngineers(item.engineers);
    showSubnetDetailModal();
  };
  const handleSelectionChange = (keys: any) => {
    if (keys === "all") {
      setSelectedEngineers(engineerRoles);
      console.log("1", selectedEngineers);
    } else {
      setSelectedEngineers(Array.from(keys as Set<string>));
      console.log("2", selectedEngineers);
    }
  };

  useEffect(() => {
    if (!selectedRow) return;
    const modified =
      selectedUserName !== selectedRow.username ||
      selectedEmission !== selectedRow.emission ||
      selectedRegCost !== selectedRow.reg_cost ||
      selectedEngineers !== selectedRow.engineers;

    setIsModified(modified);
  }, [selectedUserName, selectedEmission, selectedRegCost, selectedEngineers]);

  const updateSubnetDetail = () => {
    console.log("selected option", selectedEngineers);
  };
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
    onOpen: showSubnetDetailModal,
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
    (col: Subnets) => {
      let allWorkerType = workerTypeFilter === "all";
      let allStatus = statusFilter === "all";
      let allStartDate = startDateFilter === "all";

      return (
        allWorkerType &&
        // (allStatus || statusFilter === col.status.toLowerCase()) &&
        (allStartDate ||
          new Date(
            new Date().getTime() -
              +(startDateFilter.match(/(\d+)(?=Days)/)?.[0] ?? 0) *
                24 *
                60 *
                60 *
                1000,
          ) <= new Date(col.createdAt))
      );
    },
    [startDateFilter, statusFilter, workerTypeFilter],
  );

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (filterValue) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase()),
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
    return [...items].sort((a: Subnets, b: Subnets) => {
      const col = sortDescriptor.column as keyof Subnets;

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
    (user: Subnets, columnKey: React.Key) => {
      const userKey = columnKey as ColumnsKey;

      const cellValue = user[
        userKey as unknown as keyof Subnets
      ] as unknown as string;

      switch (userKey) {
        case "username":
          return <div className="text-default-foreground">{cellValue}</div>;
        case "createdAt":
          return (
            <div className="flex items-center gap-1">
              <p className="text-nowrap text-baseall capitalize text-default-foreground">
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
        case "emission":
          return (
            <div className="flex items-center gap-2">
              <p className="text-nowrap text-baseall text-default-foreground">
                {user[userKey]}
              </p>
            </div>
          );
        case "engineers":
          return (
            <div className="float-start flex gap-1">
              {user[userKey].map((team: any, index: number) => {
                if (index < 3) {
                  return (
                    <Chip
                      key={team}
                      className="rounded-xl bg-default-100 px-[6px] capitalize text-default-800"
                      color="primary"
                      size="md"
                      variant="flat"
                    >
                      {team}
                    </Chip>
                  );
                }
                if (index < 4) {
                  return (
                    <Chip
                      key={team}
                      className="text-default-500"
                      color="primary"
                      size="md"
                      variant="flat"
                    >
                      {`+${team.length - 3}`}
                    </Chip>
                  );
                }

                return null;
              })}
            </div>
          );
        case "reg_cost":
          return <div className="text-default-foreground">{cellValue}</div>;
        // case "status":
        //   return <Status status={cellValue as StatusOptions} />;
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
          <h1 className="text-2xl font-[800] leading-[32px]">Subnets</h1>
          <Chip
            className="hidden items-center text-default-500 sm:flex"
            size="sm"
            variant="flat"
          >
            {users.length}
          </Chip>
        </div>
        <Button
          color="primary"
          endContent={<Icon icon="solar:add-circle-bold" width={20} />}
          onPress={() => openModal()}
        >
          New Subnet
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
          <span className="text-baseall text-default-400">
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
          body: "rounded-[15px] border-1 m-[9px] m-5 py-5 gap-5",
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
                Create New Subnet
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap justify-end items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[130px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Subnet No:
                  </label>
                  <Input key="subnet_no" isRequired type="text" />

                  <label
                    className="min-w-[120px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Subnet Name:
                  </label>
                  <Input key="subnet_name" isRequired type="text" />
                </div>

                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[130px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Subnet Emission:
                  </label>
                  <Input
                    key="subnet_emission"
                    isRequired
                    endContent={<p>%</p>}
                    type="number"
                  />
                  <label
                    className="min-w-[120px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Reg Cost:
                  </label>
                  <Input
                    key="reg_cost"
                    isRequired
                    endContent={<p>tao</p>}
                    type="number"
                  />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-start items-center">
                  <label
                    className="min-w-[130px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Engineers:
                  </label>
                  <Select isRequired className="max-w-full">
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
        size="2xl"
        onOpenChange={onShowSubnetDetails}
      >
        <ModalContent>
          {(closeSubnetDetailModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Subnet Detail
              </ModalHeader>
              <ModalBody className="border-1 rounded-lg mx-4 p-4 gap-5">
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[150px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Github URL:
                  </label>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/heroui-inc/heroui"
                  >
                    https://github.com/dmark1029
                  </Link>
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[150px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Subnet Name:
                  </label>
                  <Input
                    name="username"
                    type="text"
                    value={selectedUserName}
                    variant="bordered"
                    onChange={(e) => setSelectedUserName(e.target.value)}
                  />
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[150px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Emission(%):
                  </label>
                  <Input
                    name="emission"
                    type="number"
                    value={selectedEmission}
                    variant="bordered"
                    onChange={(e) => setSelectedEmission(e.target.value)}
                  />
                  <label
                    className="min-w-[110px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Reg Cost(tao):
                  </label>
                  <Input
                    name="reg cost"
                    type="number"
                    value={selectedRegCost}
                    variant="bordered"
                    onChange={(e) => setSelectedRegCost(e.target.value)}
                  />
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[150px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Alpha Token Price:
                  </label>
                  <Input
                    isReadOnly
                    className="max-w-[120px]"
                    endContent={<p>tao</p>}
                    errorMessage="Please enter a valid username"
                    name="username"
                    type="text"
                    value="340"
                    variant="bordered"
                  />
                  <div> = </div>
                  <Input
                    isReadOnly
                    className="max-w-[120px]"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-base">$</span>
                      </div>
                    }
                    type="number"
                    value="3.429"
                    variant="bordered"
                  />
                </div>
                <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <label
                    className="min-w-[150px] text-right text-base"
                    htmlFor="wallet_name"
                  >
                    Engineers:
                  </label>
                  <Select
                    classNames={{
                      trigger: "min-h-12 py-2",
                    }}
                    isMultiline={true}
                    items={engineers}
                    placeholder="Select a user"
                    renderValue={(items) => (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.textValue}</Chip>
                        ))}
                      </div>
                    )}
                    selectedKeys={new Set(selectedEngineers)}
                    selectionMode="multiple"
                    variant="bordered"
                    onSelectionChange={handleSelectionChange}
                  >
                    {(engineer) => (
                      <SelectItem key={engineer.key} textValue={engineer.label}>
                        {engineer.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center items-center">
                  <Input
                    className="max-w-[190px] text-base"
                    label="Total Covering Incentive"
                    labelPlacement="inside"
                    type="number"
                    value="46"
                    variant="bordered"
                  />
                  <Input
                    className="max-w-[190px]"
                    endContent={<p>tao</p>}
                    label="Total Income Alpha"
                    labelPlacement="inside"
                    type="number"
                    value="34"
                    variant="bordered"
                  />
                  <p>=</p>
                  <p>($ 34.5)</p>
                </div>
              </ModalBody>
              <ModalFooter>
                {isModified && (
                  <Button color="primary" onPress={updateSubnetDetail}>
                    Update
                  </Button>
                )}
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
