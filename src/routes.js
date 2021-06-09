// Layout Types
import { DefaultLayout } from './layouts';

// Route Views
import AdminOverview from './views/AdminOverview';
import UserProfileLite from './views/UserProfileLite';
import UserProfile from './views/UserProfile';
import AddNewPost from './views/AddNewPost';
import Errors from './views/Errors';
import ComponentsOverview from './views/ComponentsOverview';
import Tables from './views/Tables';
import BlogPosts from './views/BlogPosts';
import LoginLayout from './layouts/LoginLayout';
import Home from './views/Home';
import ClientsTable from './views/ClientsTable';
import UsersTable from './views/UsersTable';
import BusinessTable from './views/BusinessTable';
import BusinessProfile from './views/BusinessProfile';
import WikiVetGroups from './views/wiki/WikiVetGroups';
import WikiVetSpecies from './views/wiki/WikiVetSpecies';
import WikiVetBreed from './views/wiki/WikiVetBreed';
import WikiProfile from './views/wiki/WikiProfile';

export default [
  {
    path: '/xlogin/',
    exact: true,
    layout: LoginLayout,
  },
  {
    path: '/admin/home',
    layout: DefaultLayout,
    component: Home,
    // component: WikiVetGroups,
  },
  {
    path: '/admin/clients',
    layout: DefaultLayout,
    component: ClientsTable,
  },
  {
    path: '/admin/users',
    layout: DefaultLayout,
    component: UsersTable,
  },
  {
    path: '/admin/user-profile',
    layout: DefaultLayout,
    component: UserProfile,
  },
  {
    path: '/admin/business',
    layout: DefaultLayout,
    component: BusinessTable,
    exact: true,
  },
  {
    path: '/admin/business/business-profile',
    layout: DefaultLayout,
    component: BusinessProfile,
  },
  {
    path: '/admin/vetlook-wiki/:grupoID/:breed/:item',
    layout: DefaultLayout,
    component: WikiProfile,
    exact: true,
  },
  {
    path: '/admin/vetlook-wiki/:grupoID/:breed',
    layout: DefaultLayout,
    component: WikiVetBreed,
    exact: true,
  },
  {
    path: '/admin/vetlook-wiki/:grupoID',
    layout: DefaultLayout,
    component: WikiVetSpecies,
    exact: true,
  },
  {
    path: '/admin/vetlook-wiki/',
    layout: DefaultLayout,
    component: WikiVetGroups,
    exact: true,
  },
  {
    path: '/admin/add-new-post',
    layout: DefaultLayout,
    component: AddNewPost,
  },
  {
    path: '/admin/errors',
    layout: DefaultLayout,
    component: Errors,
  },
  {
    path: '/admin/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview,
  },
  {
    path: '/admin/blog-posts',
    layout: DefaultLayout,
    component: BlogPosts,
  },
];
