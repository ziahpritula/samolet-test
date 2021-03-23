import { useRef, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { IRegion } from "../types/index";
import { Link } from "react-router-dom";

const LibraryRegionsTable = ({ regions }: { regions: IRegion[] }) => {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef<Input>(null);

  const columns: ColumnsType<IRegion> = [
    {
      title: "Территория",
      dataIndex: "territory",
      key: "territory",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        const handleSearch = () => {
          confirm();
          setSearchText(selectedKeys[0].toString());
        };

        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Search`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch()}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>
              <Button
                onClick={() => {
                  clearFilters?.();
                  setSearchText("");
                }}
                size="small"
                style={{ width: 90 }}
              >
                Очистить
              </Button>
            </Space>
          </div>
        );
      },
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.territory
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        visible && setTimeout(() => searchInput.current?.select(), 100);
      },
    },
    {
      title: "Имя",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Кол-во библиотек",
      dataIndex: "libraries",
      key: "libraries",
      sorter: (a, b) => a.libraries - b.libraries,
    },
    {
      title: "",
      dataIndex: "",
      key: "more",
      render: (a) => <Link to={`/regions/${a.order}`}>Подробнее</Link>,
    },
  ];

  return (
    <Table<IRegion>
      columns={columns}
      dataSource={regions}
      rowKey={(record) => record.order}
    />
  );
};

export default LibraryRegionsTable;
