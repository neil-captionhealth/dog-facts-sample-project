# Dog Facts App

The purpose of this application is to display facts about dogs and allow the user to choose their favorites.

![App Mockups](./.github/assets/mockups.png?raw=true "App Mockups")

Reference the [design on Figma](https://www.figma.com/file/O6986BrgkA7GdNFK5zrQlj/Dog-Facts?node-id=0%3A1&t=Podr8KDF27F3tkJV-1), accessible with the password "caption".

## Basic User Flow

Under the "Dog Facts" heading, we display a box containing a single fact about dogs and a button to add it to a list of favorites.

The user can use the "previous" and "next" buttons to scroll between facts.

When the user clicks the "Add to Favorites" button, the fact will be added to a list at the bottom of the screen. Clicking the "Remove from Favorites" button will remove the fact from the favorites list.

## API Calls

When the application first loads, use [Axios](https://axios-http.com/docs/intro) to prefetch a list of 25 facts from the [Dog Facts API](apps/facts-api/). Make sure that none of the facts returned from the API are longer than 140 characters.

## Paging

When the user presses the “next” or “previous” buttons, replace the current fact with the appropriate item from the list.

If the user reaches the end of the dataset, we should start again at the beginning. Inversely, if the user is paging in reverse and reaches the beginning, we should move to the end of the dataset.

## API Optimization

To optimize performance, we want to limit the number of API calls we make. Don't call the API for every click -- instead, when the user gets near the beginning or the end of the list, **pre-fetch** additional batches of facts from the API in anticipation that they will continue scrolling.

# Application Structure

The main application component is [app.tsx](./apps/dog-facts/src/app/app.tsx).

To run the application in development mode:
```sh
$ npx nx serve-with-api dog-facts
```
To run storybook:
```sh
$ npx nx storybook dog-facts
```

To run repository tests:
```sh
$ npx nx run-many --target=test
```

## Styling

Use any frontend libraries you want -- pixel-perfect fidelity to the design is not as important as the layout and functionality.

## Components

The following components are needed for this application:

- [Atomic Components](https://atomicdesign.bradfrost.com/chapter-2/#atoms)
    - Heading Component
    - Fact body paragraph
    - "Add to Favorites" / "Remove from Favorites" toggle button
    - Previous / Next button
- [Molecule Components](https://atomicdesign.bradfrost.com/chapter-2/#molecules)
    - Fact Box
- [Organism Components](https://atomicdesign.bradfrost.com/chapter-2/#organisms)
    - "Current Fact"
    - "Favorites" List

## Code Quality

&#9744; Write a suite of [jest](https://jestjs.io/docs/getting-started) tests for at least one of the organism components. No code coverage requirements, this is just to get an example of the types of tests you feel are appropriate.

&#9744; Write a [storybook](https://storybook.js.org/docs/react/get-started/introduction) story for at least one of the organism components.
