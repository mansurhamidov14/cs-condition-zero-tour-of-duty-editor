import * as React from "react";
import { IS_DEV } from "../../consts";

type TabGroup = {
  activeTab: string;
  disabled?: boolean; 
}

type Tabs = {
  rootTab: TabGroup;
  botProfile: TabGroup;
  careerMode: TabGroup;
}

export type TypeTabsContext = {
  tabs: Tabs;
  enableTabGroup: (id: keyof Tabs) => void;
  setRootTab: (id: string) => void;
  setBotProfileTab: (id: string) => void;
  setCareerModeTab: (id: string) => void;
}

export const TabsContext = React.createContext<TypeTabsContext>(null as any);

export class TabsProvider extends React.Component<{}, Tabs> {
  state: Tabs = {
    rootTab: { activeTab: 'botProfile'},
    botProfile: { activeTab: 'baseConfig' },
    careerMode: { activeTab: 'easy', disabled: !IS_DEV },
  };

  setRootTab(id: string) {
    this.setState(state => ({ ...state, rootTab: { ...state.rootTab, activeTab: id } }));
  }

  setBotProfileTab(id: string) {
    this.setState(state => ({ ...state, botProfile: { ...state.botProfile, activeTab: id } }));
  }

  setCareerModeTab(id: string) {
    this.setState(state => ({ ...state, careerMode: { ...state.careerMode, activeTab: id } }));
  }

  enableTabGroup(id: keyof Tabs) {
    this.setState(state => ({ ...state, [id]: { ...state[id], disabled: false } }));
  }

  render() {
    return (
      <TabsContext.Provider value={{
        tabs: this.state,
        setRootTab: this.setRootTab.bind(this),
        setBotProfileTab: this.setBotProfileTab.bind(this),
        setCareerModeTab: this.setCareerModeTab.bind(this),
        enableTabGroup: this.enableTabGroup.bind(this)
      }}>
        {this.props.children}
      </TabsContext.Provider>
    );
  }
}

export function useTabs(): TypeTabsContext {
  return React.useContext(TabsContext);
}
