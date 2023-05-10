# TO DO

## MANDATORY

### GENERAL

- declare a variable for the Marvel color in the CSS
- state in app which the page to update the button in menu and the field search
- whats the point of the use effet is there is no update in the state, then, there shouldnt be a re-render anyways... but might have it when filtering later on :)
- deal with police
- console.log({ error: error.message }) for both FE and BE?
- when maping use id instead of index
- footer

## SEARCH

- handles search with a space (either in btw letters or after letters)

## HOME PAGE

- homepage: BEEF has no image, his fault!

### CHARACTER DISPLAY

- in CharacterDisplay if comics.length === 0 > disable the link and have an extra message showing (eg: Alexa Mendez, Akemi and Anne Marie Hoag)

## COMIC FOR ONE CHARACTERS

- return to all characters

### ALL COMICS DISPLAY

picture that dont exist (same for the comics of one characters)

## BETTER

- have logo in the tab
- Header comp > replace logo for relative path
- sort comics (both all comics and comic of one characters) by data or alphabetical
- choose how many to display per page

A LITTLE BIT OF PAGES VOCAB - in both the Home (characters) and Comics pages:

- numberOfPagesTotal = variable only used to create the 'numberOfPages' array
- currentPageNum = state that stores the page number currently on display
- numberOfPages = state as an array: number of elements is the number of pages total, each element is the page number (eg: [1,2,3] for 3 pages)
- thisPageNumber = variable that stores the number of the each buttons of the pagination

DO NOT CONFUSE with the state "Which Page" which stores which 'main' page is on display (possible value are: characters (by default), comics or favorites)
