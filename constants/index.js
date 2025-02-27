
import {

  Book,
  ChildCare,
  HealthAndSafety,
  Home,
  KeyboardArrowDown,
  Medication,
  Note,
  Person,
  Report,
    Group,
    BarChart
} from "@mui/icons-material";




export const navlinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: <Home />,
    role: ["default"],
    account_type: ["default"],
  },
  {
    name: "User management",
    icon: <Person />,
    suffixIcon: <KeyboardArrowDown />,
    role: ["IT admin"],
    account_type: ["ministry", "regional","district","branch_manager"],


    sublinks: [
      {
        name: "ministry",
        link: "/user_management/ministry",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["ministry"],
      },
      {
        name: "regional",
        link: "/user_management/regional",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["ministry", "regional"],
      },
      {
        name: "district",
        link: "/user_management/district",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["regional", "district"],
      },
      {
        name: "health worker",
        link: "/user_management/health_worker",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["branch_manager"],
      },
      {
        name: "community health worker",
        link: "/user_management/community_health_worker",
        icon: <HealthAndSafety />,
        role: [""],
        account_type: ["district"],
      },
    ],
  },
  {
    name: "Hospital management",
    link: "/hospital_management",
    icon: <HealthAndSafety />,
    role: ["IT admin"],
    account_type: ["district"],
  },
  {
    name: "Vaccination",
    link: "/vaccination",
    icon: <Medication />,
    role: ["IT admin","Nurse"],
    account_type: ["ministry", "branch_manager", "health_worker"],
  }
,
  {
    name: "Roles",
    link: "/roles",
    icon: <Group/>,
    role: ["IT admin"],
    account_type: ["ministry"],
  },
    {
        name:'Children',
        link:'/children',
        icon:<ChildCare/>,
        role: ["Nurse"],
    account_type: ["health_worker"],

    },

  {
    name: "Bookings",
    link: "/booking",
    icon: <Book />,
    role: ["Nurse"],
    account_type: ["branch_manager","health_worker"],
  },

  {
    name: "Reports",
    link: "/reports",
    icon: <BarChart />,
    role: ["default"],
    account_type: ["default"],
  },

  {
    name: "Profile",
    link: "/profile",
    icon: <Person />,
    role: ["default"],
    account_type: ["default"],
  },
];

