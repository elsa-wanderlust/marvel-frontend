# ++ NOTES ++

## TO DO

- replace all routes with NF routes
- update list of missing routes

## MISC

ICONS - Iconify
PEXEL, UNSPLASH, FREEPIX - images DB

# ++ MANDATORY ++

## CSS

- declare a variable for the Marvel color in the CSS
- deal with police

## GENERAL

- pagination in URL
- state in app which the page to update the button in menu and the field search
- console.log({ error: error.message }) for both FE and BE?
- footer
- simplify codes

## SEARCH

- handles search with a space (either in btw letters or after letters)

## HOME PAGE

- homepage: BEEF has no image, his fault!

## CHARACTER DISPLAY

- in CharacterDisplay if comics.length === 0 > disable the link and have an extra message showing (eg: Alexa Mendez, Akemi and Anne Marie Hoag)

## COMIC FOR ONE CHARACTERS

- offer a button to return to all characters

## ALL COMICS DISPLAY

- what to do when the picture that doesnt exist (same in the page for the comics of one characters)  
  eg: Annihilation: Silver Surfer (2006) #1 - description is messed up

# ++ OPTIONAL ++

## GENERAL

- have logo in the tab

## SIGN UP

- add avatar option

## DESCRIPTION

description.replace(/&#39;S/g, "42") //
&#39; ===> '
&ndash; ===> ...

# ++ ACTUAL READ ME NOTES ++

A LITTLE BIT OF PAGES VOCAB - in both the Home (characters) and Comics pages:

- numberOfPagesTotal = variable only used to create the 'numberOfPages' array
- currentPageNum = state that stores the page number currently on display
- numberOfPages = state as an array: number of elements is the number of pages total, each element is the page number (eg: [1,2,3] for 3 pages)
- thisPageNumber = variable that stores the number of the each buttons of the pagination

DO NOT CONFUSE with the state "Which Page" which stores which 'main' page is on display (possible value are: characters (by default), comics or favorites)
