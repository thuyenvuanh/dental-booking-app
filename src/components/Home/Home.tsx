import { Card, Flex, Input, Select, Space, Typography } from "antd";
import { CenterLayout } from "./Home.style";
import Meta from "antd/es/card/Meta";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {BASENAME} from "../../constants/routes.ts";

const Home: React.FC = () => {
  const handleSearch = (value: string) => {
    alert(value);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "450px",
          width: "100%",
          overflow: "hidden",
        }}>
        <img
          src={`.${BASENAME}/banner-bg.png`}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "50%",
            textAlign: "center",
          }}>
          <Typography.Title>
            Search Doctor, Make an Appointment
          </Typography.Title>
          <Typography style={{ color: "rgb(107, 114, 128)" }}>
            Discover the best doctors, clinic & hospital the city nearest to
            you.
          </Typography>
          <Flex style={{ margin: "24px 0" }}>
            <Space>
              <Select
                defaultValue="select"
                size="large"
                style={{ maxWidth: "200px", width: "15vw" }}>
                <Select.Option value="select">Chọn vị trí</Select.Option>
                <Select.Option value="d1">Quan 1</Select.Option>
                <Select.Option value="d2">Quan 2</Select.Option>
                <Select.Option value="d3">Quan 3</Select.Option>
                <Select.Option value="d4">Quan 4</Select.Option>
                <Select.Option value="d5">Quan 5</Select.Option>
              </Select>
              <Input.Search
                style={{ maxWidth: "600px", width: "40vw" }}
                placeholder="Dentist, Doctor, ..."
                enterButton="Tìm kiếm"
                size="large"
                allowClear
                onSearch={handleSearch}
              />
            </Space>
          </Flex>
        </div>
      </div>
      <CenterLayout style={{ backgroundColor: "#f8f9fa" }}>
        <Typography.Title>What are you looking for?</Typography.Title>
        <Flex
          align="center"
          wrap
          gap="large"
          justify="center"
          style={{ maxWidth: "948px", width: "80vw" }}>
          <Card
            hoverable
            onClick={() => {
              alert("visit a doctor");
            }}
            style={{ width: 300 }}
            cover={<img alt="Visit a doctor" src={`.${BASENAME}/feature-1.jpg`} />}>
            <Meta title="Visit a doctor" description="Book Now" />
          </Card>
          <Card
            hoverable
            onClick={() => {
              alert("Medical");
            }}
            style={{ width: 300 }}
            cover={<img alt="Medical" src={`.${BASENAME}/feature-2.jpg`} />}>
            <Meta title="Medical" description="Book Now" />
          </Card>
          <Card
            hoverable
            onClick={() => {
              alert("Services");
            }}
            style={{ width: 300 }}
            cover={<img alt="Services" src={`.${BASENAME}/feature-3.jpg`} />}>
            <Meta title="Services" description="Book Now" />
          </Card>
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
