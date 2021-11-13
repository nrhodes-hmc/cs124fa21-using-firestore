import React, {useState} from 'react';
import Tab from './Tab.js'

/*
Usage:
<TabList>
  <div key="Tab 1">Hello, world!</div>
  <div key="Tab 2">Goodbye, universe!</div>
</TabList>

Children of TabList can be any component, not just divs.
*/
function TabList(props) {
    const [activeTab, setActiveTab] = useState(props.children[0].key);
    return (
        <div className="tabs">
            <ol className="tab-list">
                {props.children.map(child =>
                <Tab key={child.key}
                     label={child.key}
                     activeTab={activeTab}
                     onClickTab={(label) => setActiveTab(label)}/>)}
            </ol>
            {props.children.find((child) => child.key === activeTab)}
        </div>
    );
}

export default TabList;