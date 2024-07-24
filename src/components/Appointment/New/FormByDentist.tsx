import { Avatar, Button, DatePicker, Flex, Form, List, Typography } from "antd";
import "dayjs/locale/vi.js";
import { useNewAppointmentContext } from "../../../hooks/appointmentHooks/NewAppointment";
import { useNotification } from "../../../hooks/notificationHooks/useNotification";
import { ClinicDetail, Dentist, DNAppointment } from "../../../type";
import { useCallback, useEffect, useState } from "react";
import { listDentistsApi } from "../../../services/dentist";
import VirtualList from "rc-virtual-list";
import dayjs from "dayjs";
import { NewAppointment } from "../../../services/api/appointment";
import { useAuth } from "../../../hooks/authHooks/useAuth";
import { getClinicByIdApi } from "../../../services/clinic";
import { isNil } from "lodash";
import { createAppointmentApi } from "../../../services/appointment";
import { isRangeOverlap } from "range-overlap";

const FormByDentist = () => {
  const { currentStep, setCurrentStep } = useNewAppointmentContext();
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const [selectedClinicDental, setSelectedClinicDental] =
    useState<ClinicDetail | null>(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const { message } = useNotification();
  const { authDetails } = useAuth();
  const defaultValue = {
    startDate: dayjs(new Date().setHours(8, 0, 0, 0)).add(3, "day"),
  };

  useEffect(() => {
    listDentistsApi()
      .then((dentists) => {
        setDentists(dentists);
      })
      .catch((e) => {
        console.log(e);
        message.error({ content: "Lỗi khi thấy danh sách nha sĩ" });
      });
  }, []);

  const next = (dentist: Dentist) => {
    setSelectedDentist(dentist);
    setCurrentStep(currentStep + 1);
  };

  const validate = useCallback(
    (data: NewAppointment) => {
      //time range overlapping
      const { $values } = selectedDentist?.appointments as DNAppointment;
      for (const apmt in $values) {
        if (Object.prototype.hasOwnProperty.call($values, apmt)) {
          const element = $values[apmt];
          const start1 = new Date(data.startAt);
          const end1 = new Date(data.endAt);
          const start2 = new Date(element.startAt);
          const end2 = new Date(element.endAt);
          if (isRangeOverlap(start1, end1, start2, end2)) {
            return false;
          }
        }
      }
      return true;
    },
    [selectedDentist]
  );

  useEffect(() => {
    if (!isNil(selectedDentist)) {
      getClinicByIdApi(selectedDentist?.clinicDentalId!)
        .then((detail) => setSelectedClinicDental(detail))
        .catch((e) => {
          console.error(e);
          message.error({
            content: "Có lỗi đã xảy ra, vui lòng tải lại trang",
          });
          setIsFormDisabled(true);
        });
    }
  }, [selectedDentist]);

  if (currentStep == 1) {
    return (
      <>
        <Typography.Title level={3}>Chọn nha sĩ</Typography.Title>
        <List>
          <VirtualList data={dentists} itemHeight={47} itemKey="email">
            {(dentist: Dentist) => (
              <List.Item key={dentist.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={"https://randomuser.me/api/portraits/men/69.jpg"}
                    />
                  }
                  title={dentist.description}
                  description={
                    <>
                      <span>Kinh nghiệm: {dentist.yearOfExperience} năm</span>
                      <br />
                      <span>Bằng cấp số: {dentist.licenseNumber}</span>
                    </>
                  }
                />
                <div>
                  <Button type="primary" onClick={() => next(dentist)}>
                    Chọn
                  </Button>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </>
    );
  }

  function handleSubmit(values: typeof defaultValue): void {
    setIsFormDisabled(true);
    const endAt = values.startDate
      .add(selectedClinicDental?.slotDuration!, "minutes")
      .locale("vn")
      .toJSON();
    const data: NewAppointment = {
      clinicId: selectedDentist?.clinicDentalId!,
      customerId: authDetails?.userDetails?.id!,
      dentistId: selectedDentist?.id!,
      startAt: values.startDate.locale("vn").toJSON(),
      endAt,
      type: "THAM KHAM",
      note: "",
      periodicInterval: 0,
      status: 1,
    };
    if (validate(data)) {
      createAppointmentApi(data)
        .then((_) => {
          setCurrentStep(currentStep + 1);
        })
        .catch((e) => {
          console.error(e);
          message.error({ content: "Tạo lịch hẹn thất bại" });
        })
        .finally(() => setIsFormDisabled(false));
    } else {
      setIsFormDisabled(false);
    }
  }

  return (
    <>
      <Typography.Title level={3}>Chọn thời điểm hẹn</Typography.Title>
      <List>
        <List.Item key={selectedDentist!.id}>
          <List.Item.Meta
            avatar={
              <Avatar src={"https://randomuser.me/api/portraits/men/69.jpg"} />
            }
            title={selectedDentist!.description}
            description={
              <>
                <span>
                  Kinh nghiệm: {selectedDentist!.yearOfExperience} năm
                </span>
                <br />
                <span>Bằng cấp số: {selectedDentist!.licenseNumber}</span>
              </>
            }
          />
        </List.Item>
      </List>
      <Form
        initialValues={defaultValue}
        onFinish={handleSubmit}
        style={{ width: "50%" }}
        disabled={isFormDisabled}>
        <Form.Item name="startDate" required label="Giờ hẹn">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Flex justify="end">
            <Button htmlType="submit" type="primary">
              Lưu
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormByDentist;
