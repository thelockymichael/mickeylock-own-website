import React, { useState, createContext } from "react";
import * as websiteServices from "../services/website";
import { IWebsite } from "../models/index";

export interface IWebsiteContext {
  website: IWebsite;
  getWebsite: () => void;
}

const defaultState = {
  website: {
    name: "DEFAULT",
  },
  getWebsite: () => {},
};

const WebsiteContext = createContext<IWebsiteContext>(defaultState);

export const WebsiteProvider: React.FC = ({ children }) => {
  const [website, setWebsite] = useState<IWebsite>(defaultState.website);

  const getWebsite = async () => {
    setWebsite({
      name: "Michael Lock",
    });

    await websiteServices
      .getAll()
      .then((response: any) => {
        console.log("res", response.data);
        console.log(response ? "NOT EMPTy" : " IS EMPTY");
      })
      .catch((error: Error) => {
        console.log(error);
      });

    // setWebsite({
    //   name: "Michael Lock",
    // });

    // console.log("result", result);
    // // if (result)
    // // setWebsite
    // setWebsite(result);
  };

  return (
    <WebsiteContext.Provider
      value={{
        website,
        getWebsite,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteContext;
