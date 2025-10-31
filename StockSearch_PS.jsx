// File: StockSearch.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const StockSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await new Promise(r => setTimeout(r, 1000));
    const mockResults = [
      {
        symbol: searchQuery.toUpperCase(),
        name: ${searchQuery} Ltd.,
        price: Math.floor(Math.random() * 5000) + 100,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.floor(Math.random() * 1000000) + 10000
      }
    ];
    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const handleBuySell = (action, stock) => {
    const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");
    portfolio.push({
      id: Date.now(),
      symbol: stock.symbol,
      name: stock.name,
      action,
      price: stock.price,
      quantity: 1,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    toast({ title: ${action.toUpperCase()} Order Placed, description: ${action} 1 share of ${stock.symbol} at ₹${stock.price} });
  };

  return (
    <Card className="shadow-card border-border">
      <CardHeader>
        <CardTitle>Stock Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input placeholder="Enter stock symbol" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button onClick={handleSearch} disabled={!searchQuery || isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
        {searchResults.map((stock, i) => (
          <Card key={i} className="mb-2 cursor-pointer" onClick={() => navigate(/stock/${stock.symbol.toLowerCase()})}>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="font-bold">{stock.symbol}</p>
                <p>{stock.name}</p>
                <p>₹{stock.price.toFixed(2)} ({stock.change.toFixed(2)})</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" onClick={(e)=>{e.stopPropagation(); handleBuySell('buy', stock)}}>Buy</Button>
                <Button size="sm" variant="destructive" onClick={(e)=>{e.stopPropagation(); handleBuySell('sell', stock)}}>Sell</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
