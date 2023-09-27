import GetFile from "../componets/GetFile";
import { useNavigate } from "react-router";

const Home = (props) => {
  const { setUrl, setFileTree, url } = props;
  const navigate = useNavigate();
  const handleSubmission = () => {
    setUrl(document.getElementById("url_form_id").value);
    navigate("/MainPage");
  };

  return (
    <div className="flex flex-col w-screen h-screen p-5 justify-center items-center">
      <div className="flex-grow"></div>
      <div className="flex items-center">
        <label>Choose Root Component (ie. App.jsx): </label>
        <GetFile setter={setFileTree} />
      </div>
      <div className="flex">
        <label>Input the website: </label>
        <input type="text" id="url_form_id" defaultValue={url} />
      </div>

      <button onClick={handleSubmission} className="self-end justify-self-end">
        Next
      </button>
    </div>
  );
};

export default Home;
