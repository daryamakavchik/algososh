# MBEI ALGOSOSH named after Fibonacci

#### [GitHub Pages](https://daryamakavchik.github.io/algososh/)
#### [Figma](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=154%3A4331)

## Description
"Algososh" is a portfolio project created as an assignment for [Yandex.Practicum](https://practicum.yandex.com/web/ "Web Development Program"). It is an algorithm visualizer where a user can:

#### 1. Turn a string (STRING)

<img width="599" alt="string" src="https://user-images.githubusercontent.com/90967822/200742068-5f0d3e7c-f20d-4ad1-a10b-176cfd445b44.png">

To turn a string of characters the other way round, a user should enter some text in the input field and press 'Turn'.

#### 2. Generate a Fibonacci sequence (FIBONACCI SEQUENCR)

<img width="925" alt="fib" src="https://user-images.githubusercontent.com/90967822/200742101-5342008a-ff70-4e20-9b4e-dbc4dcbeeaba.png">

To generate a Fibonacci sequence, a user should enter an integer into the input field and press 'Generate'.

#### 3. Sort an array in the ascending or descending order by one of two methods - bubble/selecion (ARRAY SORT)

<img width="611" alt="arr" src="https://user-images.githubusercontent.com/90967822/200742116-078397fa-e2cf-4f4b-916e-413e228e06e1.png">

Pressing on «Descending» or «Ascending» starts the sorting of the array depending on a selected method.

#### 4. Add and remove elements from stack (STACK)

<img width="720" alt="stack" src="https://user-images.githubusercontent.com/90967822/200742134-5ee3ba0d-7078-4516-9fd9-6a25a4d6001a.png">

Entering some value into the input and pressing 'Add' creates a first stack element, which should be visible on the page. Pressing 'Delete' removes the first(top) element from the stack. If the stack only has one element, pressing 'Delete' will remove it and leave an empty stack. By clicking 'Clear' the user deletes all stack elements at the same time.

#### 5. Add and remove elments from queue (QUEUE)

<img width="784" alt="queue" src="https://user-images.githubusercontent.com/90967822/200742187-16268d95-fa7d-4ecd-b511-a3d9c6a71299.png">

Entering some value into the input and pressing 'Add' creates an element with 0 index value. For a split second the element's color turns purple. Pressing 'Delete' removes the last element from the queue. By pressing 'Clear' the user deletes all queue elements at the same tinme.

#### 6. Add and remove elements from chained order (CHAINED ORDER)

<img width="787" alt="linked" src="https://user-images.githubusercontent.com/90967822/200742198-e607362e-b917-4d3e-a974-05016797938a.png">

Entering some value into the input and pressing 'Add to head' creates an element with 0 index value. Pressing 'Delete' removes an element and moves its index. Similar process is happening with 'Add to tail' and 'Remove from tail'. A user can also enter a value and assign a certain index to it, and then delete this element from a specific (indexed) place.

## Tech Stack:
![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Installation

```bash
# Clone the repository
git clone https://daryamakavchik.github.io/algososh/
# Enter the project directory
cd algososh
# install dependencies
npm install
# build in production
npm run build
# start testing the application
npm run test
# run the server on localhost:3000
npm run start
```

## To Do
- [ ] make the website responsive
