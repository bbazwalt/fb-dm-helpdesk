import React from "react";
import { CustomChat, FacebookProvider } from "react-facebook";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import FetchPageAccessTokens from "../components/FetchPageAccessTokens";
import FetchPageIds from "../components/FetchPageIds";
import PageMessages from "../components/PageMessages";

const FacebookIntegration = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div>
      <div className="flex flex-col h-screen justify-center items-center bg-[rgb(30,77,145)]">
        <div className="card bg-gray-100 shadow-md rounded-3xl text-[rgb(45,45,45)] w-full max-w-[29rem] px-14 pt-14 pb-8">
          <h2 className="text-xl font-semibold text-center mb-4">
            Facebook Page Integration
          </h2>

          <div>
            <button className="w-full mt-6 inline-flex font-medium justify-center items-center px-4 py-3 rounded bg-[rgb(30,77,145)] text-white  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(30,77,145)]">
              Connect Page
            </button>
            <FacebookLogin
              appId=""
              autoLoad={false}
              fields="name,email,picture"
              scope="pages_show_list,pages_read_engagement,pages_manage_metadata,pages_messaging"
              callback={responseFacebook}
            />
            <FacebookLogin
              appId=""
              autoLoad={false}
              fields="name,email,picture"
              scope="pages_messaging,pages_show_list,pages_read_engagement"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">
              Integrated Page:{" "}
              <span className="font-bold">Amazon Business</span>
            </h2>
            <button className="w-full mt-6 inline-flex font-medium justify-center items-center px-4 py-3 rounded bg-[rgb(220,84,65)] text-white  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(220,84,65)]">
              Delete Integration
            </button>
            <Link to="/">
              <button className="w-full mt-6 inline-flex font-medium justify-center items-center px-4 py-3 rounded bg-[rgb(30,77,145)] text-white  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(30,77,145)]">
                Reply To Messages
              </button>
            </Link>
          </div>
        </div>
       
      </div>
      <div>
        <FetchPageAccessTokens userAccessToken={""} />
        <FetchPageIds userAccessToken={""} userId={""} />
        <PageMessages pageId={""} accessToken={""} />
      </div>
    </div>
  );
};

export default FacebookIntegration;
