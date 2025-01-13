import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setOutput(data.processed_data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Upload CSV for LLM Processing</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      {output && <pre>{JSON.stringify(output, null, 2)}</pre>}
    </div>
  );
}

export default App;
