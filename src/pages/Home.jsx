import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 565 });
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-4/5 mx-auto text-white mt-9">
        <div className="md:w-4/6 w-full text-white">
          <span className="font-bungee text-lg text-black tracking-wide mr-1">POINTS</span>
          is a tournament management app made for eSports lovers. Manage multiple teams and matches. Points table is generated automatically and it comes with an inbuilt Points table maker.
        </div>
      </div>

      {
        isMobile ? <img src="./bgmi.png" className="w-full bottom-0 z-0 fixed" alt="Mobile Background" /> : <img src="./anime.png" className="md:w-3/6 md:h-4/5 w-full bottom-0 md:right-0 z-0 fixed" alt="Desktop Background" />
      }

      <div className="w-4/5 mx-auto mt-10 text-white relative z-10">
        {
          showInstructions ? <button
            onClick={toggleInstructions}
            className="btn-grad hover:bg-right font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <EyeSlashIcon className='w-6 h-6' />
          </button> :
            <button
              onClick={toggleInstructions}
              className="btn-grad hover:bg-right  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <EyeIcon className='w-6 h-6' />
            </button>
        }

        {showInstructions && (
          <div>
            <div className="my-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-md p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-cardNumber rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Create a tournament</h1>
                  <p className="text-black mb-2">
                    Click on 'Create a new tournament' card. A form will appear. Fill up the details such as Tournament name, links, etc. Set the points system for the tournament. Proper guidelines are provided in the form.
                  </p>
                </div>
              </div>
            </div>


            <div className="my-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-md p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-cardNumber rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Add Teams</h1>
                  <p className="text-black mb-2">
                    Go to the manage section of the tournament after creation. Go to the 'Teams' section. Add the team name and its player name. Though adding player names is optional, they are highly recommended. Because while entering the results of matches, you can just search the team by its player name as well if they are added. Teams can be added or disqualified (removed) anytime you want.
                  </p>
                </div>
              </div>
            </div>
  

            <div className="my-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-md p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-cardNumber rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Enter match results</h1>
                  <p className="text-black mb-2">
                    Go to the 'Enter results' section of the tournament. To enter results, select the team for the respective place and enter their total kills. Selecting a team is very easy. Search for it using the team name or its player name. Click 'add'. Its kill and place points will be calculated according to the points table of the tournament. Then, it will be pushed to the points table for the current match. Don't forget to save after entering results.
                  </p>
                </div>
              </div>
            </div>


            <div className="my-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-md p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-cardNumber rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Share points table</h1>
                  <p className="text-black mb-2">
                    You don't have to do anything for the points table generation. They are calculated every time you enter match results data. You can find the link to the points table page in the manage section of the tournament.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
