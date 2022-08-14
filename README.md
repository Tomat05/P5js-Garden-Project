# Garden Worlds

**The finished project can be found [here](https://p5.tomat05.net)**

## Summary

'Garden Worlds' is a procedural planet generator made with p5.js  

### The planet

When I first started this project, I intended on creating the base planet using a cube-sphere as this results in a more even spread of detail than a UV sphere  
![image](https://user-images.githubusercontent.com/64409983/184538337-c2786bf6-6b0d-4ff8-9908-a855eb3df114.png)  
(Left: UV sphere (concentrated detail at poles), right: cube-sphere (more even spread of detail))  

However, upon finding [this video](https://www.youtube.com/watch?v=RkuBWEkBrZA), I realised a UV sphere would be much easier to implement and worth the tradeoff of uneven detail.  
  
Once I had a sphere, I created another sphere around it to form an atmosphere.
![planet (25)](https://user-images.githubusercontent.com/64409983/184538589-3db7f5ab-0cc4-461d-8831-27ec74321b6f.png)  
  
I created different colours for the planet using random values. I would have preferred to have patches of colour, but I could only get it to form stripes.
![planet(1)](https://user-images.githubusercontent.com/64409983/184538767-3f8b97c2-9104-4547-8ae4-ac8a0d82e2aa.png)  

### The Trees
  
After adding colours, I tried to add some objects (later to become trees) onto the planets, however I ran into some issues where the objects would appear in seemingly random locations, even though I had used the vertex positions from the sphere as origins.
![planet(6)](https://user-images.githubusercontent.com/64409983/184538900-219b2541-c8c1-4e35-b028-2e01c116311d.png)  
  
Eventually I got the objects to wrap around the planet as intended (at the cost of a lot of performance as I ended up calculating their positions per-frame as opposed to once on setup). I then tried to use a tree model to replace the stand-in cubes I was using previously, however due to the way the sphere is created, half of the models would always be upside-down. Eventually, I decided to just use a box with a sphere on top as a good-enough aproximation of a tree.
![planet(4)](https://user-images.githubusercontent.com/64409983/184539186-002f1363-af43-45ca-bbce-a05281fe0648.png)  
(In this picture I had also started working on a title for screenshots)  
  
### User Interface and Screenshots

Having finished the basic planet generation, I began working on settings to allow the user to control the look of the planets. I used a texture for the heading of each setting as this was cheaper than using the `createGraphics()` function (p5.js in webgl mode requires this to render text)  
![image](https://user-images.githubusercontent.com/64409983/184539451-4da0dc9e-a216-40d5-99ca-7891549e8b8b.png)  
(The pinnacle of UI design, created with blood, sweat, tears, and 5 minutes in GIMP)  
  
Finally, I added the ability to take a screenshot with your own title
![planet](https://user-images.githubusercontent.com/64409983/184539603-cf67b715-fb88-49da-acfd-653eba37f14d.png)  
  
## Additional Thoughts

If I were to do this project again, I would probably go for a more object-oriented approach as this project very quickly turned into a maze of functions.  
Also, the project has a number of shortcomings such as the trees causing a large performance hit due to being recalculated every frame, and the fact that objects in p5.js don't cast shadows in other objects so the "realistic" lighting mode can look a bit terrible. If I were to redo this project, I would find a way of generating the trees once in setup before I had already implemented all the planet code, and I would spend some time learning about GLSL and shaders in order to create a shadow map so the things that should be in shadow, are.  
![image](https://user-images.githubusercontent.com/64409983/184539955-4e780168-a86b-44fa-b39a-66847abf66fd.png)  
(The trees inside the red circle should be in shadow but aren't because p5.js ignores the HugeGreatBigPlanetTM between them and the light source)  
  
In summary, working with p5.js has caused me unending pain and misery, so, were I to *actually* attempt this project again, I would use a different tool more suited to the task (perhaps three.js although I've never used it just heard good things)
