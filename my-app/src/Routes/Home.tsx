import GetFile from "../components/GetFile";
import { Tree } from "../types/Tree";

/* 
mint greenish: #1DF28F
darker green: #048C7F
background color: #1B1E26

*/
type HomePageProps = {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  fileTree:Tree;
  setPageState: React.Dispatch<React.SetStateAction<string>>;
  setFileTree: React.Dispatch<React.SetStateAction<Tree>>;
};

const Home = (props: HomePageProps) => {
  const { fileTree, setUrl, setFileTree, url, setPageState } = props;

  // Button Handler to switch Routes
  const handleSubmission = () => {
      setPageState("MainPage");
    }

  const handleChange = () => {
    const urlInputElement = document.getElementById(
      "url_form_id"
    ) as HTMLInputElement;
    if (urlInputElement) {
      setUrl(urlInputElement.value);
  }
}

  return (
<div className="flex flex-col w-screen h-screen p-5 justify-center items-center">
  <div className="bg-logo w-1/2 h-3/4 bg-cover bg-no-repeat bg-center"></div>
  <div className="flex flex-col items-center justify-center rounded-3xl p-4 pl-10 pr-10 space-y-4 w-2/3 bg-gradient-to-b from-secondaryPrimary to-secondaryPrimaryDark">

    <GetFile setter={setFileTree} />

    <div className="flex w-full justify-between">
      <input
        type="text"
        id="url_form_id"
        className="w-1/2 rounded-full p-2 bg-gradient-to-b from-primary to-primaryDark text-secondary text-center border border-1 border-transparent border-b-primaryDark focus:outline-none focus:border-secondary focus:font-bold focus:shadow-lg focus:scale-105 transition duration-300 hover:font-bold hover:border-secondary hover:shadow-lg hover:scale-105"
        defaultValue="http://localhost:8080/"
        onChange={handleChange}
      />
      <button
        onClick={handleSubmission}
        className={`rounded-full p-2 w-1/4 bg-gradient-to-b from-primary to-primaryDark text-secondary border border-1 border-transparent border-b-primaryDark transform transition duration-300 ${
          !url || !fileTree.name
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105'
        }`}        
        disabled={!url || !fileTree.name}
      >
        Next
      </button>
    </div>

  </div>
</div>
  );
};

export default Home;
