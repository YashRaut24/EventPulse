import { useEffect, useState } from 'react';
import Signin from '../AlwaysUse/Signin';
import AddWork from '../AlwaysUse/AddWork';

var count = 0;

function Home() {
  var [Login, setLogin] = useState(false);
  var [LoginData, setLoginData] = useState({ Name: "", Email: "", Password: "" });
  var [Work, setWork] = useState(false);

  useEffect(() => {
    if (Login) count++;
  }, [Login]);

  return (
    <>
      <div className="max-w-7xl mx-auto flex gap-6 px-4">
        {/* Left Sidebar */}
        <div className="w-1/5 mt-6 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">Main</h2>
            <p>Your profile details here</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">More</h2>
            <p>Your connections & updates</p>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 mt-6 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2">Start a post</h2>
            <textarea
              className="w-full border rounded-md p-2 focus:outline-none"
              placeholder="What do you want to talk about?"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => {
                setLogin(true);
                if (!Work) setWork(true);
              }}
            >
              Add Work
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2">Feed</h2>
            <p>Your latest posts and network updates will appear here.</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 mt-6 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">Suggestions</h2>
            <p>People you may know</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">Trending</h2>
            <p>Trending topics & hashtags</p>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {(Login && count === 0) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <button
            className="absolute top-10 right-10 cursor-pointer bg-red-500 rounded-md p-2"
            onClick={() => setLogin(false)}
          >
            X
          </button>
          <Signin setLoginData={setLoginData} setWork={setWork} />
        </div>
      )}

      {/* Add Work Modal */}
      {(Work && count !== 0) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <button
            className="absolute top-10 right-10 cursor-pointer bg-red-500 rounded-md p-2"
            onClick={() => setWork(false)}
          >
            X
          </button>
          <AddWork setWork={setWork} />
        </div>
      )}
    </>
  );
}

export default Home;
