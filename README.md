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

# Setup instructions

```bash
# Install dependencies
npm install

# Run development server
npm run start

```
