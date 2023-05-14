# FUNCTIONALITIES

## GENERAL

- displays all Marvel characters (home page) and comics (comics page), sorted in alphabetical order
- can create an account

## CHARACTERS AND COMICS

- allows to search by name (for characters) or title (for comics)
- can change number of results per page 25,50,75 or 100
- can navigate between pages : +/- 1 or +/- 10 or to the last/first page
- can save (and remove) favorites (local storage if not logged in or in the DB if loggedin)
- offers to login, the first time a comic or characters is saved

## CHARACTERS

- each characters is linked to a description and list of the comics it appears in

## FAVORITES

- displays all the favorite comics and characters (stored locally if not logged in or in the DB)
- can remove from favorites from that page

## PAGINATION SYSTEM

- numberOfPagesTotal = total number of pages (depends on search results and how many results the user chooses to display per page)
- numberOfPages = is an array of array. The second layer of array represents each page number. The first layer of array groups the page number by 10 (unless maybe for the last set). Eg: if the numberOfPagesTotal is 23,
  numberOfPages = [[1,2,3,4,5,6,7,8,9,10],[11,12,13,14,15,16,17,18,19,20],[21,22,23]]
  the first layer of array is called: pagesByTen.
- thatPagesbyTen = on which one we currenly dealing with (when mapping)
- thatPagesbyTenContent = the page number in that thatPagesbyTen
- currentPagesByTen = the group of 10 page number (or maybe less if one the last one) currently on display
- currentPageNumber = the one currently on display

DO NOT CONFUSE with the state "Which Page" which stores which 'main' page is on display (possible value are: characters (by default), comics or favorites)

# IMPROVMENT

- Search function : handles "space" and can pre-fill with suggestions
- if signing up and has favorites in local storage, could offer to save them on the DB
- add pagination and search in URL
- replace wrong characters in descriptions '&#39' or '&ndash'
- simplify codes and duplicate
- offers avatar options at signup
- once on 'comics to that character page' offer a button to return to all characters
- add pagination at the bottom of the page, and scrolls up when changed
