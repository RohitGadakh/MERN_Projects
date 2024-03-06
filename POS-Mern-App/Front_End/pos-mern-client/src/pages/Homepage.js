import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
const Homepage = () => {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageURL:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "rice",
      imageURL:
        "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpY2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "noodles",
      imageURL:
        "https://images.unsplash.com/photo-1600490036275-35f5f1656861?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
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
        console.log(err);
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={()=>setSelectedCategory(category.name)}
          >
            <h4> {category.name}</h4>
            <img
              src={category.imageURL}
              alt={category.name}
              height="40px"
              width="60px"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemData.filter(i=>i.category===selectedCategory).map((Item) => (
          <Col key={Item._id} xs={24} lg={6} md={12} sm={6}>
            <ItemList key={Item._id} item={Item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
