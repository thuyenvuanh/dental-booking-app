import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  TimePicker,
  Typography,
} from "antd";
import { defaultNewClinic } from "../../../constants/default";
import { useNotification } from "../../../hooks/notificationHooks/useNotification";
import { useNavigate } from "react-router-dom";
import { ClinicDetail } from "../../../type";
import { omit } from "lodash";
import { createNewClinicApi } from "../../../services/clinic";
import { useAuth } from "../../../hooks/authHooks/useAuth";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import routes from "../../../constants/routes";

interface NewClinicPageProps {}

const NewClinicPage: React.FC<NewClinicPageProps> = (_) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const { authDetails } = useAuth();
  const { modal } = useNotification();

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      alert("navigating");
      return;
    });
  }, []);

  const handleCancel = () => {
    if (form.isFieldsTouched(Object.keys(defaultNewClinic), false)) {
      modal
        .confirm({
          title: "Hủy chỉnh sửa",
          content: (
            <p>
              Thông tin bác sĩ này có sự thay đổi nhưng{" "}
              <b>chưa được lưu xuống hệ thống.</b> Bạn có muốn hủy thay đổi?
              <hr />
              Xác nhận hủy sẽ trở lại trang danh sách.
            </p>
          ),
          centered: true,
          okText: "Xác nhận",
          okType: "danger",
          cancelText: "Trở lại",
        })
        .then(
          (confirmed) => confirmed && navigate("/clinic"),
          () => {}
        );
    } else {
      navigate("/clinic");
    }
  };

  async function handleSubmit(values: typeof defaultNewClinic): Promise<void> {
    setIsFormDisabled(true);
    let data = {
      ...values,
      openTime: dayjs(values.openCloseTime[0]).format("HH:mm"),
      closeTime: dayjs(values.openCloseTime[1]).format("HH:mm"),
      createAt: new Date(),
      onwerId: authDetails?.userDetails?.id,
    } as ClinicDetail;
    data = omit(data, "openCloseTime");
    createNewClinicApi(data)
      .then(() => {
        message.success({ content: "Thông tin đã được lưu" });
        setTimeout(() => {
          navigate(routes.ADMINISTRATOR.CLINIC.VIEW);
        }, 500);
      })
      .catch((e) => {
        console.error(e);
        message.error({ content: "Lỗi khi lưu thông tin" });
      })
      .finally(() => setIsFormDisabled(false));
  }

  return (
    <>
      <Typography.Title level={1}>Thêm nha sĩ mới</Typography.Title>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 218 }}
        labelWrap
        initialValues={defaultNewClinic}
        onFinish={handleSubmit}
        disabled={isFormDisabled}
        style={{ width: "100%" }}>
        <Form.Item
          name="name"
          label="Tên phòng khám"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "string",
            },
          ]}>
          <Input prefix={<i className="fa-solid fa-heading"></i>} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "string",
            },
          ]}>
          <Input.TextArea style={{ height: "200px" }} />
        </Form.Item>
        <Form.Item label="Giờ hoạt động" name="openCloseTime">
          <TimePicker.RangePicker
            format={"HH:mm"}
            variant="outlined"
            datatype=""
            placeholder={["Mở cửa", "Đóng cửa"]}
          />
        </Form.Item>
        <Form.Item
          name="slotDuration"
          label="Thời gian mỗi slot"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "number",
              message: "Yêu cầu số",
            },
          ]}>
          <InputNumber suffix="phút" min={15} max={120} defaultValue={15} />
        </Form.Item>
        <Form.Item
          name="maxPatientsPerSlot"
          label="Số lượng bệnh nhân mỗi slot"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "number",
              message: "Yêu cầu số",
            },
          ]}>
          <Flex style={{ display: "inline" }}>
            <InputNumber min={1} max={10} defaultValue={1} />
            <span style={{ marginLeft: "8px" }}>Bệnh nhân</span>
          </Flex>
        </Form.Item>
        <Form.Item
          name="maxTreatmentPerSlot"
          label="maxTreatmentPerSlot"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "number",
              message: "Yêu cầu số",
            },
          ]}>
          <Flex style={{ display: "inline" }}>
            <InputNumber min={1} max={10} defaultValue={1} />
            <span style={{ marginLeft: "8px" }}>treatments</span>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Flex justify="end">
            <Space>
              <Button type="default" onClick={handleCancel}>
                Hủy
              </Button>
              <Button htmlType="submit" type="primary">
                Lưu
              </Button>
            </Space>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewClinicPage;
