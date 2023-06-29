export interface ThemeTypes {
  bg100: string;
  bg200: string;
  bg300: string;
  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  font100: string;
  font200: string;
  font300: string;
  font400: string;
  font500: string;
  font600: string;
  shadow100: string;
  shadow200: string;
  shadow300: string;
  border100: string;
  scrollBar100: string;
}

export const darkTheme = {
  bg100: '#212123', // Yes
  bg200: '#161618', // Yes
  bg300: 'hsl(0, 0%, 100%, 0.04)', // Yes
  accent100: '#c850c0',
  accent200: '#13cc78',
  accent300: '#8B44FF',
  accent400: '#634BFA',
  font100: 'hsl(0, 0%, 100%)',
  font200: 'hsl(0, 0%, 40%)', // Yes
  font300: 'hsl(219, 16%, 61%)',
  font400: 'hsl(0, 0%, 40%)',
  font500: 'hsla(218, 80%, 2%, 1)',
  font600: 'rgb(242, 242, 242, 0.3)',
  shadow100: 'rgba(0, 0, 0, 0.08) 0px 0px 20px',
  shadow200: '0 -2px 10px rgb(242, 242, 242, 0.05)',
  shadow300: '0 -2px 10px rgb(242, 242, 242, 0.05)',
  border100: 'rgb(242, 242, 242, 0.03)',
  scrollBar100: 'hsl(0, 0%, 15%)',
};
