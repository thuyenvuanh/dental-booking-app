import { Button, Typography } from "antd";
import { useNewAppointmentContext } from "../../../hooks/authHooks/NewAppointment";

const FormByDentist = () => {
  const { currentStep, setCurrentStep } = useNewAppointmentContext();
  const submit = () => {
    setCurrentStep(currentStep + 1);
  };
  return (
    <>
      <Typography>Đặt lịch theo nha sĩ</Typography>
      <Button onClick={submit}>Đặt lịch</Button>
    </>
  );
};

export default FormByDentist;
