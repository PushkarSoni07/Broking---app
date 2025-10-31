
//Member 1 – Signup & OTP Pages
// --- Member 1 START ---
// File: Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignup = () => {
    if (!name || !aadhaar || !pan || !mobile) {
      toast({ title: "Error", description: "Please fill all fields" });
      return;
    }
    localStorage.setItem("userData", JSON.stringify({ name, aadhaar, pan, mobile }));
    localStorage.setItem("isAuthenticated", "false");
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 bg-card shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2" />
        <Input placeholder="Aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} className="mb-2" />
        <Input placeholder="PAN" value={pan} onChange={(e) => setPan(e.target.value)} className="mb-2" />
        <Input placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="mb-4" />
        <Button onClick={handleSignup}>Signup</Button>
      </div>
    </div>
  );
};

export default Signup;

// File: OTPVerification.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
      toast({ title: "Success", description: "OTP Verified" });
    } else {
      toast({ title: "Error", description: "Incorrect OTP" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 bg-card shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="mb-4" />
        <Button onClick={handleVerify}>Verify OTP</Button>
      </div>
    </div>
  );
};

//export default OTPVerification;
// --- Member 1 END ---
