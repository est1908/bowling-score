Bowling score calculator
===========

Bowling score calculator for [Ten-pin bowling](https://en.wikipedia.org/wiki/Ten-pin_bowling)

**/** - means Spare  
**x** - means Strike

Online version available at [http://bowling-score.est1908.club](http://bowling-score.est1908.club)

# Internal design

Application consist of 2 layers:

-   **Domain Layer** (Domain logic, tests) contains app logic isolated any dependecies.
-   **View Layer** (React components, styles, assets). Provide UI and less coupled with Domain Layer via interfaces defined in `domain/types.ts`

# Setup instructions

```bash
# Install dependencies
npm install

# Run development server
npm run start

```
