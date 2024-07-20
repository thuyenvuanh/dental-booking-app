import { Avatar, Button, List, Typography } from "antd";
import { useNewAppointmentContext } from "../../../hooks/appointmentHooks/NewAppointment";
import { useNotification } from "../../../hooks/notificationHooks/useNotification";
import { Dentist } from "../../../type";
import { useEffect, useState } from "react";
import { listDentistsApi } from "../../../services/dentist";
import VirtualList from "rc-virtual-list";

const FormByDentist = () => {
  const { currentStep, setCurrentStep } = useNewAppointmentContext();
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const { notify } = useNotification();

  useEffect(() => {
    listDentistsApi()
      .then((dentists) => {
        setDentists(dentists);
      })
      .catch((e) => {
        console.log(e);
        notify.error({ message: "Failed to get dentist list" });
      });
  }, []);

  const submit = (_: Dentist) => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <Typography.Title level={3}>Chọn nha sĩ</Typography.Title>
      <List>
        <VirtualList
          data={dentists}
          height={400}
          itemHeight={47}
          itemKey="email">
          {(dentist: Dentist) => (
            <List.Item key={dentist.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={"https://randomuser.me/api/portraits/men/69.jpg"}
                  />
                }
                title={dentist.licenseNumber}
                description={dentist.description}
              />
              <div>
                <Button type="primary" onClick={() => submit(dentist)}>
                  Đặt lịch
                </Button>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};

export default FormByDentist;
