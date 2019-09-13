//Base Vue Import
import Vue from "vue";
import Router from "vue-router";
//BASE VIEW
import Home from "@/views/Home.vue";
//import Login from "@/views/Login.vue";
//Components
import HelloWorld from "@/components/HelloWorld";
import LoginForm from "@/components/LoginForm";


//Our stuff
/*
import Admin from "@/views/Admin";
import Announcements from "@/views/Announcements";
import Calendar from "@/views/Calendar";
import Criteria from "@/views/Criteria";
import JobBoard from "@/views/JobBoard";
import Logout from "@/views/Logout";
import Navigation from "@/views/Navigation";
import Profile from "@/views/Profile";
import Settings from "@/views/Settings";
import Register from "@/views/Settings";
*/

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
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    /**************
     * COMPONENTS
    **************/
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: {
        guest: true
      }
    },
    {
      path: "/",
      name: "LoginForm",
      component: LoginForm,
      meta: {
        guest: true
      }
    },
    /*
    {
      path: "/Announcements",
      name: "Announcements",
      component: Announcements
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar
    },
    {
      path: "/Admin",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: "/Criteria",
      name: "Criteria",
      component: Criteria
    },
    {
      path: "/Home",
      name: "Home",
      component: Home
    },
    {
      path: "/JobBoard",
      name: "JobBoard",
      component: JobBoard
    },
    {
      path: "/Logout",
      name: "Logout",
      component: Logout
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/Navigation",
      name: "Navigation",
      component: Navigation
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/Settings",
      name: "Settings",
      component: Settings
    }
    */
  ]
});
