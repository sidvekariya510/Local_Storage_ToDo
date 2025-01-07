import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const coupons = {
  DISCOUNT10: 10,
  DISCOUNT20: 20,
  DISCOUNT50: 50,
};

const CartComponent = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, name: "Item 1", price: 100, quantity: 1 },
          { id: 2, name: "Item 2", price: 200, quantity: 1 },
          { id: 3, name: "Item 3", price: 300, quantity: 1 },
        ];
  });
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const handleIncrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleCouponApply = () => {
    const discountValue = coupons[couponCode.toUpperCase()];
    if (discountValue) {
      setDiscount(discountValue);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {items.map((item) => (
        <Card key={item.id} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>Price: ${item.price}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            <Typography>Subtotal: ${item.price * item.quantity}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleIncrement(item.id)}
            >
              +
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDecrement(item.id)}
            >
              -
            </Button>
          </CardActions>
        </Card>
      ))}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={8}>
          <TextField
            label="Coupon Code"
            variant="outlined"
            fullWidth
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCouponApply}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total: ${calculateTotal().toFixed(2)}
      </Typography>
    </Container>
  );
};

export default CartComponent;
