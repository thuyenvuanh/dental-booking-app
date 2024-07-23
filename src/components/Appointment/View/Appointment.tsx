import { Button, Col, Divider, Row, Typography } from "antd";
import BookCalendar from "../../BookCalendar/BookCalendar.tsx";
import { useEffect, useState } from "react";
import { Appointment } from "../../../type.ts";
import { useNavigate } from "react-router-dom";
import { listAppointmentApi } from "../../../services/appointment.ts";
import { useAuth } from "../../../hooks/authHooks/useAuth.tsx";
import { useNotification } from "../../../hooks/notificationHooks/useNotification.tsx";

const AppointmentView: React.FC = () => {
  const navigate = useNavigate();
  const { authDetails } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { notification } = useNotification();

  function getAppointments() {
    listAppointmentApi(authDetails?.userDetails?.id!)
      .then((apmts) => {
        setAppointments(apmts);
      })
      .catch((e) => {
        console.error(e);
        notification.error({ message: "failed to get appointments" });
      });
  }

  useEffect(() => {
    getAppointments();
  }, []);

  const newApmts = () => {
    navigate("/apmt/new");
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={20}>
          <Typography.Title level={3}>View Appointment</Typography.Title>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={newApmts}>
            Book new
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
