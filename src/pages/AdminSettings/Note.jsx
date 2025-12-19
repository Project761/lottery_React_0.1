import { useEffect, useState } from "react";
import { fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import axios from "axios";


export default function Note() {

    const CompanyID = localStorage.getItem('companyID') ?? 1
    const [value, setValue] = useState({
        "CompanyID": localStorage.getItem('companyID') || 1,
        'ButtonType': 'PAPER CUT IMAGE',
        'ButtonDetail': '',
        'TextColor': '',
    });


    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("ButtonDetails/GETALL_ButtonDetails", {
            "IsActive": true,
            "ButtonType": "PAPER CUT IMAGE",
            "CompanyID": localStorage.getItem('companyID') || 1,
        });

        console.log("🚀 ~ getPaperImage ~ response:", response);
    }


    const handleSave = async () => {
        console.log(value);

        let error = false;

        if (!value?.ButtonDetail) {
            toast.error(`ButtonDetail is required`);
            error = true;
        }

        if (!value?.TextColor) {
            toast.error(`TextColor is required`);
            error = true;
        }

        if (error) {
            return;
        }

        const formData = new FormData();
        // formData.append("file", null);
        formData.append("Data", JSON.stringify(value));

        const response = await axios.post("ButtonDetails/Insert_ButtonDetails", formData);
        console.log("🚀 ~ handleSave ~ response:", response)
        getPaperImage();
        resetObject();
    };

    const resetObject = () => {
        setValue({
            ...value,
            'ButtonDetail': '',
            'TextColor': '',
        })
    }

    return (
        <div className="container-fluid px-0">
            {/* Add Note Card */}
            <div className="card shadow-sm mb-3">
                <div className="card-header bg-white fw-semibold">
                    Add Note
                </div>
                <div className="card-body">
                    {/* Note Textarea */}
                    <div className="mb-2">
                        <textarea
                            className="form-control"
                            name="ButtonDetail"
                            rows={3}
                            placeholder="Note"
                            value={value?.ButtonDetail}
                            onChange={(e) => { setValue({ ...value, 'ButtonDetail': e.target.value }) }}
                        />
                    </div>

                    {/* Text Color Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="TextColor"
                            className="form-control"
                            placeholder="Enter Text Color"
                            value={value?.TextColor}
                            onChange={(e) => { setValue({ ...value, 'TextColor': e.target.value }) }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="btn btn-success btn-sm px-4" onClick={handleSave}>
                        SUBMIT
                    </button>
                </div>
            </div>

            {/* Empty State Card */}
            <div className="card shadow-sm">
                <div className="card-body text-center py-2">
                    <span className="text-danger small fw-semibold">
                        There Are No Note Available
                    </span>
                </div>
            </div>
        </div>
    );
}
