# YoutubeX
YoutubeX is a Youtube Account management tool. For now, a user can create, edit, 
and save their favorite channel with a channel id.

# Planning
- ok 1 user can crud channel id
- ok 2 users can fetch playlist
- ok 3 users can search
- ok 4 users can add to playlist (desktop mode only)
- ok 5 non-user can search
- `*no means haven't done yet`

# Process
The user can now do crud for their channel id. It is a simple CRUD app built with
React. Unfortunately, due to short amount time, I wasn't able to build the part 
(OAuth2) where the user can manipulate their Youtube account. However, that will
be built on Version 2. It takes a long time to study OAuth and to get each tiny
problem-solving.

The biggest problem I had was with using OAuth. I read Youtube API docs,
Google API docs, watch video tutorials, using Google search, using Stack Overflow,
project issue queue, and it doesn't seem like it's an easy thing to do at all.
But for small step I took, I basically kept testing, trying, and grinding to go 
through each small problem. And finally, I was able to get a token from OAuth.
It was tedious. But in the end, I manage to have a success with it. 

Even though it seems like OAuth was quite troublesome, I also had problems
with communicating both frontend and backend using axios. It took me a while to
get used to it. Another problem I had with the front end was window manipulation.
I didn't realize that I had to refresh both of my servers to get the result. There
were all kind of trial and error to understand the concepts to get the result.

# Problem Solving Strategies
Since React is new to me, it wasn't quite appealing at first but I grew a fond of
it. I read the React docs over and over again whenever I forgot or don't know
some concepts. I sometimes use Google, StackOverflow for more guidance.

# Technologies used
  - React
  - HTML/SASS
  - React Router
  - MDB React
  - Visibility Sensor
  - Axios
  - Github

# Wireframe
[Imgur](https://i.imgur.com/uruqTvm.png)

# User Stories
Version One:
When a user signed in: 
  - the user can see all their channel id
  - the user can create a channel id
  - the user can delete a channel id
  - the user can edit a channel id
  - the user can cancel an edit

# Future Planning
Version Two:
  - add in OAuth2 for private playlist
  - change channel id to playlist id

# References
- [Frontend Github](https://github.com/TakyiuLo/youtube-client)
- [Frontend Deploy Site](https://takyiulo.github.io/youtube-client/)
- [Backend Github](https://github.com/TakyiuLo/youtube-api)
- [Backend Deploy Site](https://sheltered-fortress-64728.herokuapp.com/)
