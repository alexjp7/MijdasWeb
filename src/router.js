//Base Vue Import
import Vue from "vue";
import Router from "vue-router";

//BASE VIEW
import Home from "@/views/Home.vue";

//Components

import SubjectDisplay from "@/components/SubjectDisplay";
import Navigation from "@/components/Navigation";


/**
 * Create the routes for the views
 * Note that these maybe nested to serve possible purpose
 * meta: {x} can be used for certain properties and privileges
 **/

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /**************
     * VIEWS
     **************/
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/Announcements",
      name: "Announcements",
      component: () => import("./views/Announcements.vue")
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: () => import("./views/Calendar.vue")
    },
    {
      path: "/Criteria",
      name: "Criteria",
      component: () => import("./views/Criteria.vue")
    },
    {
      path: "/JobBoard",
      name: "JobBoard",
      component: () => import("./views/JobBoard.vue")
    },
    {
      path: "/Logout",
      name: "Logout",
      component: () => import("./views/Logout.vue")
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("./views/Register.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/Profile",
      name: "Profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/Settings",
      name: "Settings",
      component: () => import("./views/Settings.vue")
    },

    /**************
     * COMPONENTS
     **************/

    {
      path: "/Navigation",
      name: "Navigation",
      component: Navigation
    },
    {
      path: "/SubjectDisplay",
      name: "SubjectDisplay",
      component: SubjectDisplay
    } /*

    }

    /*
    {
      path: "/Admin",
      name: "Admin",
      component: () =>
        import("./views/Admin.vue"),
      meta: {
        requiresAuth: true,
        is_admin: true
      }*/
  ]
});
