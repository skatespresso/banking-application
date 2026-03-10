# Bank App

This is a browser-based banking application built with TypeScript. 

## Built with
- TypeScript
- HTML
- CSS

## Features
- Create multiple bank accounts
- Deposit and withdraw funds
- Transfer money between accounts
- Tab-based navigation

## About
This was my introduction to TypeScript. I built two classes, `konto` (account) and 
`bank`, to handle the core logic separately from the UI.

The biggest challenge was managing state across multiple 
dropdowns and keeping them in sync after every action. 
I also added a tab interface mostly because it was fun to 
figure out, not because it was strictly necessary — 
which I documented in the code.

If I were to revisit this, I'd look at preventing the user 
from transferring to and from the same account, and explore 
persisting data with localStorage so accounts survive a page reload.
