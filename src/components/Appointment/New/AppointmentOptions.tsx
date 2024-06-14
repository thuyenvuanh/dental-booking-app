import { List, Typography, Button } from "antd";
import VirtualList from "rc-virtual-list";
import { AppointmentOptionsType } from "../../../type";

interface OptionsType {
  key: AppointmentOptionsType;
  title: string;
  description: string;
}

const options: OptionsType[] = [
  {
    key: "byDentist",
    title: "Đặt theo nha sĩ",
    description:
      "Tôi muốn đặt nha sĩ riêng để khám, tôi có thể linh hoạt thời gian",
  },
  {
    key: "bySpecificDate",
    title: "Đặt theo ngày cố định",
    description: "Tôi muốn khám vào một ngày xác định, nha sĩ có thể linh hoạt",
  },
];

const AppointmentOptions: React.FC<{
  nextStep: (type: AppointmentOptionsType) => void;
}> = ({ nextStep }) => {
  return (
    <>
      <List>
        <VirtualList
          data={options}
          height={400}
          itemHeight={47}
          itemKey="email">
          {(items: (typeof options)[0]) => (
            <List.Item key={items.key}>
              <List.Item.Meta
                title={<Typography>{items.title}</Typography>}
                description={items.description}
              />
              <Button type="primary" onClick={() => nextStep(items.key)}>
                Tiếp tục
              </Button>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};

export default AppointmentOptions;
