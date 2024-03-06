import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState,useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Button, Modal, message } from "antd";
import "../styles/InvoiceStyles.css";
const BillsPage = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [popupModel, setPopupModel] = useState(false);
  const [selectedBill, setselectedBill] = useState(null);
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
//print functionality
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  // Table Data
  const columans = [
    { title: "Id", dataIndex: "_id" },

    {
      title: "Customer Name",
      dataIndex: "customerName",
    },

    { title: "Contact Number", dataIndex: "customerContact" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Total Ammount", dataIndex: "totalAmmount" },
    { title: "Tax", dataIndex: "tax" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setselectedBill(record);
              setPopupModel(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columans} dataSource={billsData} />
      {popupModel && (
        <Modal
          title="Invoice Details"
          open={popupModel}
          onCancel={() => {
            setPopupModel(false);
          }}
          footer={false}
        >
         {/* //invoice model */}

     <div id="invoice-POS" ref={componentRef}>
      <center id="top">
        <div className="logo"/>
         <div className="info">
          <h2 className="pos-name">POS</h2>
          <p>Contact:7769006485 | Pune Maharashtra</p>
         </div>
         {/* info end */}
      </center>
      {/* end invoiceTop */}
      <div id="mid">
        <div className="mt-2">
          <p>
            Customer Name : <b>{selectedBill.customerName}</b>
          <br />
          Phone No : <b>{selectedBill.customerContact}</b>
          <br />
          Date : <b>{selectedBill.date.toString().substring(0,10)}</b>
          <br />
          </p>
          <hr style={{margin:'5px'}}/>
        </div>
      </div>
      {/* End invoice mid */}
      <div id="bot">
        <div id="table">
          <table>
            <tbody>
              <tr className="tabletitle">
               <td className="item">
                <h2>Item</h2>
               </td>
               <td className="Quantity">
                <h2>Qty</h2>
               </td>
               <td className="Rate">
                <h2>Price</h2>
               </td>
               <td className="Rate">
                <h2>Total</h2>
               </td>
              </tr>
              {selectedBill.cartItems.map((item)=>{
                <>
                <tr className="service">
                  <td className="tableitem">
                    <p className="itemtext">{item.name}</p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{item.quantity}</p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{item.price}</p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{item.quantity*item.price}</p>
                  </td>
                </tr>
                </>
              })}
              <tr className="tabletitle">
                <td/>
                <td/>
                <td className="Rate">
                  <h2>tax</h2>
                </td>
                <td className="payment">
                  <h2>${selectedBill.tax}</h2>
                </td>
              </tr>
              <tr className="tabletitle">
              <td/>
                <td/>
                <td className="Rate">
                  <h2>Grand Total</h2>
                </td>
                <td className="payment">
                  <h2>
                    <b>${selectedBill.totalAmmount}</b>
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* End table */}

        <div id="legalcopy">
          <p className="legal">
            <strong>Thank you for your order!!</strong> 10% GST application
            on total ammount. Please note that this is non refundable amount
            for any assistance please write email
            <b>help@mydomain.com</b>
          </p>
        </div>
      </div>
      {/* End InvoiceBox */}
     </div>
    {/* End Invoice */}

    {/* --------------Invoice modal ends ---------------- */}
        <div className="d-flex justify-content-end mt-3 " >
          <Button type="primary" onClick={handlePrint}>Print</Button>
        </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};
export default BillsPage;
