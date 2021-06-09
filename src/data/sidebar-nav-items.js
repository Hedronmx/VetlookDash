export default function() {
  return [
    {
      title: 'Inicio',
      htmlBefore: '<i class="material-icons">home</i>',
      to: '/admin/home',
    },
    {
      title: 'Clientes',
      htmlBefore: '<i class="material-icons">account_box</i>',
      to: '/admin/clients',
    },
    {
      title: 'Usuarios',
      htmlBefore: '<i class="material-icons">people</i>',
      to: '/admin/users',
    },
    {
      title: 'Negocios',
      htmlBefore: '<i class="material-icons">store</i>',
      to: '/admin/business',
    },
    {
      title: 'Vet-Wiki',
      htmlBefore: '<i class="material-icons">pets</i>',
      to: '/admin/vetlook-wiki',
    },
    {
      title: 'Blog Posts',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/admin/blog-posts',
    },
    {
      title: 'Add New Post',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/admin/add-new-post',
    },
    {
      title: 'Forms & Components',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/admin/components-overview',
    },
    // {
    //   title: 'User Profile',
    //   htmlBefore: '<i class="material-icons">person</i>',
    //   to: '/admin/user-profile',
    // },
    {
      title: 'Errors',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/admin/errors',
    },
  ];
}
