import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon, color, showButtons }) => {
  const navigate = useNavigate();

  const handleRunClick = () => {
    navigate('/admin/lottery');
  };

  const getIcon = () => {
    switch (icon) {
      case "user":
      default:
        return <FaUsers className="fs-4 text-white" />;
    }
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
      <Card className="shadow-sm border-0 flex-fill h-100 w-100">
        <Card.Body className="d-flex flex-column justify-content-between">
          {/* Icon */}
          <div
            className="rounded d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={{
              backgroundColor: color,
              width: "45px",
              height: "45px",
              borderRadius: "10px",
            }}
          >
            {getIcon()}
          </div>

          {/* Text */}
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="fw-bold">{value}</h3>
          </div>

          {/* Buttons */}
          {showButtons && (
            <div className="d-flex gap-2 mt-3">
              <Button variant="success" size="sm" onClick={handleRunClick}>
                RUN
              </Button>
              <Button variant="danger" size="sm">
                RESET
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>

  );
};

export default StatCard;
