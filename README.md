# project-communarty

# Commun/art/y

## _Join the Communarty Today!_

Communarty is a platform which allow users to create their own canvas and invite people they trust to draw artwork and contribute to it! Watch overtime as your canvas evolves to become an accumulative art piece of all the users which were involved. Contribute to other canvases and work together to make something beautiful - be part of the bigger picture, or a "communarty".

## Features

- Users are able to securely create an account, which will save all contributions made to other canvases, as well as those made to yours.
- Click on a designated slot on a canvas and draw a 16x16 pixel art piece. Watch the canvas update in real time once after you have submitted it.
- Once a slot is used up, it cannot be overwritten, cementing your spot on the canvas.
- Selecting an occupied slot will show the creator of that contribution.
- Explore other canvases to contribute to by searching the canvas ID.
- Share your own canvas ID to users you want to collaborate with by pressing the share icon in the navbar.

## Tech

Communarty uses the following technologies :

- **Next.js** - A great Frontend Framework which provided intuitive page routing.
- **TypeScript** - Used for the Frontend in order to make the codebase robust and to catch any bugs / errors.
- **Tailwind CSS** - Makes CSS styling easier, and allows styling to be specific to a component, in contrast to having a global styling CSS file.
- **Express** - A fast Node.js Backend Framework
- **MongoDB** (with Mongoose) - For proof of concept, a noSQL database was used initially. As the data stored becomes more complex, a transition to a PostgreSQL database or GraphQL database will be made.
- **Cloudinary** - This made setting up the image storage very straight-forward. For uploading small images, this proved more than enough!

## Installation

**(_Currently, Communarty is not deployed, so to run the code locally you must create a Cloudinary account as well as set up a MongoDB database._)**
Once this has been done, install the dependencies and devDependencies for both the client and server folder, then run the frontend and backend using the following.

```sh
cd /server
npm i
nodemon index.js
```

```sh
cd /client
npm i
npm run dev
```

---

## Upcoming Features

- **Deploying Communarty** - This to allow users to use the platform without running the code locally.
- **Request System** - A request system where in order to contribute to a canvas, the owner must approve the image before it is added. This is to allow the owner to refine the canvas to be artwork that they want.
- **Multiple Canvases** - This will allow users to have different canvases which correspond to different groups of users which they want to collaborate with.
