import { Avatar, Button, Flex, List, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { listDentistsApi } from "../../services/dentist";
import { Dentist } from "../../type";
import { useNotification } from "../../hooks/notificationHooks/useNotification";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

interface DentistPageProps {}

const DentistPage: FunctionComponent<DentistPageProps> = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listDentistsApi()
      .then((dentists) => {
        setDentists(dentists);
      })
      .catch((e) => {
        console.log(e);
        notify.error({ message: "Failed to get dentist list" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleStartEdit = (dentist: Dentist) => {
    console.log(dentist);
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Typography.Title>Danh sách</Typography.Title>
        <Button type="primary" onClick={() => navigate("/dentist/new")}>
          Thêm nha sĩ
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
        dataSource={dentists}
        renderItem={(dentist) => (
          <List.Item
            key={dentist.id}
            actions={[
              <Button
                size="small"
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleStartEdit(dentist)}>
                Edit
              </Button>,
            ]}
            extra={
              <img
                alt="logo"
                style={{ borderRadius: "8px" }}
                src="https://randomuser.me/api/portraits/men/69.jpg"
              />
            }>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={"https://randomuser.me/api/portraits/men/69.jpg"}
                />
              }
              title={dentist.description}
            />
            {`Kinh nghiệm: ${dentist.yearOfExperience} năm`}
            <br />
            {`Bằng số: ${dentist.licenseNumber}`}
          </List.Item>
        )}
      />
    </>
  );
};

export default DentistPage;
