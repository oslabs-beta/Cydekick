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
  setPageState: React.Dispatch<React.SetStateAction<string>>;
  setFileTree: React.Dispatch<React.SetStateAction<Tree>>;
};

const Home = (props: HomePageProps) => {
  const { setUrl, setFileTree, url, setPageState } = props;

  // Button Handler to switch Routes
  const handleSubmission = () => {
    const urlInputElement = document.getElementById(
      "url_form_id"
    ) as HTMLInputElement;
    if (urlInputElement) {
      setUrl(urlInputElement.value);
      setPageState("MainPage");
    }
  };

  return (
<div className="flex flex-col w-screen h-screen p-5 justify-center items-center">
  <div className="bg-logo w-1/2 h-3/4 bg-cover bg-no-repeat bg-center"></div>
  <div className="flex flex-col items-center justify-center rounded-3xl p-4 pl-10 pr-10 space-y-4 w-2/3 bg-gradient-to-b from-secondaryPrimary to-secondaryPrimaryDark">

    <GetFile setter={setFileTree} />

    <div className="flex w-full justify-between">
      <input
        type="text"
        id="url_form_id"
        className="w-1/2 rounded-full p-2 bg-primary text-secondary text-center border border-transparent focus:outline-none focus:border-secondary transition duration-300 hover:shadow-lg"
        placeholder="Enter URL"
      />
      <button
        onClick={handleSubmission}
        className="rounded-full p-2 w-1/4 bg-transparent text-primary hover:bg-primary hover:text-secondary transform transition duration-300 hover:scale-105"
      >
        Next
      </button>
    </div>

  </div>
</div>
  );
};

export default Home;
