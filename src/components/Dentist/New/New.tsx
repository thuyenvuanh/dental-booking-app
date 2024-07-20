import {
  FieldStringOutlined,
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { defaultNewDentist } from "../../../constants/default";
import { useEffect, useState } from "react";
import { listClinicDentalApi } from "../../../services/clinicDental";
import { ClinicDetail } from "../../../type";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

interface NewDentistPageProps {}

const NewDentistPage: React.FC<NewDentistPageProps> = () => {
  const [clinicDentals, setClinicDentals] = useState<ClinicDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    fetchApis().finally(() => setIsLoading(false));
  }, []);

  const fetchApis = async () => {
    setClinicDentals(await listClinicDentalApi());
  };

  const handleCancel = () => {
    if (form.isFieldsTouched(Object.keys(defaultNewDentist), false)) {
      const result = confirm("You sure want to cancel?");
      if (!result) return;
    }
    navigate("/dentist");
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Spin tip="loading, please wait" />
      </Flex>
    );
  }

  return (
    <>
      <Typography.Title level={1}>Thêm nha sĩ mới</Typography.Title>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 218 }}
        initialValues={defaultNewDentist}
        onFinish={(value) => {
          console.log(value);
        }}
        style={{ width: "100%" }}>
        <Typography.Title level={3}>Cơ bản</Typography.Title>
        <Form.Item
          name="firstName"
          label="Họ"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "string",
            },
          ]}>
          <Input prefix={<FieldStringOutlined />} />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Tên"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "string",
            },
          ]}>
          <Input prefix={<FieldStringOutlined />} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tên tài khoản"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "string",
            },
          ]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
          ]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name="rePassword"
          label="Xác nhận mật khẩu"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không trùng khớp"));
              },
            }),
          ]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
            {
              type: "string",
            },
            {
              max: 12,
              min: 10,
              message: "Số điện thoại phải từ 10-12 số",
            },
          ]}>
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item name="dob" label="Ngày sinh">
          <DatePicker />
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="sex"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
          ]}>
          <Radio.Group>
            <Radio value={true}>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Typography.Title level={3}>Thông tin chuyên môn</Typography.Title>
        <Form.Item
          name="description"
          label="Mô tả"
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
        <Form.Item
          name="yearOfExperience"
          label="Kinh nghiệm"
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
          <InputNumber suffix="Năm" defaultValue={1} />
        </Form.Item>
        <Form.Item
          name="licenseNumber"
          label="Mã số bằng"
          rules={[
            {
              required: true,
              message: "Thông tin bắt buộc",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="clinicDentalId"
          label="Chi nhánh"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select placeholder="Chọn 1">
            {clinicDentals.map((cd) => (
              <Select.Option value={cd.id}>{cd.name}</Select.Option>
            ))}
          </Select>
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

export default NewDentistPage;
