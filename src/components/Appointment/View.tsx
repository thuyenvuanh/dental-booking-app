import {Button, Col, Divider, Row, Typography} from "antd";
import BookCalendar from "../BookCalendar/BookCalendar.tsx";
import {useEffect, useState} from "react";
import {mockAppointments} from "../../mocks/appoinments.ts";
import {Appointment} from "../../type.ts";

const AppointmentView: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    function getAppointments() {
        setAppointments(mockAppointments);
    }

    useEffect(() => {
        getAppointments();
    }, [])

    return (
        <>
            <Row justify='space-between' align='middle'>
                <Col span={20}>
                    <Typography.Title level={3}>View Appointment</Typography.Title>
                </Col>
                <Col>
                    <Button size='large' type='primary'>Book new</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <BookCalendar appointments={appointments}/>
                </Col>
            </Row>
            <Divider/>
        </>
    )
};

export default AppointmentView;
