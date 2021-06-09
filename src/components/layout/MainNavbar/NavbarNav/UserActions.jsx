import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from 'shards-react';
import { useDispatch } from 'react-redux';
import { closeSession } from '../../../../redux/userDucks';

function UserActions(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const toggleUserActions = () => {
    setVisible(!visible);
  };

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className='text-nowrap px-3'>
        <img
          className='user-avatar rounded-circle mr-2'
          src={require('./../../../../assets/images/avatars/0.jpg')}
          alt='User Avatar'
        />{' '}
        <span className='d-none d-md-inline-block'>Sierra Brooks</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to='user-profile'>
          <i className='material-icons'>&#xE7FD;</i> Profile
        </DropdownItem>
        <DropdownItem tag={Link} to='edit-user-profile'>
          <i className='material-icons'>&#xE8B8;</i> Edit Profile
        </DropdownItem>
        <DropdownItem tag={Link} to='file-manager-list'>
          <i className='material-icons'>&#xE2C7;</i> Files
        </DropdownItem>
        <DropdownItem tag={Link} to='transaction-history'>
          <i className='material-icons'>&#xE896;</i> Transactions
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <button
            id='btn-signOut'
            type='button'
            className='btn btn-danger btn-sm btn-signout'
            onClick={() => dispatch(closeSession())}
          >
            <span>
              <i className='material-icons'>power_settings_new</i> Cerrar Sesión
            </span>
          </button>
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
}

export default UserActions;
