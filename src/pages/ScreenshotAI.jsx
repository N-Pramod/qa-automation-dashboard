import { useState } from "react";
import axios from "axios";

function ScreenshotAI() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analysis, setAnalysis] = useState("");

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setAnalysis("");
    };

    const uploadImage = async () => {

        if (!selectedFile) {

            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {

            const response = await axios.post(
                "http://localhost:8080/screenshot/upload",
                formData
            );

            console.log(response.data);

            setAnalysis(response.data.analysis);

        } catch (error) {

            console.error(error);

            alert("Upload Failed");
        }
    };

    return (

        <div className="screenshot-container">

            <h1>Screenshot AI Test Generator</h1>

            <p>
                Upload any application screenshot and let AI generate
                professional test cases automatically.
            </p>

            <div className="upload-card">

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <br /><br />

                <button onClick={uploadImage}>
                    Upload Screenshot
                </button>

            </div>

            {preview && (

                <div className="preview-card">

                    <h2>Image Preview</h2>

                    <img
                        src={preview}
                        alt="preview"
                        className="preview-image"
                    />

                </div>

            )}

{analysis && (

    <div
        style={{
            marginTop: "30px",
            width: "100%",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            overflowX: "auto",
            textAlign: "left"
        }}
    >

        <h2 style={{ marginBottom: "20px" }}>
            🤖 AI Analysis
        </h2>

        <pre
            style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                fontFamily: "Arial, sans-serif",
                fontSize: "15px",
                lineHeight: "1.8",
                margin: 0
            }}
        >
            {analysis}
        </pre>

    </div>

)}

        </div>

    );

}

export default ScreenshotAI;