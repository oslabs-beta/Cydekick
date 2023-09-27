import GetFile from "../componets/GetFile";
import { useNavigate } from "react-router";


/* 
mint greenish: #1DF28F
darker green: #048C7F
background color: #1B1E26

*/
const Home = (props) => {
  const { setUrl, setFileTree, url } = props;
  const navigate = useNavigate();
  const handleSubmission = () => {
    setUrl(document.getElementById("url_form_id").value);
    navigate("/MainPage");
  };

  return (
    <div className="flex flex-col w-screen h-screen p-5 justify-center items-center">
      <div className="bg-logo w-1/2 h-3/4 bg-cover bg-no-repeat bg-center bg-auto"></div>
      <div className="flex flex-col rounded-lg p-2 z-10 w-2/3" style={{backgroundColor: "#048C7F"}}>
      <div className="flex justify-between mb-2">
        <label>Choose Root Component (ie. App.jsx): </label>
        <GetFile setter={setFileTree} />
      </div>
      <div className="flex justify-between items-center">
        <label>Input the website:</label>
        <input type="text" id="url_form_id" defaultValue={url} className="w-50 rounded-lg p-1" style={{backgroundColor: "#1DF28F"}}/>
      </div>
      </div>

      <button onClick={handleSubmission} className="self-end justify-self-end rounded-lg p-2" style={{backgroundColor: "#1DF28F"}}>
        Next
      </button>
    </div>
  );
};

export default Home;
