// OrderConfirmationMail.tsx
import React from "react";

interface Order {
  _id: any;
  date: string;
  name: string;
  price: number;
}

interface OrderConfirmationMailProps {
  order: Order;
}

const OrderConfirmationMail: React.FC<OrderConfirmationMailProps> = ({
  order,
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Confirmation</title>
        <style>
          {` body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }

                    .container {
                        max-width: 600px;
                        margin: 30px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }

                    .header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #ddd;
                    }

                    .header h1 {
                        font-size: 24px;
                        color: #0073e6;
                    }

                    .header p {
                        font-size: 16px;
                        color: #555;
                    }

                    .order-details {
                        margin: 20px 0;
                    }

                    .order-details h4 {
                        font-size: 18px;
                        color: #0073e6;
                        margin-bottom: 10px;
                    }

                    .order-info,
                    .order-summary,
                    .order-total {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 10px;
                    }

                    .order-info td,
                    .order-summary td,
                    .order-total td {
                        padding: 8px;
                        border: 1px solid #ddd;
                        font-size: 14px;
                    }

                    .order-info td:first-child,
                    .order-summary td:first-child,
                    .order-total td:first-child {
                        font-weight: bold;
                        color: #0073e6;
                    }

                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                    }

                    .footer p {
                        font-size: 14px;
                        color: #777;
                    }

                    .footer a {
                        color: #0073e6;
                        text-decoration: none;
                    }

                    .footer a:hover {
                        text-decoration: underline;
                    }

                    `}
        </style>
      </head>

      <body>
        <div className="container">
          <div className="header">
            <h1>Your eLearning Order is Confirmed</h1>
            <p>And we're just as excited as you are!</p>
          </div>

          <div className="order-details">
            <h4>Here's what you ordered:</h4>
            <table className="order-info">
              <tr>
                <td>Order #:</td>
                <td>{order._id}</td>
                <td>Order Date:</td>
                <td>{order.date}</td>
              </tr>
            </table>

            <table className="order-summary">
              <tr>
                <td>Item</td>
                <td>Qty</td>
                <td>Cost</td>
              </tr>
              <tr>
                <td>{order.name}</td>
                <td>1</td>
                <td>{order.price}</td>
              </tr>
            </table>

            <table className="order-total">
              <tr>
                <td>Subtotal:</td>
                <td>{order.price}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{order.price}</td>
              </tr>
            </table>
          </div>

          <div className="footer">
            <p>
              If you have any questions about your order, please contact us at{" "}
              <a href="mailto:support@Lacodemy.com">support@Lacodemy.com</a>
            </p>
            <p>&copy; 2024 eLearning. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default OrderConfirmationMail;
