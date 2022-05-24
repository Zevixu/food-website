import React, { useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Card, Collapse, Row } from "react-bootstrap";
import { useState } from "react";
import { listDishesAPI, listRestaurantsAPI } from "../../client/food";
import { useDispatch, useSelector } from "react-redux";
import { APPEND_NEW_DISHES, CHANGE_NUMBER } from "../../redux/actionTypes";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Restaraunt() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [expanded, setExpanded] = useState({});
  const [restaurants, setRestaurants] = useState([]);

  const dishes = useSelector((state) => state.dishes);
  useEffect(fetchData, []);

  function fetchData() {
    // TODO: Delete .catch()
    listRestaurantsAPI().then((res) => setRestaurants(res.data.results)).catch(() => setRestaurants(data));
  }

  // TODO: Delete the following hard coded data.
  const data = [{
    Name: 'HardCodeRestaurantName',
    Cuisine: 'test1test1t1',
    Address: 'test2',
  },
  {
    Name: 'CannotConnectToBackend',
    Cuisine: 'test1r',
    Address: 'test2r',
  },
  {
    Name: 't1',
    Cuisine: 'test1r',
    Address: 'test2r',
  },
  ];
  const dishesHardCode = [
    { Name: 'd1 d1 d1d1', Restaurant: 'HardCodeRestaurantName', Price: 40, Description: 'desc', Cuisine: 'c', Calories: '1000', },
    { Name: 'd2', Restaurant: 'CannotConnectToBackend', Price: 40, Description: 'desc', Cuisine: 'c', Calories: '1000', },
    { Name: 'd3', Restaurant: 'HardCodeRestaurantName', Price: 40, Description: 'desc', Cuisine: 'c', Calories: '1000', },
    { Name: 'd4', Restaurant: 'HardCodeRestaurantName', Price: 40, Description: 'longlonglonglonglonglonglonglonglong', Cuisine: 'longlonglong', Calories: '1000', },
    { Name: 'd5', Restaurant: 't1' },
  ];

  const onExpand = (restaurantName) => {
    if (!(dishes.some((dish) => dish.restaurant === restaurantName))) {
      // TODO: Delete .catch()
      listDishesAPI(restaurantName).then((res) => {
        dispatch({ type: APPEND_NEW_DISHES, payload: res.data.results })
      }).catch(
        () => { dispatch({ type: APPEND_NEW_DISHES, payload: dishesHardCode.filter((dish) => dish.Restaurant === restaurantName) }) }
      )
    }
    let newExpanded = { ...expanded };
    if (!(restaurantName in expanded)) {
      newExpanded[restaurantName] = true;
    }
    else {
      newExpanded[restaurantName] = !newExpanded[restaurantName];
    }
    setExpanded(newExpanded);
  };

  return (
    <div className="Restaurant">
      <div className="lander">
        <h1>Restaurant's List</h1>
        <ListGroup as="ul" variant="flush">
          {
            restaurants.map((restaurant, index) => (
              <div><ListGroup.Item className="d-flex"
                action onClick={() => { onExpand(restaurant.Name) }} variant={(index % 2 === 0) ? "light" : 'secondary'}>
                <div style={{ width: 150, height: 150 }} >
                  <img style={{ width: 150, height: 150 }} src={restaurant.ImageUrl} alt="not found" />
                </div>
                <div >
                  <Row className="fw-bold ms-1" style={{ height: 40 }}>{restaurant.Name}</Row>
                  <Row className="ms-3" >Cuisine: {restaurant.Cuisine}</Row>
                  <Row className="ms-3">Address: {restaurant.Address}</Row>
                </div>
              </ListGroup.Item>
                <Collapse in={expanded[restaurant.Name]}>
                  <ListGroup as="ul" variant="flush">
                    <ListGroup.Item variant='primary' className="d-flex justify-content-between align-items-start">

                      <p style={{ width: 200 }} className="fw-bold">Dish</p>
                      <p style={{ width: 100 }} className="fw-bold">Image</p>
                      <p style={{ width: 100 }} className="fw-bold">Price</p>
                      <p style={{ width: 200 }} className="fw-bold">Cuisine</p>
                      <p style={{ width: 150 }} className="fw-bold">Calories</p>
                      <p style={{ width: 600 }} className="fw-bold">Description</p>
                      <Button variant='link' style={{ width: 90 }} onClick={() => { nav('/myCart') }}>
                        MyCart
                      </Button>
                    </ListGroup.Item>
                    {dishes.map((dish, index) => (dish.restaurant === restaurant.Name && <div>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start">
                        <p style={{ width: 200 }} className="fw-bold">{dish.name}</p>
                        <img style={{ width: 80, height: 80 }} src={dish.src} alt="not found" />
                        <p style={{ width: 20 }}></p>
                        <p style={{ width: 90 }}>{dish.price}$</p>
                        <p style={{ width: 200 }}> {dish.cuisine}</p>
                        <p style={{ width: 150 }}>{dish.calories} </p>
                        <p style={{ width: 600 }}>{dish.description} </p>
                        <Card style={{ display: 'flex', flexDirection: 'row', width: 90 }}>
                          <Button variant='text' size="sm" onClick={() => dispatch({ type: CHANGE_NUMBER, payload: { count: 1, id: index } })}>+</Button>
                          <Badge style={{ marginTop: 6, height: 20 }} bg="primary">
                            {dish.numbers}
                          </Badge>
                          <Button variant='text' disabled={dish.numbers === 0} size="sm" onClick={() => dispatch({ type: CHANGE_NUMBER, payload: { count: -1, id: index } })}>-</Button>
                        </Card>
                      </ListGroup.Item>
                    </div>))
                    }

                  </ListGroup>
                </Collapse></div>))
          }
        </ListGroup>
      </div>
    </div>
  );
}
