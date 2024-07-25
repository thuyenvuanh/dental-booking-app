import { Button, DatePicker, Flex, Form, Typography } from "antd";
import "dayjs/locale/vi.js";
import { useNewAppointmentContext } from "../../../hooks/appointmentHooks/NewAppointment";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // ES 2015
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone"; // ES 2015
import {
  createAppointmentApi,
  getAppointmentsByDate,
} from "../../../services/appointment";
import { useNotification } from "../../../hooks/notificationHooks/useNotification";
import { Appointment } from "../../../type";
import { NewAppointment } from "../../../services/api/appointment";
import { useAuth } from "../../../hooks/authHooks/useAuth";

const initialValues = {
  date: dayjs(new Date().setHours(8, 0, 0)),
};

const FormBySpecDate: React.FC = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault(dayjs.tz.guess());
  const { currentStep, setCurrentStep } = useNewAppointmentContext();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const { message } = useNotification();
  const { authDetails } = useAuth();
  const next = (_: any) => {
    setCurrentStep(currentStep + 1);
  };
  const validate = useCallback((data: dayjs.Dayjs, values: Appointment[]) => {
    //time range overlapping
    for (const apmt in values) {
      if (Object.prototype.hasOwnProperty.call(values, apmt)) {
        const element = values[apmt];
        if (
          data.isBefore(dayjs(`${element.endAt}Z`)) &&
          data.isAfter(dayjs(`${element.startAt}Z`))
        ) {
          return false;
        }
      }
    }
    return true;
  }, []);
  const getAppointments = (values: typeof initialValues) => {
    setIsFormDisabled(true);
    const params = {
      datetime: values.date.format("YYYY-MM-DD"),
    };
    getAppointmentsByDate(params)
      .then(({ $values: appointments }) => {
        if (validate(values.date, appointments)) {
          var newAppointment: NewAppointment = {
            clinicId: "",
            customerId: authDetails?.userDetails?.id!,
            dentistId: "",
            startAt: values.date.toJSON(),
            endAt: dayjs(new Date(0)).toJSON(),
            type: "THAM KHAM",
            note: "",
            periodicInterval: 0,
            status: 1,
          };
          createAppointmentApi(newAppointment).then((_) => {
            next({});
          });
        }
      })
      .catch((e) => {
        console.error(e);
        message.error({ content: "Lỗi khi lấy danh sách lịch hẹn" });
      })
      .finally(() => setIsFormDisabled(false));
  };

  if (currentStep == 1) {
    return (
      <>
        <Typography.Title level={3}>Chọn nha sĩ</Typography.Title>
        <Form
          initialValues={initialValues}
          onFinish={getAppointments}
          disabled={isFormDisabled}>
          <Flex justify="stretch" gap={12}>
            <Form.Item
              label="Chọn ngày hẹn"
              name="date"
              required
              style={{ width: "100%" }}>
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kiểm tra
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </>
    );
  }

  return (
    <>
      <Typography.Title>Đặt lịch hẹn khám</Typography.Title>
    </>
  );
};

export default FormBySpecDate;
