import { Button, Steps, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { My3 } from "../Appointment.style";
import AppointmentOptions from "./AppointmentOptions";
import NewAppointmentProvider, {
  useNewAppointmentContext,
} from "../../../hooks/authHooks/NewAppointment";
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
      <Steps current={currentStep} items={steps} />
      <My3>
        <Button onClick={handleBack} icon={<LeftOutlined />}>
          Trở về
        </Button>
      </My3>
      {currentStep == 0 && <AppointmentOptions nextStep={nextStep} />}
      {/* TODO: create form for this */}
      {currentStep == 1 && apmtType == "byDentist" && <FormByDentist />}
      {currentStep == 1 && apmtType == "bySpecificDate" && <FormBySpecDate />}
      {currentStep == 2 && <>Success</>}
    </>
  );
};

export default NewAppointment;
