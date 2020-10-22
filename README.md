Bowling score calculator
===========

Bowling score calculator for [Ten-pin bowling](https://en.wikipedia.org/wiki/Ten-pin_bowling)

Online version available at [http://bowling-score.est1908.club](http://bowling-score.est1908.club)


**/** - means Spare  
**x** - means Strike

# Internal design

Application consists of 2 layers:

-   **Domain Layer** (Domain logic, tests) contains isolated app logic.
-   **View Layer** (React components, styles, assets) provides UI. Less coupled with Domain Layer via interfaces defined in `domain/types.ts`

For style isolation i chose [BEM](https://en.bem.info/methodology/quick-start/) approach.  
Smart/Dumb components idea are original from [Presentational and Container Components @Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

# Setup instructions

```bash
# Install dependencies
npm install

# Run development server
npm run start

```
