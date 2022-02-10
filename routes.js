
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Setting from "@material-ui/icons/Settings";
import ExitToApp from '@material-ui/icons//ExitToApp';


const dashboardRoutes = [
  {
    path: "/spaces",
    name: "Spaces",
    icon: Dashboard,
    layout: "/dashboard",
  },
  {
    path: "/members",
    name: "Members",
    icon: Person,
    layout: "/dashboard",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Setting,
    layout: "/dashboard",
  },
  {
    path: "/signout",
    name: "Sign Out",
    icon: ExitToApp,
    layout: '/dashboard',
  },
];

export default dashboardRoutes;
