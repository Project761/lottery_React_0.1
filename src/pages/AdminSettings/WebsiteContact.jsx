import { useState } from "react";

export default function WebsiteContact() {
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Update Contact Information
                </div>
                <hr className="my-2" />

                {/* Email Input */}
                <div className="mb-2">
                    <label className="small fw-semibold text-dark mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Contact Input */}
                <div className="mb-3">
                    <label className="small fw-semibold text-dark mb-1">
                        Contact number
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Enter contact number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button className="btn btn-success btn-sm">
                    UPDATE CONTACT INFO
                </button>

            </div>
        </div>
    );
}
