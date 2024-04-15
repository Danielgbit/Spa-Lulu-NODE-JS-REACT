import { useEffect, useState } from "react";
import { getCategories } from "../../../services/ProductService";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";

const CategoryContainer = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await getCategories();
      if (response.status === 200) {
        setAllCategories(response.data.allCategories);
      }
    };
    loadCategories();
  }, []);

  const menu = (
    <Menu>
      {allCategories?.map((category, i) => (
        <Menu.Item key={i}>
          <Link to={`/products/category/${category.categoryId}`}>{category.categoryName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button style={{ fontSize: '11px' }} className="dropdown-custom">
          Categorías <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CategoryContainer;
