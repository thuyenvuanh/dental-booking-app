import {
  Alert,
  Calendar,
  CalendarProps,
  List,
  Modal,
  Spin,
  Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Appointment, ClinicDetail, Dentist } from "../../type.ts";
import React, { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import VirtualList from "rc-virtual-list";
import utc from "dayjs/plugin/utc"; // ES 2015

import timezone from "dayjs/plugin/timezone"; // ES 2015
import { listDentistsApi } from "../../services/dentist.ts";
import { useNotification } from "../../hooks/notificationHooks/useNotification.tsx";
import { listClinicDentalApi } from "../../services/clinicDental.ts";

interface BookCalendarProps {
  appointments: Appointment[];
}
const BookCalendar: React.FC<BookCalendarProps> = ({ appointments }) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault(dayjs.tz.guess());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apmts, setApmts] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const deepCopy: <Type>(value: Type) => Type = function <Type>(value: Type) {
    return JSON.parse(JSON.stringify(value)) as Type;
  };

  const showModal = (date: Dayjs) => {
    if (getEventOfDay(date).length != 0) {
      const sortedApmts = deepCopy(getEventOfDay(date));
      setApmts(
        sortedApmts.sort((a, b) => dayjs(a.startAt).diff(dayjs(b.startAt)))
      );
      if (selectedDate.getMonth() == date.month()) {
        setIsModalOpen(true);
      }
      setSelectedDate(date.toDate());
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setApmts([]);
  };

  const getEventOfDay = useCallback(
    (date: Dayjs): Appointment[] => {
      return appointments.filter(
        (a) => dayjs(a.startAt).startOf("day").diff(date.startOf("day")) == 0
      );
    },
    [appointments]
  );

  // const getMonthData = (value: Dayjs) => {
  //     if (value.month() === 8) {
  //         return 1394;
  //     }
  // };

  const monthCellRender = (_: Dayjs) => {
    // const num = getMonthData(value);
    // return num ? (
    //     <div className="notes-month">
    //         <section>{num}</section>
    //         <span>Backlog number</span>
    //     </div>
    // ) : null;
    return null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getEventOfDay(value);
    if (listData.length != 0)
      return <Alert message={`${listData.length} cuộc hẹn`} />;
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <>
      <MeetingModal
        isModalOpen={isModalOpen}
        apmts={apmts}
        handleCancel={handleCancel}
      />
      <Calendar cellRender={cellRender} onSelect={showModal} />
    </>
  );
};

interface MeetingModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  apmts: Appointment[];
}

const MeetingModal: React.FC<MeetingModalProps> = ({
  isModalOpen,
  handleCancel,
  apmts,
}) => {
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [clinicDentals, setClinicDentals] = useState<ClinicDetail[]>([]);
  const { message } = useNotification();

  useEffect(() => {
    Promise.all([listClinicDentalApi(), listDentistsApi()])
      .then((values) => {
        setClinicDentals(values[0]);
        setDentists(values[1]);
      })
      .catch((e) => {
        console.error(e);
        message.error({ content: "Lỗi lấy thông tin. Vui lòng thử lại sau" });
      })
      .finally(() => setIsModalLoading(false));
  }, []);

  return (
    <Modal
      open={isModalOpen}
      title="Lịch hẹn"
      okText="Đóng"
      onOk={handleCancel}
      footer={null}
      onCancel={handleCancel}
      maskClosable={true}>
      {isModalLoading && <Spin tip="Đang tải, vui lòng chờ" />}
      {!isEmpty(apmts) && !isModalLoading && (
        <List>
          <VirtualList data={apmts} itemKey={"appointments"}>
            {(item: Appointment) => (
              <>
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={
                      `Nha sĩ: ` +
                      dentists.find((x) => x.id === item.dentistId)?.description
                    }
                    description={
                      `Phòng khám: ` +
                      clinicDentals.find((x) => x.id === item.clinicId)?.name
                    }></List.Item.Meta>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}>
                    <Typography.Text strong style={{ textAlign: "right" }}>
                      {dayjs(`${item.startAt}Z`).format("HH:mm a")}
                    </Typography.Text>
                    <Typography>
                      {dayjs(`${item.startAt}Z`).format("DD/MM/YYYY")}
                    </Typography>
                  </div>
                </List.Item>
              </>
            )}
          </VirtualList>
        </List>
      )}
    </Modal>
  );
};

export default BookCalendar;
