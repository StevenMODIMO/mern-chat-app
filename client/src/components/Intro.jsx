import { BsChatRightTextFill } from "react-icons/bs";


export default function Intro({ openForm }) {
  return (
    <div className="h-screen ">
      <div className="h-5/6 flex justify-center items-center">
      <header className="flex justify-center">
        <div
          onClick={openForm}
          className="flex cursor-pointer gap-2 border-2 p-2 border-yellow-500 text-3xl text-center rounded"
        >
          <div>
            <BsChatRightTextFill className="mt-1" />
          </div>
          Chat Now
        </div>
      </header>
      </div>
    </div>
  );
}
