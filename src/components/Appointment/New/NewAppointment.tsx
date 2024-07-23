import { Button, Steps, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import AppointmentOptions from "./AppointmentOptions";
import NewAppointmentProvider, {
  useNewAppointmentContext,
} from "../../../hooks/appointmentHooks/NewAppointment";
import FormByDentist from "./FormByDentist";
import FormBySpecDate from "./FormBySpecDate";

const steps = [
  {
    title: "Hình thức đặt lịch",
  },
  {
    title: "Điền thông tin",
  },
  {
    title: "Thành công",
  },
];

const NewAppointment: React.FC = () => {
  return (
    <NewAppointmentProvider>
      <Typography.Title level={3}>Đặt lịch khám</Typography.Title>
      <ContextLayer />
    </NewAppointmentProvider>
  );
};

const ContextLayer = () => {
  const { currentStep, apmtType, handleBack, nextStep } =
    useNewAppointmentContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "stretch",
        }}>
        <Button onClick={handleBack} icon={<LeftOutlined />}>
          Trở về
        </Button>
        <div style={{ width: "12px" }}></div>
        <Steps current={currentStep} items={steps} />
      </div>
      {currentStep == 0 && <AppointmentOptions nextStep={nextStep} />}
      {currentStep == 1 && apmtType == "byDentist" && <FormByDentist />}
      {currentStep == 1 && apmtType == "bySpecificDate" && <FormBySpecDate />}
      {currentStep == 2 && <>Success</>}
    </>
  );
};

export default NewAppointment;
