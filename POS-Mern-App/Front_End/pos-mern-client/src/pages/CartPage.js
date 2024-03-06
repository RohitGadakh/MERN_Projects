import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { rootReducer } from "./../redux/rootReducer";
import { render } from "@testing-library/react";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, message, Form, Select, Input } from "antd";
import Item from "antd/es/list/Item";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setbillPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);

  const handleIncrement = (record) => {
    dispatch({
      type: "Update_Cart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "Update_Cart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

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
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "Delete_From_Cart",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((Item) => (temp = temp + (Item.price + Item.quantity)));
    setSubTotal(temp);
  }, [cartItems]);

  //handle submit
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };

      await axios.post("http://localhost:5000/api/bills/add-bills", newObject);
      message.success("Bill Generate");
      navigate("/bills");
    } catch (err) {
      message.error("Something went wrong");
      console.log(err);
    }

    //console.log(newObject);
  };

  return (
    <DefaultLayout>
      <h2>CartPage</h2>
      <Table columns={columans} dataSource={cartItems} />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUB TOTAL :Rs <b>{subTotal}</b>/-
        </h3>
        <Button type="primary" onClick={() => setbillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        open={billPopup} //
        onCancel={() => setbillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerContact" label="Contact Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
              <Select.Option value="upi">UPI</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-item">
            <h5>
              Sub Total :Rs<b>{subTotal}</b>/-
            </h5>
            
            <h4>
              Tax
              <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              GRAND TOTAL:
              <b>
                {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
