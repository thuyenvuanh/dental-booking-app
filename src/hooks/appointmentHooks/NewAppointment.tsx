import { createContext, useContext, useState } from "react";
import { AppointmentOptionsType, HookProps } from "../../type";
import { useNavigate } from "react-router-dom";
import {
  defaultSteps,
  newAppointmentByDentist,
  newAppointmentBySpecDay,
} from "../../constants/default";

const NewAppointmentContext = createContext<NewAppointmentProps>({
  apmtType: "byDentist",
  currentStep: 0,
  isFormDirty: false,
  steps: [],
  setSteps: () => {},
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
  steps: { title: string }[];
  setSteps: React.Dispatch<React.SetStateAction<{ title: string }[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setApmtType: React.Dispatch<React.SetStateAction<AppointmentOptionsType>>;
  setIsFormDirty: React.Dispatch<React.SetStateAction<boolean>>;
  handleBack: () => void;
  nextStep: (type: AppointmentOptionsType) => void;
}

const NewAppointmentProvider: React.FC<HookProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<{ title: string }[]>(defaultSteps);
  const [apmtType, setApmtType] = useState<AppointmentOptionsType>("");
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep == 0) {
      navigate(-1);
      return;
    }
    setCurrentStep(currentStep - 1);
    if (currentStep == 1) {
      setSteps(defaultSteps);
    }
  };

  const nextStep = (type: AppointmentOptionsType) => {
    if (type == "") {
      return;
    }
    setApmtType(type);
    setSteps(
      type == "byDentist" ? newAppointmentByDentist : newAppointmentBySpecDay
    );
    setCurrentStep(currentStep + 1);
  };

  return (
    <NewAppointmentContext.Provider
      value={{
        steps,
        setSteps,
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
