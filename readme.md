# Bowling score calculator

Online bowling score calculator for [Ten-pin bowling](https://en.wikipedia.org/wiki/Ten-pin_bowling)

**/** - means Spare
**x** - means Strike

Te

# Project structure

Application is devided by 2 layer

-   Domain layer (Domain logic + tests).
-   View layer (React, components, styles, assets)

Domain folder contains app logic isolated from framework. Also interfaces in domain/types.ts used to isolate implemention details from view layer

-   Domain
    Isolated app logic,

# TODO:

-   accessibility

-   sort-imports ?!
-   tslint
-   build script
    -deploy to bowling-score.est1908.club
-   method ordering (by access level)
-   write doc

# Some comments

I decided to not use create-react-app, scratch taken from https://www.pluralsight.com/guides/typescript-react-getting-started
