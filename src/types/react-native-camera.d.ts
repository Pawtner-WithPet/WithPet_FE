declare module 'react-native-camera' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  export const Constants: {
    Type: {
      back: string;
      front: string;
    };
    FlashMode: {
      on: string;
      off: string;
      auto: string;
    };
  };

  export interface RNCameraProps {
    style?: ViewStyle;
    type?: any;
    flashMode?: any;
    captureAudio?: boolean;
  }

  export class RNCamera extends Component<RNCameraProps> {
    takePictureAsync: () => Promise<{ uri: string }>;
  }

  export const Constants: {
    Type: {
      back: string;
      front: string;
    };
    FlashMode: {
      on: string;
      off: string;
      auto: string;
    };
  };
}
