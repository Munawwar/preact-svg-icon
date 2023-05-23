# preact-svg-icon

A Light-weight Preact SVG icon wrapper

```sh
npm add preact-svg-icon
```

## Usage

PersonIcon.jsx
```js
import toSvgIcon from 'preact-svg-icon';
// provide a SVG file and fragment id to use as icon
export default toSvgIcon('/person.svg', 'fragment-id');
```

Using the icon:
```jsx
import PersonIcon from './PersonIcon';

function MyPage() {
  return <PersonIcon
    className="css-class-1 css-class-2"
    color="red"
    size={16}
    style={{ textAlign: 'center' }}
    title="Profile settings"
    titleId="profile-icon-title"
  >;
}
```

## Run demo

```sh
npm ci
npm start
# Watch changes on a new terminal
npm run example:watch
```

## Problem statement

Many SVG icon solutions converts SVGs to JSX when creating their icon components.

1. This means the entire SVG is now inside your javascript file. JS gets larger, and as the larger your JS gets the slower it gets to parse and execute. If the SVG were to be already in the HTML or downloaded by browser then that would be more ideal.

2. The icons are potentially repeated across JS bundles (e.g. if code splitting is used). It would be nicer if browser could cache the SVGs across pages like how regular images can be cached.

## Solution

There are couple of solutions to this. One such solution that allows browsers to cache the icons is by having the icon as an `.svg` file, with an `id` on the `<svg>` element or on the individual elements inside of the svg tag (also known as "SVG sprite") and then at the place where you want to use the icon, use a svg `<use>` tag pointing to the SVG file via a "fragment URL" (fancy way of saying `<url>#<id>`). e.g:

```html
<svg>
  <use href="/path/to/icon.svg#id">
</svg>
```

This helps us in the following ways:

1. Very less SVG remains in the JS bundle. Also when page code splitting is used, only the base component used to generate the `<use>` tag is bundled across pages. Which is extremely small.
2. The SVG files could be cached by browser now across pages.
3. HTML generated is also small. However this can cause a flash of blank space on SVGs on the immediately visible area of a page on a page load. But you could selectively preload some SVGs via link tag rel="preload" or by having some of the SVGs sprited in the HTML itself (when referencing them you can skip the URL part and keep only the fragment part - `<use href="#id">`). SVG sprite example:
   ```html
   <svg width="0" height="0" style="display: none">
     <symbol id="icon1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
       <path d="M502.3 ..."></path>
     </symbol>
     <symbol id="icon2" ...>
     </symbol>
   </svg>
   ```

If you have many icons to add fragment ids to, then this repo provides a node.js script inside `scripts/` directory to add an `id` to a directory full of svg files. Note: It will also remove fill attribute from `<svg>` element

```sh
node scripts/add-svg-id.js myicon.svg
# or full directory
# node scripts/add-svg-id.js .
```

## References

1. https://css-tricks.com/svg-sprites-use-better-icon-fonts/
2. https://css-tricks.com/accessible-svgs/
