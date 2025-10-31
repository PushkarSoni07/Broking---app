Member 6 – Portfolio Page
// --- Member 6 START ---
// File: Portfolio.jsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio") || "[]");
    setPortfolio(stored);
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          {portfolio.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            <ul>
              {portfolio.map((item) => (
                <li key={item.id} className="border-b py-2">
                  {item.action.toUpperCase()} {item.quantity} {item.symbol} @ ₹{item.price}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
// --- Member 6 END ---
