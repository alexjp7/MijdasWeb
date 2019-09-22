//Base Vue Import
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
//Components
import SubjectDisplay from "@/components/SubjectDisplay";
import Navigation from "@/components/Navigation";
// import { Store } from "vuex";
// import store from "./store";
/**
 * Create the routes for the views
 * Note that these maybe nested to serve possible purpose
 * meta: {x} can be used for certain properties and privileges
 **/

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },

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
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue")

      // async beforeRouteLeave(to, from, next) {
      //   try {
      //     var hasPermission = await Store.state("isUserLoggedIn");
      //     console.log("hello");
      //     if (hasPermission) {
      //       next();
      //     }
      //   } catch (e) {
      //     next({
      //       name: "home",
      //       query: { redirectFrom: to.fullPath }
      //     });
      //   }
      // }
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
      path: "/announcements",
      name: "announcements",
      component: () => import("./views/Announcements.vue")
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("./views/Calendar.vue")
    },
    {
      path: "/criteria",
      name: "criteria",
      component: () => import("./views/Criteria.vue")
    },
    {
      path: "/jobboard",
      name: "jobboard",
      component: () => import("./views/JobBoard.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./views/Settings.vue")
    },
    {
      path: "/students",
      name: "students",
      component: () => import("./views/Students.vue")
    },

    /**************
     * COMPONENTS
     **************/

    {
      path: "/navigation",
      name: "navigation",
      component: Navigation
    },
    {
      path: "/subjectDisplay",
      name: "subjectDisplay",
      component: SubjectDisplay
    },
    {
      path: "/assessments",
      name: "assessments",
      component: () => import("./components/Assessments.vue")
    }
    /*

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
      },
      async beforeEnter(to, from, next) {
        try {
          var hasPermission = await Store.state("isUserLoggedIn");
          if (hasPermission) {
            next();
          }
        } catch (e) {
          next({
            name: "login",
            query: { redirectFrom: to.fullPath }
          });
        }
      }
      */
  ]
});
