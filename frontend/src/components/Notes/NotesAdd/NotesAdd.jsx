import { Button, Form, Input, Select, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotesAdd = () => {
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log("onsubmit ran");
      formik.resetForm();
      form.resetFields();

      try {
        // push to db
        axios
          .post("/notes/new", values, { headers: { user_id: session.user_id } })
          .then(() => {
            console.log("Note added");
            navigate("/notes");
          });
      } catch (error) {
        console.error("Error adding note:", error);
      }
    },
    // validationSchema: validationSchema,
  });

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  let validationSchema = Yup.object({
    title: Yup.string().required("Needs a title").min(2, "Too Short!"),
    description: Yup.string()
      .required("At least say something")
      .min(10, "Too Short!"),
  });

  const yupSync = {
    async validator({ field }, value) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };

  return (
    <Content
      style={{
        padding: 24,
        margin: "16px",
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Form
        form={form}
        onFinish={formik.handleSubmit}
        {...formItemLayout}
        variant="filled"
        style={{
          // maxWidth: 600,
          width: "100%",
        }}
      >
        <Form.Item label="Title" name="title" rules={[yupSync]}>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[yupSync]}>
          <Input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            sm: { offset: 6 }, // large screen: {span: 14}
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit" block size="large">
            Create!
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default NotesAdd;
