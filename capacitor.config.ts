import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'aplicacion',
  webDir: 'dist/aplicacion',
  server: {
    androidScheme: 'https'
  }
};

export default config;
