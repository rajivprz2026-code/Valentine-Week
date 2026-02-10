import { useState } from "react";

interface NameFormProps {
  // optional callback if you want to auto-proceed
  onSubmit?: (boy: string, girl: string) => void;
}

const NameForm = ({ onSubmit }: NameFormProps) => {
  const [boy, setBoy] = useState("");
  const [girl, setGirl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boy.trim() || !girl.trim()) return;

    // generate link with query params
    const link = `${window.location.origin}?boy=${encodeURIComponent(
      boy.trim()
    )}&girl=${encodeURIComponent(girl.trim())}`;

    setGeneratedLink(link);

    // call parent callback if needed (optional)
    if (onSubmit) onSubmit(boy.trim(), girl.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-rose-200 p-4">
      <h1 className="text-4xl font-bold text-rose-800 mb-6 text-center">
        Enter Your Names 💕
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-white/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
      >
        <input
          type="text"
          placeholder="Boy's Name"
          value={boy}
          onChange={(e) => setBoy(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          required
        />

        <input
          type="text"
          placeholder="Girl's Name"
          value={girl}
          onChange={(e) => setGirl(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          required
        />

        <button
          type="submit"
          className="py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition duration-200"
        >
          Generate Link 💖
        </button>
      </form>

      {generatedLink && (
        <div className="mt-6 text-center bg-white/70 p-4 rounded-lg shadow-md w-full max-w-sm">
          <p className="mb-2 font-medium text-gray-700">Share this link:</p>
          <input
            type="text"
            readOnly
            value={generatedLink}
            className="w-full p-2 rounded border border-gray-300 text-sm"
          />
          <button
            onClick={handleCopy}
            className="mt-2 py-2 px-4 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default NameForm;
