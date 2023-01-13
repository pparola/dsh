import { css } from 'styled-components';

const base = 8;

export const SPACE_1 = base;
export const SPACE_2 = base * 2;
export const SPACE_3 = base * 3;
export const SPACE_4 = base * 4;
export const SPACE_5 = base * 5;
export const SPACE_6 = base * 6;
export const SPACE_7 = base * 7;
export const SPACE_8 = base * 8;
export const SPACE_9 = base * 9;
export const SPACE_10 = base * 10;
export const SPACE_11 = base * 11;

export const media = {
  phone: (...args) => css`
    @media (max-width: 27em) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: 27em) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: 45em) {
      ${css(...args)}
    }
  `,
  giant: (...args) => css`
    @media (min-width: 90em) {
      ${css(...args)}
    }
  `,
};
