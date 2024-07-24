import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Tạo lịch hen thành công"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => navigate(routes.USER.APPOINTMENT.VIEW)}>
          Trở lại
        </Button>,
      ]}
    />
  );
};

export default Success;
