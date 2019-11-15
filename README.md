# Smooth Scroll Move
Smooth Scroll Move will make your web more smooth to scroll to enhance user experience
[DEMO](https://event.hearst.com.tw/uiuxstoredemo/smoothscrollmove/)


## How to install
go to your terminal and type the following:
```bash
yarn add smooth-scroll-move
```
then                 
```html
<script src='node_modules/smooth-scroll-move/js_lib/SmoothScrollMove.js'></script>
```

## How to use:

#### Full Page Scroll Smoothly
```html
<body>
  <div style='position: fixed;'>/*I am fixed UI Component, should put outside the smooth-scroll-move*/</div>
  <div id="smooth-scroll-move">
    /* all your web content here */
  </div>

  <script type='text/javascript'>
    SmoothScrollMove.init({
      full_page: true
    })
  </script>
</body>
```                    
Wrap all your web content in id='smooth-scroll-move',               
BUT                   
fixed UI component should put outside the id='smooth-scroll-move'                
Here, you will have your web whole page scroll smoothly!!                      



#### Parallex Scroll Effect                        
If you want some UI Component have parallex scroll effect, just:
```html
<body>
  <header>/*I am fixed UI Component, should put outside the smooth-scroll-move*/</header>
  <div id="smooth-scroll-move">
    <div
      class='your-comp smc'
      data-smc-y='0.5'
    ></div>
  </div>

  <script type='text/javascript'>
    SmoothScrollMove.init({
      full_page: true
    })
  </script>
</body>
```
give it a class: smc (scroll move component)              
AND           
dataset (can be multi):            
```html     
<div
  class='smc'
  data-smc-x='0.5'                        
  data-smc-y='0.5'      
  data-smc-z='0.5'                        
  data-smc-rotation-x='0.5'                        
  data-smc-rotation-y='0.5'                        
  data-smc-rotation-z='0.5'                        
  data-smc-skew-x='0.5'                        
  data-smc-skew-y='0.5'   
>  
</div>      
```           
Here, the parallex scroll effect will appear!!

## PS:
1. If you just want parallex effect without whole page scroll smoothly, just make full_page: false

2. if your content will dynamic change cause different content height,                     
just use the function below to set new height to body after every time content has been changed:
```js
const set_moving_board_height_to_body = () => {
      const BoxRef = document.getElementById('smooth-scroll-move').children[0]
      document.body.style.height = `${BoxRef.clientHeight}px`
}
```

3. In Mobile Device, the scroll behavior is already smooth, so               
the effect of Full Page Scroll Smoothly will be closed         
in condition: window.innerWidth <= 1024

## Author
[WreewanMorhee](https://github.com/WreewanMorhee)
