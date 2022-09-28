import { render } from 'preact';
import PersonIcon from './PersonIcon';

const App = () => (
  <button>
    <PersonIcon
      size={16}
      color="#333"
    />
    {' '}
    <span>My Profile</span>
  </button>
)

render(<App />, document.getElementById('container'));
