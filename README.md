# MarkIt-Website

<h2>Installation Instructions</h2>

<h3> Installing nodejs</h3>

1. Click to [Install Node](https://nodejs.org/en/download/)
2. Open terminal and run `node -v` to check the install version (current is 10.5.0)
3. Check npm (Node Package Manger Version) `npm -v` (current is 6.1.0).

<h3> Installing Vue with CLI </h3>

1. run `npm install vue`
2. run `npm install -g @vue/cli`.  NOTE: -g installs globally to the machine

<h3> Creating your Vue Project </h3>

*** Please Note: There are two methods for this, cli and browser ui sexiness, for both of these follow the steps below ***

<h4> - Browser Sexiness </h4>

1. run `vue ui --dev`

<h4> - Hardcore cli compsci student method </h4>

1. run `vue create <project-name>` 
2. Enter for next/confirm, space to select (if error is made just ctrl-c - rip)
3. Arrow key down to `manually select`
4. Arrow key and space on `router` and `vuex` hit enter
5. Arrow down to `Eslint + Prettier`
6. Select `lint on save`
7. Select `in dedicated config file`
8. Type `N` for not saving preset
9. Change directory to the project you've created.
10. OPTIONAL - run `vue ui --dev` and import project directory for ui use later (provides analytics etc)

<h3> Using the Development Environment</h3>

- Once you have completed the above, you can run `npm run serve` or `npm run dev` 
(note: if you get errors/warnings run `npm run serve --fix`)
  which will create a localhost instance on an available port and display the default vue page.

- When running, the prompt will indicate what port is in use. 

<h3> VS Code Extensions </h3>

Please download/install the following extension:
> `Name: Vue VS Code Extension Pack`

> `Id: sdras.vue-vscode-extensionpack`

> `Description: A collection of extensions for working with Vue Applications in VS Code`

> `Version: 0.2.0`

> `Publisher: sarah.drasner`

> `VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-extensionpack>`

<h3> GitHub </h3>

You will need to pull/clone this repo and use it to replace the pre-existing src and public files. After that it should be fine.

<h3> Bugs and Issues </h3>

Please note that when you get to `npm run serve` you will get an error in the main.js file this is due to installing a plugin via `vue ui` i'd recommend commenting it out or installing it via vue ui

