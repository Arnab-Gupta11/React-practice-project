import "./App.css";
import ImageUploader from "./components/ImageUploader";
import ImageUploaderUsingHookForm from "./components/ImageUploaderUsingHookForm";
function App() {
  return (
    <>
      <h1 className="text-4xl text-blue-500">Vite + React</h1>
      <h1 className="mb-5">Using React</h1>
      <ImageUploader />

      <h1 className="py-24">Using React Hook Form</h1>

      <ImageUploaderUsingHookForm />
    </>
  );
}

export default App;
