export type RootStackParamList = {
  MainTabs: undefined;
  NoseCamera: undefined; 
  NoseList: undefined;
  NoseResult: { dogId: number; type?: 'found' | 'lost'; from?: 'list' | 'capture';   };
};