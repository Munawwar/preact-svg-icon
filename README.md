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

## What problem is this solving?

Many SVG icon solutions converts SVGs to JSX when creating their icon components.

1. This means the entire SVG is now inside your javascript file. This increases the parse and execute time of your JS. It would have been better, if the SVG were not in the JS and were already in the HTML or downloaded by browser (like an image).

2. The icons are potentially repeated across JS bundles / pages (e.g. if code splitting is used). It would be nicer if browser could cache the SVGs across pages like how regular images can be cached.

## Solution

There are couple of solutions to this. One such solution that allows browsers to cache the icons is by having the icon as an `.svg` file, with an `id` on the `<svg>` element or on the individual elements inside of the svg tag (also known as "SVG sprite") and then at the place where you want to use the icon, use a svg `<use>` tag pointing to the SVG file via a "fragment URL" (fancy way of saying `<url>#<id>`). e.g:

```html
<svg>
  <use href="/path/to/icon.svg#id">
</svg>
```

This helps us in the following ways:

1. **Less JS**: Very less SVG remains in the JS bundle. Also when page code splitting is used, only the base component used to generate the `<use>` tag is bundled across pages; which is extremely small.
2. **Styleable**: Mostly styleable (*waves hand in the air*). It respects css `fill` color. By default if you set `fill="currentColor"` on the SVG, then it will inherit the text color from parent. It can't do advanced styling, animations etc like an inline SVG, but for most icons, that is an acceptable trade-off. There are [advanced progressive enhanced ways](https://css-tricks.com/inline-svg-cached/) of converting the tag into inline SVG via JS, but I won't use those techniques here as I intend to keep this library small and simple.
3. **Cacheable**: The SVG files could be cached by browser now across pages (using Cache-Control HTTP headers, just like images, css or js files).
4. **Preloadable**: To avoid a "flash of blank space" on SVGs on the immediately visible area of a page on a page load, you could selectively preload some SVGs via link tag `rel="preload"` or by having some of the SVGs sprited in the HTML itself (when referencing them you can skip the URL part and keep only the fragment part - `<use href="#id">`). SVG sprite example:
   ```html
   <svg width="0" height="0" style="display: none">
     <symbol id="icon1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
       <path d="M502.3 ..."></path>
     </symbol>
     <symbol id="icon2" ...>
       ...
     </symbol>
   </svg>

   <!-- Usage: How to use an SVG already in HTML -->
   <svg>
      <use href="#icon1">
   </svg>
   ```

If you have many icons to add fragment ids to, then this repo provides a node.js script inside `utils/` directory to add an `id` to a directory full of svg files. Note: It will also remove fill attribute from `<svg>` element

```sh
node utils/add-svg-id.js myicon.svg
# or full directory
# node utils/add-svg-id.js .
```

## References

1. https://css-tricks.com/svg-sprites-use-better-icon-fonts/
2. https://css-tricks.com/accessible-svgs/
