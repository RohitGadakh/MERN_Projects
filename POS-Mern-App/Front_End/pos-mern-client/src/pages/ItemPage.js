import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  const [popupModel, setPopupModel] = useState(false);
  //for editinng
  const [editItem, seteditItem] = useState(null);
  const getAllItems = async () => {
    try {
      dispatch({ type: "Show_Loading" });
      const { data } = await axios.get(
        "http://localhost:5000/api/items/get-items"
      );
      setItemData(data);
      dispatch({ type: "Hide_Loading" });
      console.log(data);
    } catch (err) {
      dispatch({ type: "Hide_Loading" });
      console.log(err);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);


  const handleDelete=async(record)=>{
    try {
      dispatch({ type: "Show_Loading" });
      await axios.post(
        "http://localhost:5000/api/items/delete-item",{itemId:record._id});
      message.success("Item Deleted Successfully");
      getAllItems();
      setPopupModel(false);
      dispatch({ type: "Hide_Loading" });
    } catch (err) {
      dispatch({ type: "Hide_Loading" });
      message.error("Something went wrong");
      console.log(err);
    }
  }


  // Table Data
  const columans = [
    { title: "Name", dataIndex: "name" },

    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },

    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          
          <EditOutlined className="mx-3" style={{ cursor: "pointer" }} 
              onClick={()=>{
                seteditItem(record);
                setPopupModel(true)
              }}/>
              <DeleteOutlined style={{ cursor: "pointer" }} 
              onClick={()=>{
                handleDelete(record);
              }}
              />
        </div>
      ),
    },
  ];
  // handle form data
  const handleSubmit = async (value) => {
    if(editItem===null){
      try {
        dispatch({ type: "Show_Loading" });
        const res = await axios.post(
          "http://localhost:5000/api/items/add-items",
          value
        );
        message.success("Item added Successfully");
        getAllItems();
        setPopupModel(false);
        dispatch({ type: "Hide_Loading" });
      } catch (err) {
        message.error("Something went wrong");
        console.log(err);
      }
    }else{
      try {
        dispatch({ type: "Show_Loading" });
       await axios.put(
          "http://localhost:5000/api/items/edit-item",
          {...value,itemId:editItem._id}
        );
        message.success("Item Updated Successfully");
        getAllItems();
        setPopupModel(false);
        dispatch({ type: "Hide_Loading" });
      } catch (err) {
        dispatch({ type: "Hide_Loading" });
        message.error("Something went wrong");
        console.log(err);
      }
    }
      
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopupModel(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columans} dataSource={itemData} />
    {
      popupModel &&(
        <Modal
        title={`${editItem!==null?'Edit Item':'Add New Item'}`}
        open={popupModel}
        onCancel={() =>{
          seteditItem(null)
          setPopupModel(false)

        }}
        footer={false}
      >
        <Form layout="vertical" initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="rice">Rice</Select.Option>
              <Select.Option value="noodles">Noodles</Select.Option>
            </Select>
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
      )
    }
    </DefaultLayout>
  );
};

export default ItemPage;
