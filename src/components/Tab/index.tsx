'use client'

import { Tabs } from "flowbite-react";

export interface AppTabItem {
  tittle: string;
  component: React.ReactNode;
  isActive: boolean;
}

interface AppTabsProp {
 tabItems : AppTabItem[];
}
// needs a bit of customisation
const AppTabs: React.FC<AppTabsProp> = ({tabItems}) => {
   return(<Tabs.Group>
         {tabItems.map((item, index)=>{
            return<Tabs.Item active={item.isActive} title={item.tittle} key={index}>
                    {item.component}
            </Tabs.Item>
         })}
   </Tabs.Group>
   );
}

export default AppTabs;
