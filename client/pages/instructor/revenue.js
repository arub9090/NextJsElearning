import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import InstructorRoute from "../../component/routes/InstructorRoute";
import axios from "axios";
import {
  DollarOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helper";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  };

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (err) {
      console.log(err);
      alert("Unable to get the Payout Steeings, Try Again later");
    }
  };

  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report <DollarOutlined className="float-right" />{" "}
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hour
            </small>
            <hr />
            {/* {JSON.stringify(balance, null, 4)} */}
            <h4>
              Pending balance
              {balance.pending &&
                balance.pending.map((bp, i) => (
                  <span key={i} className="float-right">
                    {stripeCurrencyFormatter(bp)}
                  </span>
                ))}
            </h4>
            <small>For last 48 hours</small>
            <hr />
            <h4>
              Payouts{" "}
              {loading ? (
                <SyncOutlined
                  spin
                  className="float-right pointer text-danger"
                />
              ) : (
                <SettingOutlined
                  className="float-right pointer"
                  onClick={handlePayoutSettings}
                />
              )}
            </h4>
            <small>
              Update your stripe account details or view previous payouts.
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
