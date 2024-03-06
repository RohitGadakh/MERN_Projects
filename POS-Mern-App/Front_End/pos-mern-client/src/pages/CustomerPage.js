import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const getAllBills = async () => {
    try {
      dispatch({ type: "Show_Loading" });
      const { data } = await axios.get(
        "http://localhost:5000/api/bills/get-bills"
      );
      setBillsData(data);
      dispatch({ type: "Hide_Loading" });
      console.log(data);
    } catch (err) {
      dispatch({ type: "Hide_Loading" });
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columans = [
    { title: "Id", dataIndex: "_id" },

    {
      title: "Customer Name",
      dataIndex: "customerName",
    },

    { title: "Contact Number", dataIndex: "customerContact" },
  ];
  return (
    <DefaultLayout>
      <h1>Customer page</h1>
      <Table columns={columans} dataSource={billsData} pagination={false}/>
    </DefaultLayout>
  );
};

export default CustomerPage;
