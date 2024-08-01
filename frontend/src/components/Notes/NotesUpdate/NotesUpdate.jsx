import React, { useEffect, useState } from "react";
import "./NotesUpdate.scss";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input, message, theme } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";

const NotesUpdate = () => {
  //loading indicator message popup
  const [loadingApi, loadingContextHolder] = message.useMessage();
  const showLoading = (message) => {
    loadingApi.open({
      type: "loading",
      content: `${message}`,
      duration: 0,
    });
  };

  const [noteData, setNoteData] = useState({});
  const navigate = useNavigate();
  const { id: updateId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading("Fetching note data...");
        //fetch note data using the updateId
        const responseNote = await axios.get(`/notes/${updateId}`);
        setNoteData(responseNote.data);
        console.log(responseNote.data[0].title);

        form.setFieldsValue({
          title: responseNote.data[0].title,
          description: responseNote.data[0].description,
        });
        formik.setValues({
          title: responseNote.data[0].title,
          description: responseNote.data[0].description,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          message.error(error.response.data.message);
        }
      } finally {
        // Dismiss manually and asynchronously
        setTimeout(() => loadingApi.destroy(), 0);
      }
    };
    fetchData(); // Ensure data is fetched first
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log("onsubmit ran");
      // formik.resetForm();
      // form.resetFields();

      try {
        // push to db.json
        showLoading("Updating note...");
        axios.put(`notes/${updateId}`, values).then(() => {
          console.log("Note updated");
          message.success("Note updated successfully!", 0.7);

          setTimeout(() => {
            navigate("/notes");
          }, 1000);
        });
      } catch (error) {
        console.error("Error updating note:", error);
      } finally {
        // Dismiss manually and asynchronously
        setTimeout(() => loadingApi.destroy(), 0);
      }
    },
    // validationSchema: validationSchema,
  });

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
      {loadingContextHolder}
      {noteData && (
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
            <TextArea
              id="description"
              name="description"
              autoSize={{
                minRows: 2,
                maxRows: 8,
              }}
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
              Update!
            </Button>
          </Form.Item>
        </Form>
      )}
    </Content>
  );
};

export default NotesUpdate;
