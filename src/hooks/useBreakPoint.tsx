import { useTheme, Theme, Breakpoint } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface breakPointTypes {
  breakMark: number | Breakpoint;
}

interface breakPointBetweenTypes {
  breakMark1: number | Breakpoint;
  breakMark2: number | Breakpoint;
}

export const useBreakPointUp = ({ breakMark }: breakPointTypes) => {
  const theme = useTheme<Theme>();

  let breakPoint = useMediaQuery(theme.breakpoints.up(breakMark));

  return { breakPoint };
};

export const useBreakPointDown = ({ breakMark }: breakPointTypes) => {
  const theme = useTheme<Theme>();

  let breakPoint = useMediaQuery(theme.breakpoints.down(breakMark));

  return { breakPoint };
};

export const useBreakPointBetween = ({
  breakMark1,
  breakMark2,
}: breakPointBetweenTypes) => {
  const theme = useTheme<Theme>();

  let breakPoint = useMediaQuery(
    theme.breakpoints.between(breakMark1, breakMark2)
  );

  return { breakPoint };
};
