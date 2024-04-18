# Overview

Brightwheel uses internal and third-party APIs extensively throughout our platform to process and store data, as well as manage communication to end users. The goal of the exercise will be to consume a live API and display and update the data according to the specifications given below. This exercise is meant to assess your overall frontend skill set.

## The Exercise

Build a single-page web app that uses the provided API to create a search engine landing page with the ability to “star” results.
Provide us the link to your final product as a cloneable repo on Github or Bitbucket

## Implementation Requirements

This will be a simple exercise, but structure and organize your code as if it were going into production. It should be fully-functioning code that can be run.

We have provided a local backend to use, and an empty React app that you may use as a starting point if you wish. Documentation on the API and how to run it can be found in the project README.

The API provides mock data about Companies. Companies should be rendered to show the relevant details as outlined below.

## Product Focused Acceptance Criteria

```
- There should be an Input field you can type in
- The results should be displayed as you type
- Show the first 10 results below the search input
- Show name, description, address and starred status, as well as an image if there is one.
- Clicking on a result should toggle the starred/unstarred state for the result and should make an API call to update the record in the database.
- There should be a counter that displays the total number of starred results in the database
- Make sure the user knows what is happening with appropriate prompts or indicators
```

## Technical Focused Acceptance Criteria

```
- Error Handling. We expect this from engineers.
- Semantic HTML is a must have. (https://www.w3schools.com/html/html5_semantic_elements.asp)
- We expect the product to have a beautiful design. Look to the brightwheel marketing website (https://mybrightwheel.com/) for cues and ideas. We expect our developers to be able to implement designs based on sample sets, not fully designed pages.
- Modernize your CSS with a grid or even a component library. We expect more than just DIVs and CSS block alignments.
- DRY, use abstraction and encapsulation where it makes sense.
```

## Bonus

**Try not to spend more than 2-3 hours on this exercise.**
If you have extra time, bonus points for:

- Showing a complete list of starred results when user clicks on the star count
- Component or integration tests

## How we will Review

- Functionality: Does the app meet the AC listed above?
- Code Quality: Is the code easy to read, well organized, commented, and tested?
- Technical Choices:
  - Are javascript best practices used?
  - Are HTML tags used correctly?
  - Does the code use best practices for the chosen framework (react, vue, etc....)
- Did you submit the project as a clone-able git repo

Feel free to modify the README to provide any additional context or tell us anything that would be good to know while reviewing the challenge. If you ran out of time, or there was something you had hoped to implement, this would be a good place to tell us about that.
