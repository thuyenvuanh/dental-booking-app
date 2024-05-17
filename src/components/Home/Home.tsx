import { Avatar, Card, Flex, Input, Select, Space, Typography } from "antd";
import { Background, CenterLayout } from "./Home.style";
import Meta from "antd/es/card/Meta";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Home: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(value);
  };

  return (
    <>
      <Background>
        <Typography.Title>Search Doctor, Make an Appointment</Typography.Title>
        <Typography style={{ color: "rgb(107, 114, 128)" }}>
          Discover the best doctors, clinic & hospital the city nearest to you.
        </Typography>
        <Flex style={{ margin: "24px 0" }}>
          <Space>
            <Select
              defaultValue="select"
              size="large"
              style={{ width: "200px" }}>
              <Select.Option value="select">Chọn vị trí</Select.Option>
              <Select.Option value="d1">Quan 1</Select.Option>
              <Select.Option value="d2">Quan 2</Select.Option>
              <Select.Option value="d3">Quan 3</Select.Option>
              <Select.Option value="d4">Quan 4</Select.Option>
              <Select.Option value="d5">Quan 5</Select.Option>
            </Select>
            <Input.Search
              style={{ width: "600px" }}
              placeholder="Dentist, Doctor, ..."
              enterButton="Tìm kiếm"
              size="large"
              allowClear
              onSearch={handleSearch}
            />
          </Space>
        </Flex>
      </Background>
      <CenterLayout style={{ backgroundColor: "#f8f9fa" }}>
        <Typography.Title>What are you looking for?</Typography.Title>
        <Flex align="center" justify="center">
          <Space size="large">
            <Card
              hoverable
              onClick={() => {
                alert("visit a doctor");
              }}
              style={{ width: 300 }}
              cover={<img alt="Visit a doctor" src="./feature-1.jpg" />}>
              <Meta title="Visit a doctor" description="Book Now" />
            </Card>
            <Card
              hoverable
              onClick={() => {
                alert("Medical");
              }}
              style={{ width: 300 }}
              cover={<img alt="Medical" src="./feature-2.jpg" />}>
              <Meta title="Medical" description="Book Now" />
            </Card>
            <Card
              hoverable
              onClick={() => {
                alert("Services");
              }}
              style={{ width: 300 }}
              cover={<img alt="Services" src="./feature-3.jpg" />}>
              <Meta title="Services" description="Book Now" />
            </Card>
          </Space>
        </Flex>
      </CenterLayout>
      <CenterLayout>
        <Typography.Title>Book Our Doctor</Typography.Title>
        <Flex
          wrap
          align="center"
          justify="center"
          gap="large"
          style={{ maxWidth: "1200px" }}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Card
              hoverable
              style={{ width: 300 }}
              cover={
                <img
                  alt="Doctor 1"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}>
              <Meta title="Card title" description="This is the description" />
            </Card>
          ))}
        </Flex>
      </CenterLayout>
    </>
  );
};

export default Home;
