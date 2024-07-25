import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Segmented,
  Spin,
  Flex,
  DatePicker,
  List,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import { useAuth } from "../../../hooks/authHooks/useAuth";
import { dentistAppointmentApi } from "../../../services/appointment";
import { Appointment } from "../../../type";
import { useNotification } from "../../../hooks/notificationHooks/useNotification";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import VirtualList from "rc-virtual-list";
import { getProfileApi } from "../../../services/auth";

const appointmentStatus = [
  "Đang chờ",
  "Xác nhận",
  "Từ chối",
  "Đã đặt",
  "Đã hủy",
  "Hoàn thành",
  "Tất cả",
];

const DentistAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { authDetails } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(appointmentStatus[6]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const { message } = useNotification();

  function getAppointments() {
    setIsLoading(true);
    dentistAppointmentApi({
      dateTime: selectedDate.format("YYYY-MM-DD"),
      status: appointmentStatus.indexOf(selectedStatus),
      dentistId: authDetails?.userDetails?.dentist?.id!,
    })
      .then(({ $values }) => {
        setAppointments($values);
      })
      .catch((e) => {
        console.error(e);
        message.error({ content: "Lỗi khi lấy thông tin lịch khám" });
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getAppointments();
    getProfileApi()
      .then(({ $values }) => {
        setProfiles($values);
      })
      .catch((e) => {
        console.error(e);
        message.error({ content: "Lỗi khi lấy thông tin lịch khám" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getAppointments();
  }, [selectedStatus, selectedDate]);

  const newApmts = () => {
    navigate(routes.DENTIST.APPOINTMENT.CREATE);
  };

  const getProfile = (appointment: Appointment) => {
    return profiles.find((x) => x.id === appointment.customerId);
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={20}>
          <Typography.Title level={3}>Lịch hẹn hôm nay</Typography.Title>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={newApmts}>
            Đặt lịch khám
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={17}>
          <Segmented
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            options={appointmentStatus}
          />
        </Col>
        <Col span={7}>
          <Flex align="end">
            <DatePicker
              value={selectedDate}
              format={"DD/MM/YYYY"}
              onChange={(date, _) => setSelectedDate(date)}
              style={{ width: "100%" }}
            />
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {isLoading && (
            <Flex justify="center" align="center">
              <Spin size="large" style={{ padding: "24px" }} />
            </Flex>
          )}
          {!isLoading && (
            <>
              {isEmpty(appointments) && (
                <Flex justify="center" style={{ padding: "24px" }}>
                  <Typography>Không có lịch hẹn nào.</Typography>
                </Flex>
              )}
              {!isEmpty(appointments) && (
                <List>
                  <VirtualList
                    data={appointments}
                    itemHeight={47}
                    itemKey="email">
                    {(appointment: Appointment) => (
                      <List.Item key={appointment.id}>
                        <List.Item.Meta
                          title={`${getProfile(appointment).firstName} ${
                            getProfile(appointment).lastName
                          }`}
                          description={
                            <>
                              <span>
                                Hẹn lúc:{" "}
                                {dayjs(`${appointment.startAt}Z`)
                                  .locale("vi")
                                  .format("HH:mm DD/MM/YYYY")}{" "}
                              </span>
                              <br />
                              <span>
                                Ghi chú:{" "}
                                {!isEmpty(appointment.note)
                                  ? appointment.note
                                  : "Không"}
                              </span>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  </VirtualList>
                </List>
              )}
            </>
          )}
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default DentistAppointment;
