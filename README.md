# P5.js Garden Project

In the unlikely event that you, the unfortunate reader, have managed to stumble across this of their own accord:
- Turn back while you still can!
- If you insist on trying to make sense of my terrible code, feel free to fork / do whatever you like with it.

## Summary

- **The finished project can be found [here](https://p5.tomat05.net).**
- I originally tried doing the current planet project with a cube-sphere (create 6 faces, arrange them as a cube, then force each vertex to be equidistant from the centre)
as this results in a much more even spread of detail than a UV sphere.
- However, at this point I was on about the millionth iteration having tried:
    - An early version of this planet thing that was extremely broken
    - 3d procedural terrain (I decided to switch to something else because I'm indecisive like that)
    - Multiple versions of a "design your own garden" thing using a grid of tiles which then turned into...
    - Longer than I would like to admit trying to create various different versions of a procedural garden generator using a wavefuntion collapse algorithm (unfortunately I currently lack the skills to achieve this)
    - Attempt two of the aforementioned cube-sphere
- Eventually I found a coding train video on a UV sphere and decided it was good enough for my purposes.
- Unfortunately, I lacked the foresight and basic intelligence to save most of the failed projects, however, the attempted wavefunction collapse (along with some random distraction projects) can be found [here](https://p5.tomat05.net) (not uploaded yet!).

## Additional Thoughts

- If I were to do this again I would probably go for a more object-oriented approach (if only to help with readability as the current mess of functions and variables can be a little confusing to work out at a glance).
- I would have liked to have had patches of the detail colour rather than stripes, but due to the sphere being built around strips of triangles, this was unavoidable and not worth undoing everything to change.
- If I were to develop this project into a fully-fledged experience, I would research the possibility of using object instancing (as calculating every tree every frame is very expensive), or compute shaders (for creating all the triangles of the sphere mesh in a more efficient manner).
- This project could definitely be optimised further but I would rather focus on projects that are more interesting and/or useful to me such as beginning to learn C and C++, continuing to develop with C# and the Unity game engine, and learning to create web-apps using React.js as a friend and I have an [ongoing project](https://lizard.social/) which will use this.


- I will probably have another go at wavefunction collapse using a tool such as Unity where I can learn more about it with a more feature-rich tool and without having to wrestle with the weird global-not-global-no-transform-unless-you-literally-move-where-(0,0,0)-is origin that p5.js uses that seems to have a mind of its own!
