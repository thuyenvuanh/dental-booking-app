import { Button, Col, Divider, Row, Typography } from "antd";
import BookCalendar from "../../BookCalendar/BookCalendar.tsx";
import { useEffect, useState } from "react";
import { Appointment } from "../../../type.ts";
import { useNavigate } from "react-router-dom";
import { listAppointmentApi } from "../../../services/appointment.ts";
import { useAuth } from "../../../hooks/authHooks/useAuth.tsx";
import { useNotification } from "../../../hooks/notificationHooks/useNotification.tsx";
import routes from "../../../constants/routes.ts";
import dayjs from "dayjs";

dayjs.locale("vi", {}, true);
const AppointmentView: React.FC = () => {
  const navigate = useNavigate();
  const { authDetails } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { message } = useNotification();

  function getAppointments() {
    listAppointmentApi(authDetails?.userDetails?.id!)
      .then((apmts) => {
        setAppointments(apmts);
      })
      .catch((e) => {
        console.error(e);
        message.error({ content: "Lỗi khi lấy thông tin lịch khám" });
      });
  }

  useEffect(() => {
    getAppointments();
  }, []);

  const newApmts = () => {
    navigate(routes.USER.APPOINTMENT.CREATE);
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={20}>
          <Typography.Title level={3}>Xem lịch hẹn</Typography.Title>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={newApmts}>
            Đặt lịch khám
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BookCalendar appointments={appointments} />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default AppointmentView;
