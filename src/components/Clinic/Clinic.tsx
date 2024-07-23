import { EditOutlined } from "@ant-design/icons";
import { Flex, Typography, Button, List, Avatar } from "antd";
import routes from "../../constants/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClinicDetail, LocationData } from "../../type";
import { useNotification } from "../../hooks/notificationHooks/useNotification";
import { getClinicListApi } from "../../services/clinic";

interface ClinicViewPageProps {}

const ClinicViewPage: React.FC<ClinicViewPageProps> = (_) => {
  const [clinics, setClinics] = useState<ClinicDetail[]>([]);
  const { message } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getClinicListApi()
      .then((clinics) => {
        setClinics(clinics);
      })
      .catch((e) => {
        console.log(e);
        message.error({ content: "Lỗi lấy danh sách phòng khám" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleStartEdit = (clinic: ClinicDetail) => {
    navigate(routes.ADMINISTRATOR.CLINIC.EDIT, {
      replace: true,
      state: { data: clinic } as LocationData,
    });
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Typography.Title>Danh sách</Typography.Title>
        <Button
          type="primary"
          onClick={() => navigate(routes.ADMINISTRATOR.CLINIC.NEW)}>
          Thêm phòng khám
        </Button>
      </Flex>
      <List
        loading={isLoading}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
        dataSource={clinics}
        renderItem={(clinic) => (
          <List.Item
            key={clinic.id}
            actions={[
              <Button
                size="small"
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleStartEdit(clinic)}>
                Chỉnh sửa
              </Button>,
            ]}
            extra={
              <img
                alt="logo"
                style={{ borderRadius: "8px", height: "350px" }}
                src="https://apollointeriors.com/wp-content/uploads/2023/08/taupe-dental-chair-landscape-1536x1024-1.jpeg"
              />
            }>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    "https://png.pngtree.com/png-vector/20190630/ourmid/pngtree-dental-logo-design-creative-dentist-logo-dental-clinic-creative-company-png-image_1523025.jpg"
                  }
                />
              }
              title={clinic.name}
            />
            <p>Địa chỉ: {clinic.address}</p>
            <p>Giờ mở cửa: {clinic.openTime}</p>
            <p>Giờ đóng cửa {clinic.closeTime}</p>
            <p>Bệnh nhân mỗi slot: {clinic.maxPatientsPerSlot}</p>
            <p>maxTreatmentPerSlot: {clinic.maxTreatmentPerSlot}</p>
            <p>Thời gian mỗi slot: {clinic.slotDuration}</p>
            <p>Trạng thái: {clinic.status ? "Đang hoạt động" : "Đóng cửa"}</p>
          </List.Item>
        )}
      />
    </>
  );
};

export default ClinicViewPage;
