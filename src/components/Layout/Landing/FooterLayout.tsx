import { Divider, Flex, Space, Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const LayoutFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#4d59b0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div style={{ maxWidth: "1100px", width: "100%" }}>
        <Flex align="start" justify="space-between">
          <div style={{ maxWidth: "25%" }}>
            <img style={{ marginTop: "28px" }} src="./footer-logo.png" />
            <Typography style={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </div>
          <div style={{ maxWidth: "25%", height: "100%" }}>
            <Typography.Title level={3} style={{ color: "white" }}>
              Contact Us
            </Typography.Title>
          </div>
        </Flex>
        <Divider style={{ backgroundColor: "#f9f9f9" }} />
        <Flex justify="space-between">
          <div style={{ maxWidth: "50%" }}>
            <Typography.Text style={{ color: "white" }}>
              © 2024 DentistApp. All rights reserved.
            </Typography.Text>
          </div>
          <Space style={{ maxWidth: "50%" }}>
            <Typography.Link>
              <Link to="" style={{ color: "white" }}>
                Terms and Conditions
              </Link>
            </Typography.Link>
            <Link to="" style={{ color: "white" }}>
              Privacy Policy
            </Link>
          </Space>
        </Flex>
      </div>
    </Footer>
  );
};

export default LayoutFooter;
