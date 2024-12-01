import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import useInitializeApp from "./components/useInitializeApp";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import React from "react";
import Content from "./components/ContentTab/Content";
import Customization from "./components/CustomizeTab/Customization";


const App = () => {

  useInitializeApp();
  const [currentTab, setCurrentTab] = React.useState("content");
  return (
    <>
      <Card className="p-4 flex justify-between gap-2 items-center">
        <h1 className="text-2xl font-extrabold font-merri">Resume Builder</h1>
        <Tabs defaultValue="content"  onValueChange={(value) => setCurrentTab(value)}>
          <TabsList>
            <TabsTrigger value="content" className="font-bold">Content</TabsTrigger>
            <TabsTrigger value="customize" className="font-bold">Customize</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          size={"sm"}
          onClick={() => {
            document.body.classList.toggle("dark");
          }}
        >
          <Sun color="white" />
          <Moon color="black" />
        </Button>
      </Card>

      {currentTab == 'content' ?
        (<Content></Content>) :
        (<Customization></Customization>)
      }

    </>
  );
};

export default App;
