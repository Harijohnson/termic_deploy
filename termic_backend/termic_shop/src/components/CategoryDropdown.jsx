// CategoryDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';

const CategoryDropdown = () => {
  const productList = useSelector((state) => state.productList);
  const { categories } = productList;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item key={category} as={Link} to={`/search?category=${category}`}>
            {category}
          </Dropdown.Item>
        ))} 
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryDropdown;
