export type RootStackParamList = {
  MainTabs: undefined;

  NoseCamera: { 
    fromScreen: "PetDetail" | "NoseList" | "NoseScreen" | "LostPetRegister" | "FoundPetRegister";
    petId?: string;
    hasNoseprint?: boolean;
    onImageCapture?: (uri: string) => void;
  };
  
  NoseList: undefined;

  NoseResult: { 
    dogId: number; 
    type?: 'found' | 'lost'; 
    from?: 'list' | 'capture'; 
  };
  LostPetRegister: undefined;
  FoundPetRegister: undefined; 
};
