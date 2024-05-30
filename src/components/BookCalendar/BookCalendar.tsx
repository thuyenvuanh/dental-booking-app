import {Alert, Calendar, CalendarProps, List, Modal, Typography} from "antd";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {Appointment} from "../../type.ts";
import React, {useCallback, useState} from "react";
import {isEmpty} from "lodash";
import VirtualList from 'rc-virtual-list';

interface BookCalendarProps {
    appointments: Appointment[];
}

const BookCalendar: React.FC<BookCalendarProps> = ({appointments}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apmts, setApmts] = useState<Appointment[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const deepCopy: <Type>(value: Type) => Type = function <Type>(value: Type) {
        return JSON.parse(JSON.stringify(value)) as Type;
    }

    const showModal = (date: Dayjs) => {
        if (getEventOfDay(date).length != 0) {
            const sortedApmts = deepCopy(getEventOfDay(date));
            setApmts(sortedApmts.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))));
            if (selectedDate.getMonth() == date.month()) {
                setIsModalOpen(true);
            }
            setSelectedDate(date.toDate());
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setApmts([]);
    };

    const getEventOfDay = useCallback((date: Dayjs): Appointment[] => {
        return appointments
            .filter(a => dayjs(a.date)
                .startOf("day")
                .diff(date.startOf("day")) == 0);
    }, [appointments]);

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getEventOfDay(value);
        if (listData.length != 0) return <Alert message={`${listData.length} event${listData.length > 1 ? "s" : ""}`}/>;
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return <>
        <Modal
            open={isModalOpen}
            title='Appointments'
            okText="Close"
            onOk={handleCancel}
            footer={null}
            onCancel={handleCancel}
            maskClosable={true}
        >
            {!isEmpty(apmts) && <List>
                <VirtualList data={apmts} itemKey={"appointments"}>
                    {
                        (item: Appointment) => (
                            <>
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        title={item.dentistId}
                                        description={item.clinicId}>
                                    </List.Item.Meta>
                                    <div style={{display: "flex", flexDirection: 'column', justifyContent: 'end'}}>
                                        <Typography.Text
                                            strong
                                            style={{textAlign: "right"}}
                                        >
                                            {dayjs(item.date).format('HH:MM')}
                                        </Typography.Text>
                                        <Typography>{dayjs(item.date).format('DD/MM/YYYY')}</Typography>
                                    </div>
                                </List.Item>
                            </>
                        )
                    }
                </VirtualList>
            </List>}
        </Modal>
        <Calendar cellRender={cellRender} onSelect={showModal}/>
    </>
}

export default BookCalendar;