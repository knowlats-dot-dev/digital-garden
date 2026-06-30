---
title: Infinite Scroll Company Logo Carousel (Using CSS Only)
updated: 2026-02-24T16:58:58+07:00
tags:
  - javascript
---
First, Create the two container like this

```html
<div id='container'>
	<div id='img-wrapper'>
    <!-- content -->
  </div>
</div>
```

And insert the logos

```html
<div class='container'>
	<div class='img-wrapper'>
    <img class='logo' alt='oo-company-logo' src='01.png' />
    <img class='logo' alt='oo-company-logo' src='02.png' />
    <img class='logo' alt='oo-company-logo' src='03.png' />
    <img class='logo' alt='oo-company-logo' src='04.png' />
    <img class='logo' alt='oo-company-logo' src='05.png' />
    <img class='logo' alt='oo-company-logo' src='06.png' />
    <img class='logo' alt='oo-company-logo' src='07.png' />
    <img class='logo' alt='oo-company-logo' src='08.png' />
    <img class='logo' alt='oo-company-logo' src='09.png' />
    <img class='logo' alt='oo-company-logo' src='10.png' />
  </div>
</div>
```

Final, Use CSS for make beautiful and magic things!

```css
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    /* 
      -180px is a width of one round (all images scrolling on one round)
      roundWidth = images.length * (imageWidth + iconGap)
    */
    transform: translateX(-180px);
  }
}

.container {
   padding: 0px;
   white-space: nowrap;
   overflow: hidden;
   /* Make fade in & fade out filter */
  -webkit-mask-image: linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%);
}

.container:hover .img-wrapper {
  animation-play-state: paused;
}

.img-wrapper {
  display: flex;
  gap: 8px;
  animation: 145s slide 1.8s infinite linear;
  white-space: nowrap;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.img-wrapper img {
  object-fit: contain;
  flex-shrink: 0;
}
```