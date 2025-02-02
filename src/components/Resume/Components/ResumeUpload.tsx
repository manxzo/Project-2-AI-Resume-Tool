import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { Button, Input,Textarea } from "@heroui/react";
const ResumeUploader = ({ setResume }) => {
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    const extractText = async () => {
      try {
        const converted = await pdfToText(file);
        setResumeText(converted.trim());
      } catch (error) {
        console.error("Failed to extract text from pdf");
      }
    };
    extractText();
  }, [file]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setFile(selectedFile);
  };
  const handleClear = () => {
    setResumeText("");
  };
  const handleSubmit = () => {
    if (!resumeText.trim()) {
      alert("Please enter or upload a resume before submitting.");
      return;
    }
    setResume(resumeText);
  };
  return (
    <div className="flex flex-col gap-4">

    <div className="flex gap-2">
      <Input type="file" accept=".pdf" onChange={handleFileChange} className="w-full" />
      <Button color="primary" onPress={handleClear}>Clear</Button>
    </div>
    <Textarea
      color="default"
      value={resumeText}
      placeholder="Paste or edit resume text here..."
      onChange={(event) => setResumeText(event.target.value)}
      className="w-full h-60 resize-y p-3 border rounded-md"
      size="lg"
    />

    <Button color="success" className="w-full" onPress={handleSubmit}>Get AI Insights</Button>
  </div>
  );
};

export default ResumeUploader;
