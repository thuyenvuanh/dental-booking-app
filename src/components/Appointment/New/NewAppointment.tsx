import { Button, Steps, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import AppointmentOptions from "./AppointmentOptions";
import NewAppointmentProvider, {
  useNewAppointmentContext,
} from "../../../hooks/appointmentHooks/NewAppointment";
import FormByDentist from "./FormByDentist";
import FormBySpecDate from "./FormBySpecDate";
import Success from "./Success";

const NewAppointment: React.FC = () => {
  return (
    <NewAppointmentProvider>
      <Typography.Title level={3}>Đặt lịch khám</Typography.Title>
      <ContextLayer />
    </NewAppointmentProvider>
  );
};

const ContextLayer = () => {
  const { currentStep, apmtType, handleBack, nextStep, steps } =
    useNewAppointmentContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "stretch",
        }}>
        {currentStep < 3 && (
          <Button onClick={handleBack} icon={<LeftOutlined />}>
            Trở về
          </Button>
        )}
        <div style={{ width: "12px" }}></div>
        <Steps current={currentStep} items={steps} />
      </div>
      {currentStep == 0 && <AppointmentOptions nextStep={nextStep} />}
      {[1, 2].includes(currentStep) && apmtType == "byDentist" && (
        <FormByDentist />
      )}
      {[1, 2].includes(currentStep) && apmtType == "bySpecificDate" && (
        <FormBySpecDate />
      )}
      {currentStep == 3 && <Success />}
    </>
  );
};

export default NewAppointment;
