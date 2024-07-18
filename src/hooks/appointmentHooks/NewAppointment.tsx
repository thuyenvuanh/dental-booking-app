import { createContext, useContext, useState } from "react";
import { AppointmentOptionsType, HookProps } from "../../type";
import { useNavigate } from "react-router-dom";

const NewAppointmentContext = createContext<NewAppointmentProps>({
  apmtType: "byDentist",
  currentStep: 0,
  isFormDirty: false,
  setApmtType: () => {},
  setCurrentStep: () => {},
  setIsFormDirty: () => {},
  handleBack: () => {},
  nextStep: () => {},
});

export interface NewAppointmentProps {
  currentStep: number;
  apmtType: AppointmentOptionsType;
  isFormDirty: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setApmtType: React.Dispatch<React.SetStateAction<AppointmentOptionsType>>;
  setIsFormDirty: React.Dispatch<React.SetStateAction<boolean>>;
  handleBack: () => void;
  nextStep: (type: AppointmentOptionsType) => void;
}

const NewAppointmentProvider: React.FC<HookProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [apmtType, setApmtType] = useState<AppointmentOptionsType>("");
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep == 0) {
      navigate(-1);
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const nextStep = (type: AppointmentOptionsType) => {
    setApmtType(type);
    setCurrentStep(currentStep + 1);
  };

  return (
    <NewAppointmentContext.Provider
      value={{
        currentStep,
        apmtType,
        isFormDirty,
        setCurrentStep,
        setApmtType,
        setIsFormDirty,
        handleBack,
        nextStep,
      }}>
      {children}
    </NewAppointmentContext.Provider>
  );
};

export const useNewAppointmentContext = () => {
  return useContext(NewAppointmentContext);
};

export default NewAppointmentProvider;
