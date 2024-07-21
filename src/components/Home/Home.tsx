import {Card, Flex, Input, Select, Space, Typography} from "antd";
import {CenterLayout} from "./Home.style";
import Meta from "antd/es/card/Meta";
import {EditOutlined, EllipsisOutlined, SettingOutlined,} from "@ant-design/icons";

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
            src={`./banner-bg.png`}
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
            <Typography.Title>Tìm kiếm nha sĩ, đặt lịch hẹn</Typography.Title>
            <Typography style={{ color: "rgb(107, 114, 128)" }}>
              Tìm kiếm những nha sĩ, phòng khám tốt nhất trong khu vực của bạn
            </Typography>
            <Flex style={{ margin: "24px 0" }}>
              <Space>
                <Select
                  defaultValue="select"
                  size="large"
                  style={{ maxWidth: "200px", width: "15vw" }}>
                  <Select.Option value="select">Chọn vị trí</Select.Option>
                  <Select.Option value="d1">Quận 1</Select.Option>
                  <Select.Option value="d2">Quận 2</Select.Option>
                  <Select.Option value="d3">Quận 3</Select.Option>
                  <Select.Option value="d4">Quận 4</Select.Option>
                  <Select.Option value="d5">Quận 5</Select.Option>
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
          <Typography.Title>Bạn đang tìm kiếm gì?</Typography.Title>
          <Flex
            align="center"
            wrap
            gap="large"
            justify="center"
            style={{ maxWidth: "948px", width: "80vw" }}>
            <Card
              hoverable
              onClick={() => {
                alert("Thăm khám");
              }}
              style={{ width: 300 }}
              cover={<img alt="Thăm khám" src={`./feature-1.jpg`} />}>
              <Meta title="Thăm khám" description="Book Now" />
            </Card>
            <Card
              hoverable
              onClick={() => {
                alert("Dược phẩm");
              }}
              style={{ width: 300 }}
              cover={<img alt="Dược phẩm" src={`./feature-2.jpg`} />}>
              <Meta title="Dược phẩm" description="Book Now" />
            </Card>
            <Card
              hoverable
              onClick={() => {
                alert("Dịch vụ");
              }}
              style={{ width: 300 }}
              cover={<img alt="Dịch vụ" src={`./feature-3.jpg`} />}>
              <Meta title="Dịch vụ" description="Book Now" />
            </Card>
          </Flex>
        </CenterLayout>
        <CenterLayout>
          <Typography.Title>Đặt nha sĩ ngay</Typography.Title>
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
                <Meta title="Tên nha sĩ" description="Thông tin thêm" />
              </Card>
            ))}
          </Flex>
        </CenterLayout>
      </>
    );
};

export default Home;
